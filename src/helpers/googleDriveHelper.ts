import _ from 'lodash';
import { drive_v3 } from 'googleapis';
import GoogleDrive from '../clients/GoogleDriveClient';
import dotenv from 'dotenv';
import { TWEETED_IMAGE_PREFIX, NEXT_IMAGE_PREFIX } from '../constant';
dotenv.config();

const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;

async function updateFileName(fileId: string, fileName: string) {
  await GoogleDrive.files.update({
    fileId,
    requestBody: {
      name: `${TWEETED_IMAGE_PREFIX}.${fileName}`,
    },
  });
}

async function getImageData() {
  const res = await GoogleDrive.files.list({
    q: `'${FOLDER_ID}' in parents and not name contains '${TWEETED_IMAGE_PREFIX}'`,
    fields: 'files(id, name, mimeType, webContentLink)',
  });

  const files = res.data?.files ?? [];
  let imageData: drive_v3.Schema$File = {};

  if (files.length === 0) {
    throw new Error(`No files could not be found in google drive`);
  } else {
    imageData =
      files.find((file) => file.name?.includes(NEXT_IMAGE_PREFIX)) ??
      files[Math.floor(Math.random() * files.length)];
  }

  return {
    id: imageData.id || '',
    webContentLink: imageData.webContentLink || '',
    name: imageData.name || '',
    mimeType: imageData.mimeType || '',
  };
}

export default { updateFileName, getImageData };
