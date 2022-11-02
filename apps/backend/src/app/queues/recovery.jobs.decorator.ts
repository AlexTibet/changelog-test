export const RecoveryJobs = () => {
  return function (target) {
    Reflect.defineMetadata('RECOVERY_METADATA', target.name, target);
  };
};

export default RecoveryJobs;
