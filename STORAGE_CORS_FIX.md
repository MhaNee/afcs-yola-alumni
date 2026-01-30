# Fixing Firebase Storage Upload Issues (CORS)

If you are seeing **CORS errors** or **failed uploads** when trying to upload profile images from `localhost`, follow these steps to configure your Firebase Storage bucket to allow requests from your development environment.

## Option 1: Using Google Cloud Shell (Recommended)

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Select your project (**gauth-dc27e**).
3. Click the **Activate Cloud Shell** button (the `>_` icon in the top right header).
4. In the terminal that opens at the bottom of the screen, create a new file named `cors.json`:
   ```bash
   nano cors.json
   ```
5. Paste the following JSON content into the file:
   ```json
   [
     {
       "origin": ["*"],
       "method": ["GET", "POST", "PUT", "DELETE", "HEAD"],
       "responseHeader": ["Content-Type", "x-goog-resumable"],
       "maxAgeSeconds": 3600
     }
   ]
   ```
6. Save and exit (Press `Ctrl+O`, then `Enter`, then `Ctrl+X`).
7. Run the following command to apply the CORS configuration to your bucket:
   ```bash
   gsutil cors set cors.json gs://gauth-dc27e.firebasestorage.app
   ```
   *(Replace the bucket URL if it's different, but based on your .env, this is the correct one).*

## Option 2: Verify Firebase Storage is Enabled

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Select **Storage** from the left-hand menu.
3. If you see a "Get Started" button, click it to initialize Storage.
4. Ensure you have published the rules in the **Rules** tab:
   ```javascript
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /profile-images/{userId}/{allPaths=**} {
         allow read: if true;
         allow write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```

## Why is this necessary?
By default, Google Cloud Storage buckets (which power Firebase Storage) block cross-origin requests for security. When you develop on `localhost:5173` (or any local port), the browser sends a "Preflight" request to check if it's allowed to upload. Without this configuration, the bucket rejects the request, leading to the CORS error you see in the console.
