import React from 'react';

interface LoadingDotsProps {
  color?: string;
  height?: string;
}

const LoadingDots: React.FC<LoadingDotsProps> = ({ color = '#000', height = '12px' }) => {
  const dotStyle = {
    backgroundColor: color,
    width: height,
    height: height,
  };

  return (
    <span data-testid="loading" className="inline-flex items-center">
      <span
        style={dotStyle}
        className="rounded-full mx-[1px] animate-blink"
      />
      <span
        style={{ ...dotStyle, animationDelay: '0.2s' }}
        className="rounded-full mx-[1px] animate-blink"
      />
      <span
        style={{ ...dotStyle, animationDelay: '0.4s' }}
        className="rounded-full mx-[1px] animate-blink"
      />
    </span>
  );
};

export default LoadingDots;
