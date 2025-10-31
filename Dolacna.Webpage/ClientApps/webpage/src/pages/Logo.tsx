import React from 'react';

// Simple page that displays the remote logo with a fallback to local asset
const Logo: React.FC = () => {
  const remoteSrc = 'https://usetrislovensko.sk/images/usetri-logo.png';
  const fallbackSrc = '/images/usetri-logo.svg'; // local public asset

  const handleError: React.ReactEventHandler<HTMLImageElement> = (e) => {
    const img = e.currentTarget;
    if (img.src !== window.location.origin + fallbackSrc) {
      img.src = fallbackSrc; // swap to fallback if remote fails
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-brand-light p-6">
      <div className="text-center space-y-6">
        <img
          src={remoteSrc}
          alt="Ušetri Slovensko Logo"
          loading="lazy"
          onError={handleError}
          className="max-w-[280px] w-full h-auto drop-shadow-md"
        />
      </div>
    </main>
  );
};

export default Logo;

