import { Module } from '@nestjs/common';

import DatabaseModule from './database/database.module';
import QueuesModule from './queues/queues.module';
import TasksModule from './tasks/tasks.module';

@Module({
  imports: [DatabaseModule, QueuesModule, TasksModule],
})
export default class CronModule {}
