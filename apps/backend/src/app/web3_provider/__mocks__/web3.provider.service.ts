import { AbiItem, Mixed } from 'web3-utils';

import { Inject, Injectable } from '@nestjs/common';

import { ISignResponse } from '../web3.provider.service';

import { Web3ChainsType } from '../currencies.constants';

export interface Web3ProviderOptions {
  chain: Web3ChainsType;
}

interface GetPastEventsOptions {
  fromBlock: number;
  toBlock: number;
}

@Injectable()
export default class Web3ProviderService {
  private readonly _chain: Web3ChainsType;

  constructor(@Inject('WEB3_PROVIDER_CONFIG') options: Web3ProviderOptions) {
    this._chain = options.chain;
    this.connect();
  }

  private connect(): void {
    return;
  }

  public contract(contract: AbiItem | AbiItem[]) {
    return {
      clone: () => {
        return {
          options: {},
        };
      },
      options: {},
    };
  }

  public async getPastEvents(
    contract: AbiItem | AbiItem[],
    event: string,
    options: GetPastEventsOptions,
  ) {
    return;
  }

  sign(data: Mixed[], privateKey: string): ISignResponse {
    return;
  }

  recover(message: string, signature: string) {
    return;
  }

  public async getBlockHeight(): Promise<number> {
    return;
  }

  public async getBlock(blockNumber: number) {
    return;
  }
}
