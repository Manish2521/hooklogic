import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900/80 backdrop-blur-sm py-6 sm:py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-6 sm:mb-8">
          {/* Company Info */}
          <div className="text-center sm:text-left">
            <Link to="/" className="inline-flex sm:flex items-center gap-2 mb-4">
              <Code2 className="text-blue-400" size={24} />
              <span className="text-lg font-bold text-white">HookLogic</span>
            </Link>
            <p className="text-sm text-gray-400 max-w-xs mx-auto sm:mx-0">
              Transforming ideas into powerful digital solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex justify-center sm:justify-start">
            <div className="w-full">
              <h3 className="text-sm font-semibold mb-4 text-center sm:text-left">Quick Links</h3>
              <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 max-w-xs mx-auto sm:mx-0">
                <Link to="/services" className="text-sm text-gray-400 hover:text-blue-400 text-center sm:text-left">Services</Link>
                <Link to="/about" className="text-sm text-gray-400 hover:text-blue-400 text-center sm:text-left">About</Link>
                <Link to="/team" className="text-sm text-gray-400 hover:text-blue-400 text-center sm:text-left">Team</Link>
                <Link to="/contact" className="text-sm text-gray-400 hover:text-blue-400 text-center sm:text-left">Contact</Link>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-sm font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-blue-400 flex-shrink-0" />
                <span className="text-gray-400">New Delhi, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-blue-400 flex-shrink-0" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-blue-400 flex-shrink-0" />
                <span className="text-gray-400">contact.hooklogic@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 pt-4 text-center">
          <p className="text-sm text-gray-400">
            © {currentYear} HookLogic. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}