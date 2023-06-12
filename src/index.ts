import process from 'process';
import Twitter from './helpers/twitterHelper';
import GoogleDrive from './helpers/googleDriveHelper';
import { convertImageToBuffer } from './helpers/util';
import dotenv from 'dotenv';
dotenv.config();

async function main() {
  try {
    const image = await GoogleDrive.getImageData();
    const imageBuffer = await convertImageToBuffer(image.webContentLink);
    const mediaId = await Twitter.uploadImage(imageBuffer, image.mimeType);
    await Twitter.addAltTextToImage(mediaId, image.name);
    await Twitter.tweetImage(mediaId);

    await GoogleDrive.updateFileName(image.id, image.name);
    console.log('Tweeted Successfully');
    process.exit(0);
  } catch (error) {
    console.error('Tweet Failed', error);
    process.exit(1);
  }
}

export { main };
