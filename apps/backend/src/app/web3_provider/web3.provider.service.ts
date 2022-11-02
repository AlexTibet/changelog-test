import Web3 from 'web3';

import { AbiItem, Mixed } from 'web3-utils';
import { Contract, EventData } from 'web3-eth-contract';

import { Inject, Injectable } from '@nestjs/common';

import blockchain from '../config/blockchain';

import { Web3ChainsType } from './currencies.constants';

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export interface IWeb3ProviderOptions {
  chain: Web3ChainsType;
  offline?: boolean;
}

export interface ITransaction {
  hash: string;
  nonce: number;
  blockHash: string | null;
  blockNumber: number | null;
  transactionIndex: number | null;
  from: string;
  to: string | null;
  value: string;
  gasPrice: string;
  gas: number;
  input: string;
}

export interface IBlock {
  number: number;
  hash: string;
  parentHash: string;
  nonce: string;
  sha3Uncles: string;
  logsBloom: string;
  stateRoot: string;
  miner: string;
  extraData: string;
  gasLimit: number;
  gasUsed: number;
  timestamp: number | string;
  size: number;
  difficulty: number;
  totalDifficulty: number;
  uncles: string[];
  transactions: ITransaction[];
}

export interface IGetPastEventsOptions {
  filter?: {
    [key: string]: number | string | string[] | number[];
  };
  fromBlock: number;
  toBlock: number;
}

export interface ISignResponse {
  message: string;
  messageHash?: string;
  v: string;
  r: string;
  s: string;
  signature: string;
}

@Injectable()
export default class Web3ProviderService {
  private _provider: Web3;

  private readonly _chain: Web3ChainsType;
  private readonly _offline: boolean;

  constructor(@Inject('WEB3_PROVIDER_CONFIG') options: IWeb3ProviderOptions) {
    this._chain = options.chain;
    this.connect();
  }

  private connect(): void {
    const provider = this._offline
      ? null
      : new Web3.providers.HttpProvider(blockchain[this._chain].rpc);
    this._provider = new Web3(provider);
  }

  public async getBlock(blockNumber: number): Promise<IBlock> {
    const block = await this._provider.eth.getBlock(blockNumber, true);
    return block;
  }

  public contract(contract: AbiItem | AbiItem[], address: string): Contract {
    return new this._provider.eth.Contract(contract, address);
  }

  public async getPastEvents(
    contract: Contract,
    event: string,
    options: IGetPastEventsOptions,
  ): Promise<EventData[]> {
    const events = await contract.getPastEvents(event, {
      filter: options.filter,
      fromBlock: options.fromBlock,
      toBlock: options.toBlock,
    });

    return events;
  }

  sign(data: Mixed[], privateKey: string): ISignResponse {
    const message = Array.isArray(data)
      ? this._provider.utils.soliditySha3(...data)
      : data;
    const response = this._provider.eth.accounts.sign(message, privateKey);

    return response;
  }

  recover(message: string, signature: string) {
    const address = this._provider.eth.accounts.recover(message, signature);
    return address.toLowerCase();
  }

  public async getBlockHeight() {
    const blockHeight = await this._provider.eth.getBlockNumber();
    return blockHeight;
  }
}
