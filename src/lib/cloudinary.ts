/**
 * Cloudinary Upload Utility
 * 
 * This utility handles image uploads to Cloudinary.
 * You need to set up your Cloudinary credentials in environment variables:
 * - VITE_CLOUDINARY_CLOUD_NAME
 * - VITE_CLOUDINARY_UPLOAD_PRESET
 */

export interface CloudinaryUploadResponse {
    secure_url: string;
    public_id: string;
    format: string;
    width: number;
    height: number;
    bytes: number;
    created_at: string;
}

/**
 * Upload an image file to Cloudinary
 * @param file - The image file to upload
 * @param folder - Optional folder name in Cloudinary (default: 'afcs/alumni/profiles')
 * @returns Promise with the Cloudinary response containing the secure_url
 */
export const uploadToCloudinary = async (
    file: File,
    folder: string = 'afcs/alumni/profiles'
): Promise<CloudinaryUploadResponse> => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
        throw new Error(
            'Cloudinary configuration is missing. Please set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in your .env file.'
        );
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
        throw new Error('Invalid file type. Please upload a valid image file (JPEG, PNG, GIF, WebP, or SVG).');
    }

    // Validate file size (max 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes
    if (file.size > maxSize) {
        throw new Error('File size exceeds 2MB. Please upload a smaller image.');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('folder', folder);

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'Failed to upload image to Cloudinary');
        }

        const data: CloudinaryUploadResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw error;
    }
};

/**
 * Delete an image from Cloudinary
 * Note: This requires server-side implementation with your API key and secret
 * @param publicId - The public ID of the image to delete
 */
export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
    // This would typically be done on the backend with your API secret
    // For now, we'll just log a warning
    console.warn(
        'Delete operation should be implemented on the backend with Cloudinary API secret.',
        'Public ID:',
        publicId
    );
};
