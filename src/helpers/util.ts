import { drive_v3 } from 'googleapis';
import axios from 'axios';
import { NEXT_IMAGE_PREFIX } from '../constant';

async function convertImageToBuffer(url: string) {
  const { data } = await axios.get(url, { responseType: 'arraybuffer' });
  return Buffer.from(data);
}

function sanitizeImageName(imageName: drive_v3.Schema$File['name']) {
  if (imageName?.includes(NEXT_IMAGE_PREFIX)) {
    // Sample image name: NEXT.DESCRIPTION.jpg
    return imageName?.split('.')[1];
  }
  // Sample image name: DESCRIPTION.jpg
  return imageName?.split('.')[0];
}

export { convertImageToBuffer, sanitizeImageName };
