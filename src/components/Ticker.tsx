import { Code2, Terminal, Cpu, Globe, Database, Layers } from 'lucide-react';

const Ticker = () => {
  const items = [
    { icon: Code2, text: 'REACT.JS' },
    { icon: Terminal, text: 'NODE.JS' },
    { icon: Cpu, text: 'PYTHON' },
    { icon: Globe, text: 'JAVASCRIPT' },
    { icon: Database, text: 'SQL' },
    { icon: Layers, text: 'UNITY' },
    { icon: Code2, text: 'C#' },
    { icon: Terminal, text: 'FIREBASE' },
    { icon: Cpu, text: 'MACHINE LEARNING' },
    { icon: Globe, text: 'FULL STACK' },
  ];

  return (
    <div className="w-full bg-neo-black border-b-4 border-neo-black overflow-hidden py-3">
      <div className="flex animate-marquee">
        {[...items, ...items, ...items, ...items].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-8 whitespace-nowrap"
          >
            <item.icon className="w-5 h-5 text-neo-yellow" />
            <span className="font-mono font-bold text-neo-yellow text-sm tracking-widest">
              {item.text}
            </span>
            <span className="text-neo-yellow">★</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
