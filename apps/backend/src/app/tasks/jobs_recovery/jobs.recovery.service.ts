import { ModuleRef } from '@nestjs/core';
import { Inject, Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';

import jobs from '../../config/jobs';

import { RECOVERY_METADATA } from './jobs.recovery.constants';

@Injectable()
export default class JobsRecoveryService {
  @Inject(ModuleRef) private _moduleRef: ModuleRef;

  @Interval(jobs.jobs_recovery.filter_timeout)
  async handle() {
    try {
      const container = this._moduleRef['container'];
      const modules = container.getModules();

      for (const module of modules) {
        for (const provider of module[1].providers) {
          if (typeof provider[0] !== 'function') {
            continue;
          }

          if (Reflect.hasMetadata(RECOVERY_METADATA, provider[0])) {
            const instance = this._moduleRef.get(provider[0], {
              strict: false,
            });

            await instance.recoveryJobs();
          }
        }
      }
    } catch (err) {
      throw err;
    }
  }
}
