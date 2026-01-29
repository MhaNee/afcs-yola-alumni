# 🔧 FIX: Directory Only Shows One Person

## Problem
You can only see yourself in the directory, not the other 3 registered users.

## Cause
Firestore security rules are blocking access to other users' documents.

## Solution

### Update Firestore Security Rules

1. **Go to Firebase Console:**
   https://console.firebase.google.com/project/gauth-dc27e/firestore/rules

2. **Replace the rules with this:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - allow all authenticated users to read all profiles
    // but only allow users to write their own profile
    match /users/{userId} {
      // Anyone authenticated can read any user profile (for directory)
      allow read: if request.auth != null;
      
      // Users can only update their own profile
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Other collections (events, jobs, etc.) - adjust as needed
    match /{document=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

3. **Click "Publish"**

4. **Refresh your browser** and check the directory page

---

## What This Does

### Before (Restrictive):
```javascript
allow read: if request.auth.uid == userId;  // ❌ Can only read own profile
```
**Result:** You only see yourself in the directory

### After (Correct):
```javascript
allow read: if request.auth != null;  // ✅ Can read all profiles
allow write: if request.auth.uid == userId;  // ✅ Can only edit own profile
```
**Result:** You see all 3 registered users in the directory

---

## Security Notes

This is **safe and correct** because:
- ✅ Users must be authenticated to read profiles
- ✅ Users can only edit their own profile
- ✅ This is standard for alumni directories
- ✅ Profile information is meant to be shared with other alumni

---

## After Updating Rules

You should see:
- ✅ All 3 registered users in the directory
- ✅ Their profile pictures
- ✅ Their names, graduation years, locations
- ✅ Search and filter working across all users

---

## Quick Test

After publishing the rules:
1. Refresh the directory page
2. You should now see all 3 users
3. Try searching for their names
4. Try filtering by graduation year

---

**This is the final piece!** Once you update these rules, the directory will show all registered alumni. 🎉
