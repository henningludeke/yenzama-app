import React from 'react';

interface DeviceFrameProps {
  children: React.ReactNode;
}

const DeviceFrame: React.FC<DeviceFrameProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-0 md:p-8">
      {/* Mobile view: full screen, no frame */}
      <div className="w-full h-full md:hidden bg-white min-h-screen overflow-x-hidden">
        {children}
      </div>

      {/* Desktop view: centered phone frame */}
      <div className="hidden md:block relative w-[360px] h-[780px] bg-white rounded-[3rem] shadow-2xl border-[12px] border-gray-900 overflow-hidden">
        {/* Notch / Camera cutout */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-2xl z-20"></div>

        {/* Content area */}
        <div className="w-full h-full overflow-y-auto overflow-x-hidden scrollbar-hide pt-safe pb-safe">
          {children}
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-900/20 rounded-full z-20"></div>
      </div>
    </div>
  );
};

export default DeviceFrame;
