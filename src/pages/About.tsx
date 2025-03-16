import React from 'react';
import { Rocket } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              About HookLogic
            </h2>
            <p className="text-gray-300 mb-6">
              At HookLogic, we're passionate about pushing the boundaries of technology and innovation. Our mission is to transform businesses through cutting-edge digital solutions that drive growth and success.
            </p>
            <p className="text-gray-300 mb-6">
              Founded with a vision to bridge the gap between complex technology and business needs, we've grown into a trusted partner for companies seeking digital excellence.
            </p>
            <div className="flex items-center gap-4">
              <Rocket className="text-blue-400 animate-pulse" size={24} />
              <span className="text-lg">Innovation is our core value</span>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Modern office space"
                className="w-full h-full object-cover transform transition-transform group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}