export default {
  block_scanner: {
    concurrency: process.env.BLOCK_SCANNER_CONCURRENCY
      ? Number(process.env.BLOCK_SCANNER_CONCURRENCY)
      : 4,
  },
  ticket_metadata: {
    concurrency: process.env.TICKET_METADATA_CONCURRENCY
      ? Number(process.env.TICKET_METADATA_CONCURRENCY)
      : 4,
  },
  jobs_recovery: {
    filter_timeout: 5 * 60 * 1000, // 5 min
  },
};
