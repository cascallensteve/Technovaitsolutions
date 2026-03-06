type CloudinaryUploadResult = {
  secure_url?: string
  url?: string
  public_id?: string
}

const FALLBACK_CLOUDINARY_CLOUD_NAME = 'dijnmj1ea'
const FALLBACK_CLOUDINARY_UPLOAD_PRESET = 'technova'

function getCloudinaryConfig() {
  const cloudName = String((import.meta as any)?.env?.VITE_CLOUDINARY_CLOUD_NAME || '').trim() || FALLBACK_CLOUDINARY_CLOUD_NAME
  const uploadPreset = String((import.meta as any)?.env?.VITE_CLOUDINARY_UPLOAD_PRESET || '').trim() || FALLBACK_CLOUDINARY_UPLOAD_PRESET

  // Helpful runtime diagnostics (safe: does not print secrets)
  console.debug('[cloudinary] mode=', (import.meta as any)?.env?.MODE)
  console.debug('[cloudinary] configured=', Boolean(cloudName) && Boolean(uploadPreset))

  return {
    cloudName,
    uploadPreset,
  }
}

export async function uploadImageToCloudinary(file: File): Promise<{ imageUrl: string }> {
  const { cloudName, uploadPreset } = getCloudinaryConfig()

  if (!cloudName || !uploadPreset) {
    const missing = [
      !cloudName ? 'VITE_CLOUDINARY_CLOUD_NAME' : null,
      !uploadPreset ? 'VITE_CLOUDINARY_UPLOAD_PRESET' : null,
    ].filter(Boolean)
    throw new Error(`Cloudinary is not configured. Missing: ${missing.join(', ')}`)
  }

  const form = new FormData()
  form.append('file', file)
  form.append('upload_preset', uploadPreset)

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: form,
  })

  const data: CloudinaryUploadResult = await res.json().catch(() => ({} as any))

  if (!res.ok) {
    const msg = (data as any)?.error?.message || 'Cloudinary upload failed'
    throw new Error(msg)
  }

  const imageUrl = data.secure_url || data.url
  if (!imageUrl) {
    throw new Error('Cloudinary upload succeeded but no URL was returned')
  }

  return { imageUrl }
}
