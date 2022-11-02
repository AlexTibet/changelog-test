import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';

export default abstract class Utils {
  static getUUID(): string {
    return uuidv4();
  }

  static async delay(ms: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }

  static randomBytes() {
    const random = crypto.randomBytes(48);
    return random.toString('hex');
  }
}
