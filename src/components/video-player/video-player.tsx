"use client";
import React, { useState, useRef } from "react";

const SingleVideoPlayer: React.FC = () => {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
    }
  };

  const openFileSelector = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <input
        type="file"
        accept="video/*"
        onChange={handleFileSelect}
        style={{ display: "none" }}
        ref={fileInputRef}
      />
      <button onClick={openFileSelector}>Select Video</button>
      {videoSrc && (
        <video controls width="100%" src={videoSrc}>
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default SingleVideoPlayer;
