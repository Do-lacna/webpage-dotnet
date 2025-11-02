import React from 'react';

const Logo: React.FC = () => {
  const remoteSrc = 'https://usetrislovensko.sk/images/usetri-logo.png';
  const fallbackSrc = '/images/usetri-logo.svg';

  const handleError: React.ReactEventHandler<HTMLImageElement> = (e) => {
    const img = e.currentTarget;
    if (img.src !== window.location.origin + fallbackSrc) {
      img.src = fallbackSrc;
    }
  };

  return (

        <img
          src={remoteSrc}
          alt="Ušetri Slovensko Logo"
          loading="lazy"
          onError={handleError}
          className="max-w-[280px] w-full h-auto drop-shadow-md"
        />

  );
};

export default Logo;

