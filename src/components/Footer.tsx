import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-white py-4 relative bottom-0 w-full">
      <p className="text-center text-sm sm:text-base">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
    </footer>
  );
};

export default Footer;