import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-12 py-6 border-t border-gray-200">
      <div className="text-center text-gray-600 text-sm">
        <p className="flex items-center justify-center gap-2">
          Built with <Heart className="w-4 h-4 text-red-500 fill-current" /> using React & Spring Boot
        </p>
        <p className="mt-2">© 2024 FraudShield. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;