// GiftBoxIcon.tsx
import React from 'react';

const GiftBoxIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="8" width="18" height="4" rx="1" ry="1" />
    <line x1="12" y1="8" x2="12" y2="21" />
    <path d="M5 8V3H19V8" />
    <path d="M5 8V21" />
    <path d="M19 8V21" />
  </svg>
);

export default GiftBoxIcon;
