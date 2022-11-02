import { config } from 'dotenv';

config();

export default {
  bnb: {
    filter_refresh: 5 * 1000, // 5 sec
    filter_timeout: 5 * 60 * 1000, // 5 min
    rpc: process.env.BNB_PROVIDER,
  },
  backend_private_key: process.env.BACKEND_PRIVATE_KEY,
};
