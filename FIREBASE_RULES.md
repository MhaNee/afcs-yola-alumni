# Firebase Security Rules Configuration

It looks like the "Missing or insufficient permissions" errors are caused by your Firebase Security Rules blocking access to the database and storage. 

Since I cannot access your Firebase Console to change these directly, please follow these steps to update them manually.

## 1. Firestore Database Rules

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Select your project.
3. Navigate to **Firestore Database** > **Rules** tab.
4. Replace the current rules with the following code to allow authenticated users to read all profiles (for the directory) and edit only their own profile:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users collection rules
    match /users/{userId} {
      // Allow any authenticated user to read user profiles (needed for Directory and Dashboard count)
      allow read: if request.auth != null;
      
      // Allow users to create and update ONLY their own profile
      allow create, update: if request.auth != null && request.auth.uid == userId;
      
      // Optional: Prevent deletion (or allow if you want users to delete their account)
      allow delete: if false; 
    }
  }
}
```
5. Click **Publish**.

## 2. Storage Rules (for Profile Images)

1. Navigate to **Storage** > **Rules** tab in the Firebase Console.
2. Replace the current rules with the following to allow users to upload their own images and anyone to view them:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    // Profile images rules
    match /profile-images/{userId}/{allPaths=**} {
      // Allow anyone to view profile images
      allow read: if true;
      
      // Allow users to upload ONLY to their own folder
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```
3. Click **Publish**.

## 3. Enable Authentication (If not already done)
Ensure you have enabled **Email/Password** and **Google** sign-in providers in the **Authentication** > **Sign-in method** tab.

After updating these rules, refresh your application and try saving the profile again. The errors should be resolved.
