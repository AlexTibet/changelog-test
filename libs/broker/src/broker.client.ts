import * as amqp from 'amqplib';

import { Injectable, Logger } from '@nestjs/common';
import { Inject } from '@nestjs/common';

export interface BrokerModuleOptions {
  connection: string;
  deaf?: boolean;
}

@Injectable()
export default class BrokerClient {
  private readonly _options: BrokerModuleOptions;

  private readonly _logger: Logger;

  private _connection: amqp.Connection;
  private _channel: amqp.Channel;

  constructor(@Inject('BROKER_CONFIG') options: BrokerModuleOptions) {
    this._options = options;
    this._logger = new Logger(BrokerClient.name);
  }

  private async init(): Promise<void> {
    if (this._connection) {
      return;
    }

    this._connection = await amqp.connect(this._options.connection);
    this._channel = await this._connection.createChannel();
  }

  public async subscribe(
    queue: string,
    instance: unknown,
    handler: string,
  ): Promise<void> {
    if (this._options.deaf) {
      return;
    }

    await this.init();

    await this._channel.assertQueue(queue, {
      durable: true,
    });

    this._channel.consume(
      queue,
      async (msg) => {
        this._logger.verbose(`[x] Received ${msg.content}`);

        try {
          const parsedMsg = JSON.parse(msg.content.toString());
          await instance[handler](parsedMsg);
        } catch (err) {
          this._logger.error(`[x] SyntaxError: Invalid JSON input`);
        }

        this._channel.ack(msg);
      },
      {
        noAck: false,
      },
    );
  }

  public async send(queue: string, msg: any): Promise<void> {
    await this.init();

    const data = Buffer.from(JSON.stringify(msg));

    await this._channel.assertQueue(queue, {
      durable: true,
    });

    this._channel.sendToQueue(queue, data, { persistent: true });
  }

  public async close(): Promise<void> {
    if (!this._connection) {
      return;
    }

    await this._connection.close();
    this._connection = null;
  }
}
