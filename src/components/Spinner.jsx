import React from 'react';
import { Spinner } from "@material-tailwind/react";

export default function DefaultSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300 z-100000">
      <Spinner
        style={{
          width: '60px', 
          height: '60px', 
        }}
      />
    </div>
  );
}