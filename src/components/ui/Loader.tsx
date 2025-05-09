import React from 'react';

interface LoaderProps {
  size?: number;
  color?: string;
}

export const Loader: React.FC<LoaderProps> = ({ size = 24, color = 'currentColor' }) => {
  const spinnerStyle: React.CSSProperties = {
    width: size,
    height: size,
    border: `${size / 8}px solid transparent`,
    borderTopColor: color,
    borderRightColor: color,
    borderRadius: '50%',
    display: 'inline-block',
    animation: 'spin 0.8s linear infinite',
  };

  const keyframesStyle = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  return (
    <>
      <style>{keyframesStyle}</style>
      <div style={spinnerStyle} role="status" aria-label="Loading...">
        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
}; 