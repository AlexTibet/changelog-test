import { Test } from '@nestjs/testing';

import CronModule from '../app/cron.module';

export default async function ApplicationTestModule() {
  const moduleFixture = await Test.createTestingModule({
    imports: [CronModule],
  }).compile();

  const app = moduleFixture.createNestApplication(null, {
    logger: false,
  });

  await app.init();
  return app;
}
