import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';
dotenv.config();

const appKey = process.env.TWITTER_API_KEY as string;
const appSecret = process.env.TWITTER_API_SECRET as string;
const accessToken = process.env.TWITTER_ACCESS_TOKEN as string;
const accessSecret = process.env.TWITTER_ACCESS_SECRET as string;

const client = new TwitterApi({
  appKey,
  appSecret,
  accessToken,
  accessSecret,
});

const TwitterClient = client.readWrite;

export default TwitterClient;
