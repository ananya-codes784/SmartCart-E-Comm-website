import React, { useState } from 'react';

interface FashionImageProps {
  src: string;
  alt: string;
  className?: string;
  category?: string;
  gender?: string;
}

export const FashionImage: React.FC<FashionImageProps> = ({
  src,
  alt,
  className = '',
  category,
  gender,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-[#F5F4F0] via-[#EFECE6] to-[#E3E0D8] text-[#4A5548] p-6 overflow-hidden ${className}`}
      >
        {/* Subtle decorative editorial backdrop lines */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#18181B_1px,transparent_1px)] [background-size:16px_16px]" />
        <svg
          className="w-16 h-16 text-[#727D6F] opacity-70 mb-3 drop-shadow-sm"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Elegant tailored silhouette icon */}
          <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
        </svg>
        <span className="font-editorial text-sm font-medium tracking-wider text-[#18181B] text-center line-clamp-1">
          {alt || 'SmartCart Atelier'}
        </span>
        <span className="text-[11px] uppercase tracking-widest text-[#727D6F] mt-1">
          {gender ? `${gender} · ` : ''}{category || 'Luxury Ready-to-Wear'}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#F5F4F0] ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#EFECE6] animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
