import React from 'react';
import { 
  Code2, 
  Smartphone, 
  Globe, 
  Cpu, 
  BrainCircuit,
  MessageSquareCode
} from 'lucide-react';

export default function Services() {
  const services = [
    { 
      icon: <Code2 size={32} />, 
      title: "Software Development", 
      desc: "Custom software solutions built with cutting-edge technologies",
      features: ["Web Applications", "Enterprise Software", "Cloud Solutions"]
    },
    { 
      icon: <Smartphone size={32} />, 
      title: "Mobile Apps", 
      desc: "Native and cross-platform mobile applications",
      features: ["iOS Development", "Android Development", "React Native"]
    },
    { 
      icon: <Globe size={32} />, 
      title: "Digital Marketing", 
      desc: "Data-driven digital marketing strategies",
      features: ["SEO Optimization", "Social Media", "Content Strategy"]
    },
    { 
      icon: <Cpu size={32} />, 
      title: "AI Solutions", 
      desc: "Intelligent automation and machine learning integration",
      features: ["Machine Learning", "Data Analytics", "Process Automation"]
    },
    { 
      icon: <BrainCircuit size={32} />, 
      title: "Tech Consulting", 
      desc: "Expert guidance for digital transformation",
      features: ["Strategy Planning", "Technology Assessment", "Digital Roadmap"]
    },
    { 
      icon: <MessageSquareCode size={32} />, 
      title: "API Development", 
      desc: "Robust and scalable API architectures",
      features: ["RESTful APIs", "GraphQL", "Microservices"]
    }
  ];

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
          Our Services
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl hover:transform hover:scale-105 transition-all duration-300 border border-slate-700/50 hover:border-blue-400/50"
            >
              <div className="text-blue-400 mb-4 transform transition-transform group-hover:scale-110">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-400 mb-4">{service.desc}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="text-gray-300 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}