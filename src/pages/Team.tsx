import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';
import manishImg from './manish.jpg';
import amitImg from './amit.jpg';

export default function Team() {
  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
          Meet Our Leaders
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Manish Pokhriyal */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 hover:border-blue-400/50 transition-all duration-300">
            <div className="flex flex-col items-center">
              <div className="relative w-48 h-48 mb-6">
                <div className="absolute inset-0 bg-blue-500 rounded-full blur opacity-25"></div>
                <img 
                  src={manishImg}
                  alt="Manish Pokhriyal"
                  className="relative rounded-full w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2">Manish Pokhriyal</h3>
              <p className="text-blue-400 mb-4">Founder & CEO</p>
              <p className="text-gray-300 text-center mb-6">
                Visionary tech entrepreneur and software engineer with over a decade of experience in building innovative digital solutions. Specializing in full-stack development, cloud architecture, and emerging technologies.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Github size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Linkedin size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Twitter size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Amit Rawat */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 hover:border-blue-400/50 transition-all duration-300">
            <div className="flex flex-col items-center">
              <div className="relative w-48 h-48 mb-6">
                <div className="absolute inset-0 bg-blue-500 rounded-full blur opacity-25"></div>
                <img 
                  src={amitImg}
                  alt="Amit Rawat"
                  className="relative rounded-full w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2">Amit Rawat</h3>
              <p className="text-blue-400 mb-4">Co-Founder</p>
              <p className="text-gray-300 text-center mb-6">
                Passionate app technology expert with a strong background in mobile and web development. Specializing in modern frameworks, performance optimization, and seamless user experiences.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Github size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Linkedin size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Twitter size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
