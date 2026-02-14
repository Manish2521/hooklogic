import React, { useEffect, useState } from 'react';
import { ArrowRight, ChevronDown, Code2, Brain, Cpu, Globe, Rocket, Server, Star, Users, Zap, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

function AnimatedSection({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-500 ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const techStack = [
    { icon: <Code2 size={32} />, name: "Full Stack Development", desc: "MERN, MEAN, Python, Java" },
    { icon: <Brain size={32} />, name: "AI & ML", desc: "TensorFlow, PyTorch, NLP" },
    { icon: <Cpu size={32} />, name: "Cloud Computing", desc: "AWS, Azure, GCP" },
    { icon: <Smartphone size={32} />, name: "App Development", desc: "iOS, Android, React Native, Flutter" },
    { icon: <Rocket size={32} />, name: "DevOps", desc: "CI/CD, Docker, Kubernetes" },
    { icon: <Server size={32} />, name: "Microservices", desc: "API Gateway, Service Mesh" }
  ];

  const testimonials = [
    {
      name: "Rajesh Verma",
      role: "Owner, Verma Electronics",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      quote: "We needed a simple website and inventory system for our shop. HookLogic understood exactly what we wanted and delivered it on time. Now our billing is faster and customers can check products online."
    },
    {
      name: "Neha Sharma",
      role: "Founder, Handmade Bliss (Home Business)",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      quote: "As a small business owner, I don’t have much technical knowledge. The team explained everything clearly and built an easy-to-manage website for me. I can now update products myself without depending on anyone."
    },
    {
      name: "Arjun Mehta",
      role: "Local Restaurant Owner",
      image: "https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=400&q=80",
      quote: "HookLogic created our online ordering system and improved our Google presence. We’ve seen more online orders and better customer feedback. Their support team is quick to respond whenever we need help."
    }
  ];

  const stats = [
    { icon: <Zap size={24} />, value: "100+", label: "Projects Completed" },
    { icon: <Users size={24} />, value: "50+", label: "Happy Clients" },
    { icon: <Star size={24} />, value: "95%", label: "Client Satisfaction" },
    { icon: <Globe size={24} />, value: "24/7", label: "Support" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20"></div>
        
        <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 animate-gradient">
            Welcome to HookLogic
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Where Innovation Meets Technology
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => navigate('/services')}
              className="group px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              Our Services
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="px-8 py-3 border border-blue-400 hover:border-blue-300 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Get in Touch
            </button>
          </div>
        </div>
        
        <button 
          onClick={() => {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
          }}
          className="absolute bottom-10 w-full text-center animate-bounce"
        >
          <ChevronDown className="mx-auto" size={32} />
        </button>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="text-center">
                  <div className="text-blue-400 flex justify-center mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Cutting-Edge Technology Stack
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techStack.map((tech, index) => (
              <AnimatedSection key={index} delay={index * 100} className="h-full">
                <div className="h-full bg-slate-800/30 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 hover:border-blue-400/50 transition-all duration-300 transform hover:scale-105 hover:bg-slate-800/50">
                  <div className="text-blue-400 mb-4">{tech.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{tech.name}</h3>
                  <p className="text-gray-400">{tech.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              What Our Clients Say
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection key={index} delay={index * 200}>
                <div className="bg-slate-800/30 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 hover:border-blue-400/50 transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 italic">"{testimonial.quote}"</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-90"></div>
              <div className="relative py-16 px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Ideas into Reality?</h2>
                <p className="text-xl mb-8 max-w-2xl mx-auto">Let's collaborate to build innovative solutions that drive your business forward.</p>
                <button 
                  onClick={() => navigate('/contact')}
                  className="px-8 py-3 bg-white text-blue-600 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                >
                  Get Started Today
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
