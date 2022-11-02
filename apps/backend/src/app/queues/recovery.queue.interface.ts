export interface RecoveryQueue {
  recoveryJobs(): Promise<void>;
}
