import React from "react";

const RootLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4 py-8 sm:py-12">
      {children}
    </div>
  );
};

export default RootLayout;
