import { useEffect, useRef } from 'react';
import { Bot, Database, Cloud, Shield, BarChart, Cog, Zap, Globe } from 'lucide-react';

const SolutionEcosystem3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sceneRef.current) return;
      
      const scrolled = window.scrollY;
      const rotation = scrolled * 0.2;
      
      sceneRef.current.style.transform = `rotateX(${rotation * 0.1}deg) rotateY(${rotation}deg)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const ecosystemNodes = [
    { 
      icon: <Bot className="w-6 h-6" />, 
      label: "AI Core", 
      position: { x: 0, y: 0, z: 100 },
      color: "from-blue-500 to-purple-600"
    },
    { 
      icon: <Database className="w-5 h-5" />, 
      label: "Data Layer", 
      position: { x: 120, y: 80, z: 0 },
      color: "from-green-500 to-emerald-600"
    },
    { 
      icon: <Cloud className="w-5 h-5" />, 
      label: "Cloud Infrastructure", 
      position: { x: -120, y: 80, z: 0 },
      color: "from-cyan-500 to-blue-600"
    },
    { 
      icon: <Shield className="w-5 h-5" />, 
      label: "Security", 
      position: { x: 120, y: -80, z: 0 },
      color: "from-red-500 to-pink-600"
    },
    { 
      icon: <BarChart className="w-5 h-5" />, 
      label: "Analytics", 
      position: { x: -120, y: -80, z: 0 },
      color: "from-orange-500 to-yellow-600"
    },
    { 
      icon: <Cog className="w-5 h-5" />, 
      label: "Automation", 
      position: { x: 0, y: 120, z: -80 },
      color: "from-purple-500 to-indigo-600"
    },
    { 
      icon: <Zap className="w-5 h-5" />, 
      label: "Performance", 
      position: { x: 0, y: -120, z: -80 },
      color: "from-yellow-500 to-orange-600"
    },
    { 
      icon: <Globe className="w-5 h-5" />, 
      label: "Global Scale", 
      position: { x: 0, y: 0, z: -150 },
      color: "from-teal-500 to-green-600"
    }
  ];

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-96 perspective-1000 overflow-hidden"
      style={{ perspective: '1000px' }}
      data-testid="solution-ecosystem-3d"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-orange-500/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)] animate-pulse"></div>
      </div>
      
      {/* 3D Scene Container */}
      <div 
        ref={sceneRef}
        className="absolute inset-0 flex items-center justify-center transform-gpu transition-transform duration-75 ease-out preserve-3d"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: 'rotateX(15deg) rotateY(0deg)'
        }}
      >
        {/* Central Hub */}
        <div 
          className="absolute w-20 h-20 bg-gradient-to-br from-primary to-orange-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse"
          style={{ 
            transform: 'translateZ(0px)',
            filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))'
          }}
          data-testid="central-hub"
        >
          <Bot className="w-8 h-8 text-white" />
        </div>

        {/* Ecosystem Nodes */}
        {ecosystemNodes.map((node, index) => (
          <div
            key={index}
            className="absolute group cursor-pointer"
            style={{
              transform: `translate3d(${node.position.x}px, ${node.position.y}px, ${node.position.z}px)`,
              animation: `float 6s ease-in-out infinite ${index * 0.5}s`
            }}
            data-testid={`ecosystem-node-${index}`}
          >
            {/* Node Container */}
            <div className={`w-16 h-16 bg-gradient-to-br ${node.color} rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-300 border border-white/20 backdrop-blur-sm`}>
              <div className="text-white">
                {node.icon}
              </div>
            </div>
            
            {/* Label */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-white/80 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
              {node.label}
            </div>
            
            {/* Connection Lines */}
            <div 
              className="absolute top-1/2 left-1/2 w-px bg-gradient-to-r from-primary/50 to-transparent origin-left opacity-60"
              style={{
                height: '2px',
                width: `${Math.sqrt(node.position.x ** 2 + node.position.y ** 2) * 0.8}px`,
                transform: `translate(-50%, -50%) rotate(${Math.atan2(node.position.y, node.position.x) * 180 / Math.PI}deg)`
              }}
            ></div>
          </div>
        ))}

        {/* Orbital Rings */}
        <div 
          className="absolute border border-primary/20 rounded-full pointer-events-none"
          style={{ 
            width: '300px', 
            height: '300px',
            transform: 'rotateX(75deg)',
            animation: 'spin 20s linear infinite'
          }}
        ></div>
        <div 
          className="absolute border border-orange-500/20 rounded-full pointer-events-none"
          style={{ 
            width: '400px', 
            height: '400px',
            transform: 'rotateX(75deg) rotateY(45deg)',
            animation: 'spin 30s linear infinite reverse'
          }}
        ></div>
        <div 
          className="absolute border border-primary/10 rounded-full pointer-events-none"
          style={{ 
            width: '500px', 
            height: '500px',
            transform: 'rotateX(75deg) rotateZ(30deg)',
            animation: 'spin 40s linear infinite'
          }}
        ></div>

        {/* Floating Particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-primary/60 rounded-full animate-pulse"
            style={{
              transform: `translate3d(${Math.cos(i * 30 * Math.PI / 180) * 200}px, ${Math.sin(i * 30 * Math.PI / 180) * 200}px, ${Math.sin(i * 60 * Math.PI / 180) * 100}px)`,
              animation: `orbit 15s linear infinite ${i * 0.8}s, pulse 2s ease-in-out infinite ${i * 0.2}s`
            }}
          ></div>
        ))}
      </div>

      {/* Info Panel */}
      <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center">
        <h3 className="text-white font-semibold mb-2">Interactive Solution Ecosystem</h3>
        <p className="text-white/80 text-sm">Scroll to explore our interconnected AI-powered solutions</p>
      </div>
    </div>
  );
};

export default SolutionEcosystem3D;