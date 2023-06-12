import TwitterClient from '../clients/TwitterClient';
import { sanitizeImageName } from './util';

async function uploadImage(imageBuffer: Buffer, mimeType: string) {
  return TwitterClient.v1.uploadMedia(imageBuffer, { mimeType });
}

async function addAltTextToImage(mediaId: string, imageName: string) {
  if (process.env.ALLOW_IMAGE_ALT_TEXT === 'false') return;

  await TwitterClient.v1.createMediaMetadata(mediaId, {
    alt_text: { text: sanitizeImageName(imageName) || '' },
  });
}

async function tweetImage(mediaId: string) {
  await TwitterClient.v2.tweet('', {
    media: { media_ids: [mediaId] },
  });
}

export default { uploadImage, addAltTextToImage, tweetImage };
