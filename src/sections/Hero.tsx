import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const emojiRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const name = nameRef.current;
    const desc = descRef.current;
    const socials = socialsRef.current;
    const emoji = emojiRef.current;

    if (!section || !name || !desc || !socials || !emoji) return;

    const ctx = gsap.context(() => {
      // Simple entrance animation - no zoom
      const tl = gsap.timeline({ delay: 0.3 });
      
      tl.fromTo(name, 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
      )
      .fromTo(desc, 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(socials, 
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo(emoji,
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.3'
      );

      // Cute floating animation for emoji
      gsap.to(emoji, {
        y: -8,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-screen bg-neo-black flex items-center justify-center"
    >

      {/* Main content */}
      <div className="text-center px-6 max-w-3xl">
        {/* Name */}
        <h1
          ref={nameRef}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black text-white tracking-tighter mb-4"
        >
          LOGESHWARAN
          ( jesper )
          
        </h1>

        {/* Description */}
        <p
          ref={descRef}
          className="text-lg sm:text-xl md:text-2xl font-mono text-neo-yellow mb-8"
        >
          Creative Developer & Tech Lead
        </p>

        {/* Social Links */}
        <div
          ref={socialsRef}
          className="flex justify-center gap-4"
        >
          {[
            { icon: Github, href: 'https://github.com/logee48' },
            { icon: Linkedin, href: 'https://www.linkedin.com/in/logee48' },
          ].map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 border-2 border-white/30 flex items-center justify-center text-white hover:bg-neo-yellow hover:border-neo-yellow hover:text-neo-black transition-all duration-200"
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <span className="font-mono text-xs text-white uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-white/50 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
