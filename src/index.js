import fs from 'fs';
import axios from 'axios';
import TwitterClient from './TwitterClient.js';
import GoogleDrive from './GoogleDriveClient.js';

async function main() {
  const lastImageNumber = getLastImageNumber();
  const imagePrefix = getImagePrefix(lastImageNumber);
  const { url, altText, mimeType } = await GoogleDrive.getImageData(
    imagePrefix
  );
  const imageBuffer = convertImageToBuffer(url);

  const mediaId = await uploadImage(imageBuffer, mimeType);
  await addAltTextToImage(mediaId, altText);

  await tweetImage(mediaId);
  updateLastImageNumber(lastImageNumber);
}

function getLastImageNumber() {
  return parseInt(fs.readFileSync('./lastImageNumber.txt'));
}

function updateLastImageNumber(lastImageNumber) {
  fs.writeFileSync('lastImageNumber.txt', String(lastImageNumber + 1));
}

function getImagePrefix(lastImageNumber) {
  return String(lastImageNumber + 1).padStart(5, '0');
}

async function uploadImage(imageBuffer, mimeType) {
  return TwitterClient.v1.uploadMedia(imageBuffer, { mimeType });
}

async function convertImageToBuffer(url) {
  const { data } = await axios.get(url, { responseType: 'arraybuffer' });
  return Buffer.from(data);
}

async function addAltTextToImage(mediaId, altText) {
  await TwitterClient.v1.createMediaMetadata(mediaId, {
    alt_text: { text: altText },
  });
}

async function tweetImage(mediaId) {
  await TwitterClient.v2.tweet('', {
    media: { media_ids: [mediaId] },
  });
}

main().then(() => {
  console.log('Done tweeting.');
  process.exit();
});
