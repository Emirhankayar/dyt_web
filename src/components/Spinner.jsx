import React from 'react';
import { Spinner } from "@material-tailwind/react";

export default function DefaultSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner
        style={{
          width: '80px', 
          height: '80px', 
        }}
      />
    </div>
  );
}