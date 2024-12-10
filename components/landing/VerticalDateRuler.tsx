"use client";

import React from "react";

interface VerticalDateRulerProps {
  height: number;
}

const VerticalDateRuler: React.FC<VerticalDateRulerProps> = ({ height }) => {
  // Create evenly spaced markers
  const getMarkers = () => {
    const markers = [];
    const numberOfMarkers = 8; // Adjust this number to control density of markers
    const spacing = height / numberOfMarkers;

    for (let i = 0; i < numberOfMarkers; i++) {
      markers.push(
        <div
          key={i}
          className="absolute flex items-center gap-2"
          style={{ top: i * spacing }}
        >
          <div className="w-2 h-2 rounded-full bg-purple-500/30" />
          <div className="w-12 h-[1px] bg-purple-500/20" />
        </div>
      );
    }

    return markers;
  };

  return (
    <div className="relative h-full">
      <div className="absolute top-0 bottom-0 left-3 w-[1px] bg-purple-500/20" />
      {getMarkers()}
    </div>
  );
};

export default VerticalDateRuler;
