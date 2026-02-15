import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code2, 
  Terminal, 
  Database, 
  Layers, 
  Box, 
  GitBranch,
  Figma,
  Flame,
  Cpu,
  Globe
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skillsData = {
  languages: [
    { name: 'Python', icon: Terminal, color: 'neo-card-green' },
    { name: 'JavaScript', icon: Code2, color: 'neo-card-yellow' },
    { name: 'C#', icon: Cpu, color: 'neo-card-pink' },
    { name: 'SQL', icon: Database, color: 'neo-card-blue' },
  ],
  frameworks: [
    { name: 'React.js', icon: Layers, color: 'neo-card' },
    { name: 'Node.js', icon: Globe, color: 'neo-card-green' },
    { name: 'Express.js', icon: Box, color: 'neo-card-yellow' },
  ],
  tools: [
    { name: 'Unity', icon: Box, color: 'neo-card-black' },
    { name: 'Git/GitHub', icon: GitBranch, color: 'neo-card' },
    { name: 'Figma', icon: Figma, color: 'neo-card-pink' },
    { name: 'Firebase', icon: Flame, color: 'neo-card-yellow' },
    { name: 'Postman', icon: Terminal, color: 'neo-card-orange' },
  ],
};

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !heading || cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Heading animation - simple fade up, no zoom
      gsap.fromTo(heading,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Cards stagger animation
      gsap.fromTo(cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const getCardClass = (color: string) => {
    const classes: Record<string, string> = {
      'neo-card': 'bg-white border-4 border-neo-black shadow-neo hover:shadow-neo-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200',
      'neo-card-green': 'bg-neo-green border-4 border-neo-black shadow-neo hover:shadow-neo-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200',
      'neo-card-pink': 'bg-neo-pink border-4 border-neo-black shadow-neo hover:shadow-neo-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200',
      'neo-card-blue': 'bg-neo-blue text-white border-4 border-neo-black shadow-neo hover:shadow-neo-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200',
      'neo-card-yellow': 'bg-neo-yellow border-4 border-neo-black shadow-neo hover:shadow-neo-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200',
      'neo-card-black': 'bg-neo-black text-white border-4 border-neo-black shadow-neo hover:shadow-neo-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200',
      'neo-card-orange': 'bg-neo-orange border-4 border-neo-black shadow-neo hover:shadow-neo-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200',
    };
    return classes[color] || classes['neo-card'];
  };

  let cardIndex = 0;

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative w-full py-24 bg-neo-yellow"
    >
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <div className="mb-16">
            <span className="font-mono text-sm text-neo-black uppercase tracking-widest bg-white border-4 border-neo-black px-4 py-2 inline-block mb-4">
              TECHNICAL SKILLS
            </span>
            <h2
              ref={headingRef}
              className="text-5xl md:text-7xl font-display font-black text-neo-black tracking-tighter"
            >
              WHAT I USE
            </h2>
          </div>

          {/* Languages */}
          <div className="mb-12">
            <h3 className="font-mono text-lg font-bold text-neo-black uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="w-3 h-3 bg-neo-black" />
              Languages
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {skillsData.languages.map((skill) => (
                <div
                  key={skill.name}
                  ref={(el) => { cardsRef.current[cardIndex++] = el; }}
                  className={`${getCardClass(skill.color)} p-6 flex flex-col items-center gap-3`}
                >
                  <skill.icon className="w-8 h-8" />
                  <span className="font-mono font-bold text-sm uppercase tracking-wider">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Frameworks */}
          <div className="mb-12">
            <h3 className="font-mono text-lg font-bold text-neo-black uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="w-3 h-3 bg-neo-black" />
              Frameworks
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {skillsData.frameworks.map((skill) => (
                <div
                  key={skill.name}
                  ref={(el) => { cardsRef.current[cardIndex++] = el; }}
                  className={`${getCardClass(skill.color)} p-6 flex flex-col items-center gap-3`}
                >
                  <skill.icon className="w-8 h-8" />
                  <span className="font-mono font-bold text-sm uppercase tracking-wider">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-mono text-lg font-bold text-neo-black uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="w-3 h-3 bg-neo-black" />
              Tools
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {skillsData.tools.map((skill) => (
                <div
                  key={skill.name}
                  ref={(el) => { cardsRef.current[cardIndex++] = el; }}
                  className={`${getCardClass(skill.color)} p-6 flex flex-col items-center gap-3`}
                >
                  <skill.icon className="w-8 h-8" />
                  <span className="font-mono font-bold text-sm uppercase tracking-wider text-center">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 right-10 hidden lg:block">
        <div className="w-16 h-16 border-4 border-neo-black bg-white rotate-45" />
      </div>
      <div className="absolute bottom-20 left-10 hidden lg:block">
        <div className="w-12 h-12 border-4 border-neo-black bg-neo-blue" />
      </div>
    </section>
  );
};

export default Skills;
