import { STORAGE_STATE } from '../playwright.config';
import * as fs from 'fs';

async function globalSetup(): Promise<void> {
  // dotenv.config({ override: true });
  //console.log(process.env.BASE_URL);
  if (fs.existsSync(STORAGE_STATE)) {
    fs.unlinkSync(STORAGE_STATE);
  }
}
export default globalSetup;
