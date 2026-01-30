# ⚠️ IMPORTANT: Create Cloudinary Upload Preset

Your `.env` file has been configured with:
- **Cloud Name:** `dagodmpvb` ✅
- **Upload Preset:** `ml_default` ⚠️ (needs verification)

## Quick Setup Steps

### 1. Verify/Create Upload Preset

The `ml_default` preset may not be configured for unsigned uploads. Follow these steps:

1. **Go to Cloudinary Dashboard:**
   - Visit: https://cloudinary.com/console
   - Log in with your account

2. **Navigate to Upload Settings:**
   - Click the **Settings** icon (⚙️) in the top right
   - Click the **Upload** tab in the left sidebar

3. **Create a New Upload Preset:**
   - Scroll down to **Upload presets** section
   - Click **Add upload preset**
   
4. **Configure the Preset:**
   ```
   Preset name: afcs_alumni_profiles
   Signing Mode: Unsigned ⚠️ IMPORTANT!
   Folder: profile-images (optional)
   Access mode: Public
   Unique filename: ✓ Enabled
   Overwrite: ✓ Enabled (optional)
   ```

5. **Save the Preset:**
   - Click **Save**
   - Copy the preset name (e.g., `afcs_alumni_profiles`)

6. **Update Your .env File:**
   - Replace `ml_default` with your new preset name:
   ```env
   VITE_CLOUDINARY_UPLOAD_PRESET=afcs_alumni_profiles
   ```

### 2. Why "Unsigned" Mode?

- **Unsigned** mode allows browser-based uploads without exposing your API secret
- This is the recommended and secure way for client-side uploads
- Users can only upload, not delete or modify existing files

### 3. Test the Configuration

After updating the preset:

```bash
# Restart your dev server
npm run dev
```

Then:
1. Navigate to your profile page
2. Click the camera icon
3. Upload an image
4. Check the browser console - you should see a Cloudinary URL like:
   ```
   https://res.cloudinary.com/dagodmpvb/image/upload/v1234567890/profile-images/abc123.jpg
   ```

## Current Configuration

```env
VITE_CLOUDINARY_CLOUD_NAME=dagodmpvb ✅
VITE_CLOUDINARY_UPLOAD_PRESET=ml_default ⚠️ (verify this is unsigned)
```

## Troubleshooting

### Error: "Upload failed" or "Invalid signature"
**Cause:** The upload preset is not set to "Unsigned" mode  
**Solution:** Create a new preset with Unsigned mode enabled

### Error: "Cloudinary configuration is missing"
**Cause:** Environment variables not loaded  
**Solution:** Restart your dev server after editing `.env`

### Images upload but don't save to Firestore
**Cause:** The URL is being generated but not saved  
**Solution:** Check browser console for Firestore errors

## What Happens When You Upload

```
1. User selects image
   ↓
2. Client validates (type, size)
   ↓
3. Upload to Cloudinary API
   ↓
4. Cloudinary returns secure URL
   ↓
5. URL saved to Firestore (users/{uid}/photoURL)
   ↓
6. Image displays from Cloudinary CDN
```

## Benefits

✅ No CORS issues  
✅ Automatic image optimization  
✅ Global CDN delivery  
✅ 25GB free storage  
✅ Image transformations available  

---

**Next Step:** Create the unsigned upload preset in Cloudinary dashboard, then restart your dev server!
