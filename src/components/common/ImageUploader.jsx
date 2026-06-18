import { useCallback, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { FaCloudUploadAlt, FaTimes } from 'react-icons/fa';
import uploadService from '../../services/uploadService';

export default function ImageUploader({
  multiple = true,
  value = [],
  onChange,
  onUploaded,
  label = 'Upload images',
  uploadImmediately = false,
}) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const files = useMemo(() => Array.from(value || []), [value]);

  const updateFiles = useCallback(
    (nextFiles) => {
      onChange?.(multiple ? nextFiles : nextFiles.slice(0, 1));
    },
    [multiple, onChange],
  );

  const addFiles = (fileList) => {
    const incoming = Array.from(fileList || []).filter((file) => file.type.startsWith('image/'));
    updateFiles(multiple ? [...files, ...incoming] : incoming.slice(0, 1));
  };

  const removeFile = (index) => {
    updateFiles(files.filter((_, fileIndex) => fileIndex !== index));
  };

  const uploadSelected = async () => {
    if (!files.length) return;
    setUploading(true);
    try {
      const response = await uploadService.uploadImages(files);
      const images = response.data || [];
      setUploadedImages(images);
      onUploaded?.(images);
      toast.success('Images uploaded');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to upload images');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          addFiles(event.dataTransfer.files);
        }}
        className={`flex min-h-36 w-full flex-col items-center justify-center rounded-xl border border-dashed px-5 py-6 text-center transition ${
          dragging ? 'border-gold bg-gold/10' : 'border-white/20 bg-white/5 hover:border-gold'
        }`}
      >
        <FaCloudUploadAlt className="text-3xl text-gold" />
        <span className="mt-3 text-sm font-bold text-white">{label}</span>
        <span className="mt-1 text-xs text-white/45">Drag images here or browse</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="hidden"
        onChange={(event) => addFiles(event.target.files)}
      />
      {files.length ? (
        <>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {files.map((file, index) => (
              <div key={`${file.name}-${index}`} className="relative overflow-hidden rounded-lg border border-white/10">
                <img src={URL.createObjectURL(file)} alt={file.name} className="h-24 w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute right-2 top-2 rounded-full bg-night/80 p-2 text-white"
                  aria-label="Remove image"
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
          {uploadImmediately ? (
            <button
              type="button"
              onClick={uploadSelected}
              disabled={uploading}
              className="mt-4 rounded-xl bg-gold px-5 py-3 text-sm font-bold text-night disabled:opacity-60"
            >
              {uploading ? 'Uploading...' : 'Upload Selected'}
            </button>
          ) : null}
        </>
      ) : null}
      {uploadedImages.length ? (
        <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white/60">
          {uploadedImages.map((image) => (
            <p key={image.publicId} className="truncate">{image.url}</p>
          ))}
        </div>
      ) : null}
    </div>
  );
}
