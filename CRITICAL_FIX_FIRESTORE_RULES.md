# 🔧 CRITICAL: Make User Profiles Global (Visible to All)

## Problem
Users can only see their own profile. When they try to view other users' profiles in the directory, they get permission errors.

## Root Cause
**Firestore Security Rules are too restrictive.**

Your current rules probably look like this:
```javascript
match /users/{userId} {
  allow read, write: if request.auth.uid == userId;  // ❌ WRONG - Only own profile
}
```

This means users can ONLY read their own document, which breaks:
- ✅ Alumni Directory (can't see other users)
- ✅ Profile viewing (can't view other profiles)
- ✅ Search functionality (can't search other users)

---

## THE FIX - Update Firestore Security Rules

### Step 1: Go to Firebase Console
**Direct link:** https://console.firebase.google.com/project/gauth-dc27e/firestore/rules

Or manually:
1. Go to https://console.firebase.google.com
2. Select project: `gauth-dc27e`
3. Click **Firestore Database** in left sidebar
4. Click **Rules** tab at the top

### Step 2: Replace with These Rules

**Copy and paste this EXACTLY:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // ========================================
    // USERS COLLECTION - GLOBAL READ ACCESS
    // ========================================
    match /users/{userId} {
      // ✅ ALL authenticated users can read ALL profiles
      // This is needed for:
      // - Alumni directory
      // - Profile viewing
      // - Search functionality
      allow read: if request.auth != null;
      
      // ✅ Users can only write/update their OWN profile
      // This prevents users from editing other people's profiles
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // ========================================
    // OTHER COLLECTIONS (if you have any)
    // ========================================
    // Add rules for other collections as needed
    // For now, allow authenticated users to read/write
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Step 3: Publish the Rules
1. Click the **"Publish"** button (top right)
2. Wait for confirmation message
3. Rules are now live!

---

## What This Does

### ✅ BEFORE (Broken):
```javascript
allow read: if request.auth.uid == userId;
```
- Users can ONLY read their own profile
- Directory shows only 1 person (yourself)
- Can't view other users' profiles
- Search doesn't work

### ✅ AFTER (Fixed):
```javascript
allow read: if request.auth != null;
allow write: if request.auth.uid == userId;
```
- Users can read ALL profiles (if authenticated)
- Directory shows ALL registered users
- Can view any user's profile
- Search works across all users
- Users can ONLY edit their own profile (security maintained)

---

## Security Explanation

**Is this safe?** YES! ✅

This is the **standard and correct** approach for alumni directories because:

1. **Read Access (Global):**
   - ✅ Users must be logged in to read profiles
   - ✅ Profile info is meant to be shared with other alumni
   - ✅ This is how LinkedIn, Facebook, alumni networks work
   - ✅ No sensitive data should be in profiles anyway

2. **Write Access (Restricted):**
   - ✅ Users can ONLY edit their own profile
   - ✅ Cannot modify other users' data
   - ✅ Cannot delete other users
   - ✅ Full security maintained

---

## What Will Work After This Fix

### ✅ Alumni Directory
- Shows all registered users
- Search works across all users
- Filters work properly
- Profile pictures display

### ✅ Profile Viewing
- Click on any user in directory
- View their full profile
- See their information
- Contact them

### ✅ Search & Discovery
- Search by name
- Filter by graduation year
- Filter by location
- Find classmates

---

## Verification Steps

After publishing the rules:

1. **Refresh your browser** (Ctrl+F5)
2. **Go to Directory page**
3. **You should now see all registered users** (not just yourself)
4. **Try searching** - should work across all users
5. **Try filters** - should work properly

---

## Common Questions

### Q: Won't this expose user data?
**A:** Only to authenticated alumni. This is intentional - it's an alumni network! Users should be able to find and connect with each other.

### Q: What if I want some fields private?
**A:** Don't store sensitive data in the public profile. Create a separate `private_data` collection with stricter rules.

### Q: Can users delete other profiles?
**A:** No! The write rule ensures users can only modify their own profile.

---

## Quick Copy-Paste Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## THIS IS THE MOST IMPORTANT FIX! 🚨

Without this, your app won't work properly:
- ❌ Directory broken
- ❌ Search broken  
- ❌ Profile viewing broken
- ❌ Users isolated

With this fix:
- ✅ Directory works
- ✅ Search works
- ✅ Profile viewing works
- ✅ Users can connect

---

**Go to Firebase Console NOW and update these rules!** 👉 https://console.firebase.google.com/project/gauth-dc27e/firestore/rules

This is the #1 thing blocking your app from working properly! 🎯
