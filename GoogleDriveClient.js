import { google } from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();

const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;

const auth = new google.auth.GoogleAuth({
  keyFile: './SA_KEY.json',
  scopes: ['https://www.googleapis.com/auth/drive'],
});

const drive = google.drive({
  version: 'v3',
  auth,
});

async function getImageData(imagePrefix) {
  const res = await drive.files.list({
    q: `'${FOLDER_ID}' in parents and name contains '${imagePrefix}'`,
    fields: 'files(id, name, mimeType, webContentLink)',
  });

  if (!res.data.files.length) {
    throw new Error(
      `File name with prefix '${imagePrefix}' could not be found in google drive`
    );
  }
  const imageData = res.data.files[0];

  return {
    url: imageData.webContentLink,
    altText: sanitizeImageName(imageData.name),
    mimeType: imageData.mimeType,
  };
}

function sanitizeImageName(imageName) {
  // Sample image name: 00001.DESCRIPTION.jpg
  return imageName.split('.')[1];
}

export default { getImageData };
