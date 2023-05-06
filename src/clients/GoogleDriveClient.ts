import { google } from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SA_KEY || ''),
  scopes: ['https://www.googleapis.com/auth/drive'],
});

const GoogleDrive = google.drive({
  version: 'v3',
  auth,
});

export default GoogleDrive;
