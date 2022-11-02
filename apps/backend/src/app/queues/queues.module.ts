import { Global, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import config from '../config/config';

@Global()
@Module({
  imports: [
    BullModule.forRoot({
      redis: config.redis,
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: false,
        attempts: 3,
      },
    }),
  ],
})
export default class QueuesModule {}
