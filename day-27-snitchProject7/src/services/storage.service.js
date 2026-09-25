import ImageKit, { toFile } from '@imagekit/nodejs';
import { config } from '../config/env.config.js';


const client = new ImageKit({
    publicKey: config.IMAGEKIT_PUBLIC_KEY,
    privateKey: config.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: config.IMAGEKIT_URL_ENDPOINT,
});

export const uploadFile = async ({fileBuffer, fileName}) => {
    const response = await client.files.upload({
        file: await toFile(fileBuffer, fileName),
        fileName: fileName,
        folder: 'products',
    });
    return response;
}