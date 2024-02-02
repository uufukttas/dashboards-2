// PersonIcon.tsx
import React from 'react';

interface IconProps {
  strokeColor: string;
}

const PersonIcon = ({
  strokeColor
}: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className='-mt-2'>
    <circle cx="12" cy="12" r="5"></circle>
    <ellipse cx="12" cy="21" rx="8" ry="5"></ellipse>
  </svg>
);

export default PersonIcon;
