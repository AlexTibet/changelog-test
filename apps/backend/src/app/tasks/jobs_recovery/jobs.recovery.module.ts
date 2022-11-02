import { Module } from '@nestjs/common';

import JobsRecoveryService from './jobs.recovery.service';

@Module({
  providers: [JobsRecoveryService],
})
export default class JobsRecoveryModule {}
