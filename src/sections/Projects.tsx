import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Cpu, Gamepad2, MessageSquare, ChevronLeft, ChevronRight, Hand, Facebook } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Indian Bail Prediction System',
    subtitle: 'Machine Learning & FastAPI',
    description: 'Built a machine learning based bail prediction system using Python, FastAPI, and Random Forest, achieving 73% accuracy.',
    tech: ['Python', 'FastAPI', 'Random Forest'],
    icon: Cpu,
    github: 'https://github.com/logee48/bail-prediction-system',
    live: null,
    color: 'neo-card-blue',
  },
  {
    title: 'Whatsapp Ecommerce',
    subtitle: 'Meta API & Node.js',
    description: 'Built a WhatsApp eCommerce bot using Meta API and Razorpay for in-chat ordering and secure prepaid/COD payment methods for orders.',
    tech: ['Python', 'FastAPI', 'Random Forest'],
    icon: Facebook,
    github: 'https://github.com/logee48/whatsapp_ecommerce_system',
    live: 'https://wa.me/917906769090?text=hi',
    color: 'neo-card-pink',
  },
  {
    title: 'VH-ken',
    subtitle: 'Hand Gesture Recognition Game',
    description: 'Developed a gesture-controlled game using TensorFlow and MediaPipe in Python, enabling precise character control.',
    tech: ['Python', 'C#', 'Unity', 'Firebase', 'TensorFlow'],
    icon: Gamepad2,
    github: 'https://github.com/logee48/vh_ken',
    live: null,
    color: 'neo-card-green',
  },
  {
    title: 'HastyCom',
    subtitle: 'Real-time Chat Application',
    description: 'Created a collaborative web app for lab exams with real-time chat rooms and instant messaging, achieving 100% student engagement.',
    tech: ['HTML', 'JavaScript', 'CSS', 'Firebase'],
    icon: MessageSquare,
    github: 'https://github.com/logee48/hasty-com',
    live: 'https://logee48.github.io/hasty-com',
    color: 'neo-card-blue',
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const hasDraggedRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;

    if (!section || !heading) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(heading,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const maxScroll = container.scrollWidth - container.clientWidth;
    const currentScroll = container.scrollLeft;
    
    // Calculate progress percentage (0-100)
    const progress = maxScroll > 0 ? (currentScroll / maxScroll) * 100 : 0;
    setScrollProgress(Math.min(100, Math.max(0, progress)));
    
    setCanScrollLeft(currentScroll > 10);
    setCanScrollRight(currentScroll < maxScroll - 10);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Initial check
    // checkScrollPosition();

    container.addEventListener('scroll', checkScrollPosition, { passive: true });
    
    // Also check on resize
    window.addEventListener('resize', checkScrollPosition, { passive: true });

    return () => {
      container.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = direction === 'left' ? -400 : 400;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setIsDragging(true);
    hasDraggedRef.current = false;
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
    container.style.cursor = 'grabbing';
    container.style.userSelect = 'none';
    container.style.scrollSnapType = 'none'; // Disable snap during drag
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    e.preventDefault();
    const container = scrollContainerRef.current;
    if (!container) return;

    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5; // Smooth scrolling multiplier

    if (Math.abs(walk) > 5) {
      hasDraggedRef.current = true;
    }

    container.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
    const container = scrollContainerRef.current;
    if (container) {
      container.style.cursor = 'grab';
      container.style.userSelect = 'auto';
      container.style.scrollSnapType = 'x mandatory'; // Re-enable snap after drag
    }

    // Reset dragged state after a short delay
    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 100);
  };

  const getCardClass = (color: string) => {
    const classes: Record<string, string> = {
      'neo-card-blue': 'bg-neo-blue text-white border-4 border-neo-black shadow-neo-lg flex-shrink-0',
      'neo-card-pink': 'bg-neo-pink border-4 border-neo-black shadow-neo-lg flex-shrink-0',
      'neo-card-green': 'bg-neo-green border-4 border-neo-black shadow-neo-lg flex-shrink-0',
    };
    return classes[color] || classes['neo-card-blue'];
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full py-24 bg-neo-yellow overflow-hidden"
    >
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="font-mono text-sm text-neo-black uppercase tracking-widest bg-white border-4 border-neo-black px-4 py-2 inline-block mb-4">
                PROJECTS
              </span>
              <h2
                ref={headingRef}
                className="text-5xl md:text-7xl font-display font-black text-neo-black tracking-tighter"
              >
                WHAT I'VE BUILT
              </h2>
            </div>

            {/* Scroll indicator with arrows - Desktop */}
            <div className="hidden md:flex items-center gap-4">
              <span className="font-mono text-sm text-neo-black flex items-center gap-2">
                <Hand className="w-4 h-4" />
                Swipe to explore
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => scroll('left')}
                  disabled={!canScrollLeft}
                  className={`w-12 h-12 border-4 border-neo-black flex items-center justify-center transition-all duration-200 ${
                    canScrollLeft
                      ? 'bg-white hover:bg-neo-black hover:text-white'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => scroll('right')}
                  disabled={!canScrollRight}
                  className={`w-12 h-12 border-4 border-neo-black flex items-center justify-center transition-all duration-200 ${
                    canScrollRight
                      ? 'bg-white hover:bg-neo-black hover:text-white'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Horizontal scroll indicator - Mobile */}
          <div className="md:hidden flex items-center gap-2 mb-4">
            <Hand className="w-4 h-4 text-neo-black animate-pulse" />
            <span className="font-mono text-xs text-neo-black uppercase tracking-wider">
              Swipe to see more
            </span>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-20 snap-x snap-mandatory scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          cursor: 'grab',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {projects.map((project, index) => (
          <div
            key={`${project.title}-${index}`}
            className={`${getCardClass(project.color)} p-5 sm:p-6 w-[85vw] sm:w-[360px] md:w-[400px] snap-start`}
            onClick={(e) => {
              if (hasDraggedRef.current) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
          >
            {/* Icon */}
            <div className="mb-4">
              <project.icon className="w-10 h-10" />
            </div>

            {/* Content */}
            <div>
              <h3 className="text-xl sm:text-2xl font-display font-black mb-1">
                {project.title}
              </h3>
              <p className="font-mono text-xs sm:text-sm opacity-80 mb-3">
                {project.subtitle}
              </p>
              <p className="font-body text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                {project.description}
              </p>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4" style={{color:"black"}}>
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[10px] sm:text-xs uppercase tracking-wider bg-white border-2 border-neo-black px-2 py-0.5"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-4">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider hover:underline"
              >
                <Github className="w-4 h-4" />
                Code
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider hover:underline"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live
                </a>
              )}
            </div>
          </div>
        ))}

        {/* End indicator */}
        <div className="flex-shrink-0 w-[80px] sm:w-[100px] flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-neo-black bg-neo-pink rotate-12 mx-auto mb-2" />
            <span className="font-mono text-[10px] sm:text-xs text-neo-black uppercase">More soon</span>
          </div>
        </div>
      </div>

      {/* Scroll progress indicator - Mobile */}
      <div className="md:hidden mt-4 px-4">
        <div className="h-1.5 bg-neo-black/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-neo-black transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="font-mono text-[10px] text-neo-black/60">Start</span>
          <span className="font-mono text-[10px] text-neo-black/60">{Math.round(scrollProgress)}%</span>
          <span className="font-mono text-[10px] text-neo-black/60">End</span>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-10 right-10 hidden lg:block pointer-events-none">
        <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-neo-black bg-neo-orange rotate-45" />
      </div>
    </section>
  );
};

export default Projects;
