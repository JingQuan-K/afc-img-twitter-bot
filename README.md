# Arsenal Image Twitter Bot

A twitter bot that tweets an image related to Arsenal FC periodically. <br>

Dicontinued on 27 Nov 2023 <br>
Final post: https://x.com/afc_shawnyy/status/1729153123845808428

## How it works

- Fetches an image from a designated Google Drive folder using **Google API**.
- Tweets the retrieved image using **Twitter API**.
- Deployed on **Google Cloud Platform (GCP)** as a cloud function.
- Cloud function triggered every X hours using **Google Cloud Scheduler**.
