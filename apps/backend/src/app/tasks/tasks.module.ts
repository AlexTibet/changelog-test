import { Global, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import JobsRecoveryModule from './jobs_recovery/jobs.recovery.module';

@Global()
@Module({
  imports: [ScheduleModule.forRoot(), JobsRecoveryModule],
})
export default class TasksModule {}
