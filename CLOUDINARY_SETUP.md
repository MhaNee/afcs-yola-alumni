# Cloudinary Setup Guide

This application now uses **Cloudinary** for profile image uploads instead of Firebase Storage. Follow these steps to configure Cloudinary:

## Step 1: Create a Cloudinary Account

1. Go to [https://cloudinary.com](https://cloudinary.com)
2. Sign up for a free account (or log in if you already have one)
3. The free tier includes:
   - 25 GB storage
   - 25 GB monthly bandwidth
   - 25,000 monthly transformations

## Step 2: Get Your Cloudinary Credentials

1. After logging in, go to your [Cloudinary Dashboard](https://cloudinary.com/console)
2. You'll see your **Cloud Name** - copy this value
3. Scroll down to find your **API Environment variable** section

## Step 3: Create an Upload Preset

An upload preset is required for unsigned uploads from the browser:

1. In your Cloudinary Dashboard, go to **Settings** (gear icon)
2. Click on the **Upload** tab
3. Scroll down to **Upload presets**
4. Click **Add upload preset**
5. Configure the preset:
   - **Preset name**: Choose a name (e.g., `afcs_alumni_profiles`)
   - **Signing Mode**: Select **Unsigned** (important!)
   - **Folder**: You can set a default folder like `profile-images` (optional)
   - **Access mode**: Keep as **Public**
   - **Unique filename**: Enable this to avoid conflicts
   - **Overwrite**: Enable if you want to replace existing images
6. Click **Save**
7. Copy the **preset name** you created

## Step 4: Configure Environment Variables

1. Create a `.env` file in the root of your project (if it doesn't exist)
2. Add the following variables:

```env
# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset_name_here
```

3. Replace `your_cloud_name_here` with your Cloud Name from Step 2
4. Replace `your_upload_preset_name_here` with the preset name from Step 3

**Example:**
```env
VITE_CLOUDINARY_CLOUD_NAME=dxyz123abc
VITE_CLOUDINARY_UPLOAD_PRESET=afcs_alumni_profiles
```

## Step 5: Restart Your Development Server

After adding the environment variables:

```bash
npm run dev
```

## How It Works

- When users upload a profile image, it's sent directly to Cloudinary
- Cloudinary returns a secure HTTPS URL
- This URL is stored in Firebase Firestore in the user's document
- Images are automatically optimized and served via Cloudinary's CDN

## Features

✅ **File Validation**: Only accepts image files (JPEG, PNG, GIF, WebP, SVG)  
✅ **Size Limit**: Maximum 2MB per image  
✅ **Automatic Optimization**: Cloudinary optimizes images for web  
✅ **CDN Delivery**: Fast image loading from Cloudinary's global CDN  
✅ **Organized Storage**: Images are stored in folders by user ID  

## Troubleshooting

### "Cloudinary configuration is missing" Error
- Make sure your `.env` file has both `VITE_CLOUDINARY_CLOUD_NAME` and `VITE_CLOUDINARY_UPLOAD_PRESET`
- Restart your development server after adding environment variables

### "Upload failed" Error
- Check that your upload preset is set to **Unsigned** mode
- Verify the preset name matches exactly (case-sensitive)
- Ensure your Cloudinary account is active

### Images not displaying
- Check the browser console for errors
- Verify the Cloudinary URL is being saved to Firestore
- Ensure the image URL starts with `https://res.cloudinary.com/`

## Migration from Firebase Storage

If you have existing images in Firebase Storage:

1. The old images will continue to work (URLs are still valid)
2. New uploads will use Cloudinary
3. Users can re-upload their profile pictures to migrate to Cloudinary
4. You can optionally write a migration script to move existing images

## Security Notes

- Upload presets must be **unsigned** for browser uploads
- The unsigned preset is safe because it only allows uploads, not deletions
- Consider adding upload restrictions in Cloudinary settings:
  - Maximum file size
  - Allowed file formats
  - Rate limiting

## Additional Resources

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Upload Presets Guide](https://cloudinary.com/documentation/upload_presets)
- [React Integration](https://cloudinary.com/documentation/react_integration)
