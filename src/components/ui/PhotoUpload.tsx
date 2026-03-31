import React, { useRef } from 'react';

interface PhotoUploadProps {
  onPhotoUpload: (file: File) => void;
  maxPhotos?: number;
  currentPhotos?: string[];
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onPhotoUpload, maxPhotos = 5, currentPhotos = [] }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onPhotoUpload(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-wrap gap-2">
      {currentPhotos.map((photo, index) => (
        <div key={index} className="w-20 h-20 bg-gray-100 rounded-card overflow-hidden">
          <img src={photo} alt={`Uploaded ${index}`} className="w-full h-full object-cover" />
        </div>
      ))}
      {currentPhotos.length < maxPhotos && (
        <button
          onClick={handleUploadClick}
          className="w-20 h-20 bg-surface border-2 border-dashed border-gray-300 rounded-card flex items-center justify-center text-text-secondary"
        >
          <span className="text-xl">+</span>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </button>
      )}
    </div>
  );
};

export default PhotoUpload;
