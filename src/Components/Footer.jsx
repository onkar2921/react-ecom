import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
     <h2 className="text-3xl font-extrabold mb-2 w-full text-center">Literary Escape</h2>
         

    <div className="w-full flex items-center justify-around  mt-4">
    <a href="/about" className="hover:text-gray-300">About Us</a>
          <a href="/contact" className="hover:text-gray-300">Contact Us</a>
          <a href="/faq" className="hover:text-gray-300">FAQ</a>
    </div>
       
      <div className="text-center mt-6">
        <p>&copy; {new Date().getFullYear()} Literary Escape. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
