import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-white py-4">
      <p className="text-center">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
    </footer>
  );
};

export default Footer;