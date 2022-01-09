import { downloadTestFiles } from './download';
import { BlobServiceClient } from '@azure/storage-blob';
const config = require('../local.settings.json');

describe('Download test files', () => {

    beforeEach(async () => {
        process.env = Object.assign(process.env, {
          ...config.Values
        });
        
      });
    it('succeeds to download test files', async () => {

        const list = await  downloadTestFiles();

        expect(list.length).toBeGreaterThan(0);
    });
});