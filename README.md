
# MoodMirror - AI Emotion Based Music Player

MoodMirror is an interactive web application that uses your webcam and AI-powered face detection to analyze your mood and recommend matching music.

**Features:**
- **Real-time Emotion Detection**: Uses MediaPipe to detect expressions (Happy, Sad, Angry, Stress, Calm).
- **Embedded Music Player**: Plays curated songs matching your detected mood.
- **Privacy First**: All facial analysis happens locally on your device. No video data is sent to the cloud.

## 🚀 How to Run Locally

1.  **Install Dependencies** (if you haven't already):
    ```bash
    npm install
    ```

2.  **Start the Development Server**:
    ```bash
    npm run dev
    ```

3.  Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 How to Build for Production

To create an optimized "production-ready" version of the app:

```bash
npm run build
```

This will create a `dist` folder containing all the HTML, CSS, and JavaScript files needed to run the app. You can upload this folder to any static hosting provider.

## 🌐 How to Publish (Deployment)

### Option 1: Vercel (Recommended)
Vercel is the easiest way to deploy Vite apps.

1.  Create an account at [vercel.com](https://vercel.com).
2.  Install the Vercel CLI:
    ```bash
    npm i -g vercel
    ```
3.  Run the deploy command in this project folder:
    ```bash
    vercel
    ```
4.  Follow the prompts (say "Yes" to everything).

Alternatively, if you push this code to GitHub, you can import the repository on the Vercel dashboard for automatic deployments.

### Option 2: Netlify (Drag & Drop)
1.  Run the build command:
    ```bash
    npm run build
    ```
2.  Go to [netlify.com](https://netlify.com) and sign up/login.
3.  Drag and drop the `dist` folder onto the Netlify dashboard.
4.  Your site will be live instantly!

### Option 3: GitHub Pages
1.  Push your code to a GitHub repository.
2.  Go to Settings > Pages.
3.  Select "GitHub Actions" as the source.
4.  Choose the "Static HTML" workflow.

### Option 4: AWS (Amazon Web Services)

You can host this static app on AWS using **S3** (storage) and **CloudFront** (CDN/HTTPS).

**Method A: AWS Amplify (Easiest)**
1.  Push your code to GitHub, GitLab, or Bitbucket.
2.  Log in to the AWS Console and search for **AWS Amplify**.
3.  Choose **"Host web app"**.
4.  Connect your repository (e.g., GitHub).
5.  Amplify will automatically detect the settings. Click **"Save and Deploy"**.

**Method B: S3 Static Website Hosting (Manual)**
1.  Run `npm run build` in your terminal.
2.  Go to **S3** in AWS Console and **Create a Bucket**.
    - Uncheck "Block all public access" (you need it public).
3.  Upload the contents of the `dist` folder to the bucket.
4.  Go to **Properties** > **Static website hosting** and enable it.
5.  Set `index.html` as the index document.
6.  (Optional) Set up **CloudFront** in front of your S3 bucket for HTTPS support.
=======
# FaceMirror
FaceMirror is a web application that analyzes real-time facial movements through the camera to detect user mood and suggest music accordingly, delivering a smart and immersive experience.

