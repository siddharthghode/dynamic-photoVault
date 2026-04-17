import React from 'react';

function LoadingSkeleton({ height = 100, width = '100%', className = '' }) {
  const style = {
    height,
    width,
    backgroundColor: '#e0e0e0',
    borderRadius: '4px',
  };
  return <div className={`placeholder-glow ${className}`} style={style}></div>;
}

export default LoadingSkeleton;
