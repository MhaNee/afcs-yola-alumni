# 🔧 Firestore Error: Failed to Load/Update Profile

## Possible Causes

### 1. **Firestore Security Rules** (Most Likely)
Your Firestore database might have restrictive security rules that prevent reading/writing user data.

### 2. **Network/Connection Issues**
Firebase might not be connecting properly.

### 3. **Missing User Document**
The user document might not exist in Firestore.

---

## Quick Fixes

### Fix 1: Update Firestore Security Rules

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: `gauth-dc27e`
3. Click **Firestore Database** in the left sidebar
4. Click the **Rules** tab
5. Replace the rules with this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow users to read and write their own data
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow authenticated users to read all user profiles (for directory)
    match /users/{userId} {
      allow read: if request.auth != null;
    }
  }
}
```

6. Click **Publish**

### Fix 2: Check Firebase Connection

Open browser console (F12) and check for errors. Look for:
- `Permission denied` → Firestore rules issue
- `Network error` → Connection issue
- `Document not found` → User document missing

### Fix 3: Verify Environment Variables

Make sure your `.env` file has all Firebase credentials:

```env
VITE_FIREBASE_API_KEY=AIzaSyB2F7DDDqjRq8mmlmjU07C0BGsIoRc7k98
VITE_FIREBASE_AUTH_DOMAIN=gauth-dc27e.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=gauth-dc27e
VITE_FIREBASE_STORAGE_BUCKET=gauth-dc27e.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=969367896572
VITE_FIREBASE_APP_ID=1:969367896572:web:85ee053f9e1f9e8c21b279
VITE_FIREBASE_MEASUREMENT_ID=G-CQ4EHZV384
```

---

## Diagnostic Steps

### Step 1: Check Browser Console
1. Open browser (F12)
2. Go to **Console** tab
3. Look for error messages
4. Share the exact error message

### Step 2: Check Network Tab
1. Open browser (F12)
2. Go to **Network** tab
3. Try to load profile page
4. Look for failed requests to `firestore.googleapis.com`
5. Check the response status (403 = permission denied, 404 = not found)

### Step 3: Test Firestore Connection

Add this temporary code to test connection:

```typescript
// In ProfilePage.tsx, add this inside useEffect
console.log('Firebase DB:', db);
console.log('User:', user);
console.log('Attempting to fetch from:', `users/${user?.uid}`);
```

---

## Most Common Issue: Firestore Rules

If you see **"Permission denied"** or **"Missing or insufficient permissions"**, it's definitely a Firestore rules issue.

### Quick Test Rules (Development Only)

**⚠️ WARNING: Only use for testing, not production!**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

This allows all authenticated users to read/write everything. Use only for testing!

---

## After Fixing

1. Update Firestore rules
2. Restart your dev server: `npm run dev`
3. Clear browser cache (Ctrl+Shift+Delete)
4. Try loading profile page again
5. Try updating profile

---

## Still Having Issues?

Please share:
1. Exact error message from browser console
2. Network tab screenshot showing failed requests
3. Current Firestore security rules

This will help me diagnose the exact issue!
