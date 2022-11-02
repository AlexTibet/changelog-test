import { DynamicModule } from '@nestjs/common';
import { Module } from '@nestjs/common';

import Web3ProviderService from './web3.provider.service';
import { IWeb3ProviderOptions } from './web3.provider.service';

@Module({})
export default class Web3ProviderModule {
  static forRoot(options: IWeb3ProviderOptions): DynamicModule {
    return {
      providers: [
        {
          provide: 'WEB3_PROVIDER_CONFIG',
          useValue: options,
        },
        Web3ProviderService,
      ],
      module: Web3ProviderModule,
      exports: [Web3ProviderService],
    };
  }
}
