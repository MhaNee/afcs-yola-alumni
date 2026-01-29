# 🔧 FIX: Upload Preset Must Be Whitelisted

## Error Message
```
Upload Failed
Upload preset must be whitelisted for unsigned uploads
```

## What This Means
Your Cloudinary upload preset `afcs_alumni_profiles` is currently set to **"Signed"** mode, but browser-based uploads require **"Unsigned"** mode.

---

## How to Fix (Step-by-Step)

### Step 1: Go to Cloudinary Dashboard
1. Open https://cloudinary.com/console
2. Log in with your account

### Step 2: Navigate to Upload Settings
1. Click the **Settings** icon (⚙️) in the top right corner
2. In the left sidebar, click **Upload**

### Step 3: Find Your Upload Preset
1. Scroll down to the **Upload presets** section
2. Look for `afcs_alumni_profiles` in the list
3. Click the **Edit** button (pencil icon) next to it

### Step 4: Change Signing Mode
1. Find the **Signing Mode** dropdown
2. Change it from **"Signed"** to **"Unsigned"** ⚠️ IMPORTANT!
3. The setting should now show: `Signing Mode: Unsigned`

### Step 5: Save Changes
1. Scroll to the bottom
2. Click **Save**
3. You should see a success message

### Step 6: Test the Upload
1. Go back to your application
2. Navigate to the Profile page
3. Try uploading an image again
4. It should work now! ✅

---

## Why "Unsigned" Mode?

- **Signed uploads** require your API secret (only safe on backend/server)
- **Unsigned uploads** use a preset (safe for browser/frontend)
- Unsigned mode is the standard for client-side uploads
- It's secure because users can only upload, not delete or modify

---

## Alternative: Create a New Unsigned Preset

If you prefer to create a fresh preset:

1. In Upload Settings, click **Add upload preset**
2. Configure:
   ```
   Preset name: afcs_profiles_unsigned
   Signing Mode: Unsigned ⚠️
   Folder: afcs/alumni/profiles
   Access mode: Public
   Unique filename: ✓ Enabled
   ```
3. Click **Save**
4. Update your `.env` file:
   ```env
   VITE_CLOUDINARY_UPLOAD_PRESET=afcs_profiles_unsigned
   ```
5. Restart dev server: `npm run dev`

---

## Verification

After changing to Unsigned mode, you should see:
- ✅ Image uploads successfully
- ✅ Cloudinary URL returned
- ✅ Image saved to Firestore
- ✅ Image displays on profile

---

## Still Having Issues?

Check these:
1. ✅ Preset name matches exactly (case-sensitive)
2. ✅ Signing Mode is set to "Unsigned"
3. ✅ Cloud name is correct: `dagodmpvb`
4. ✅ Dev server restarted after `.env` changes

---

**Next Step:** Change your preset to "Unsigned" mode in Cloudinary dashboard, then try uploading again!
