import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;

    if (!section || !card) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(card,
        { y: 60, opacity: 0, rotateX: 10 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
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

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative w-full py-24 bg-neo-blue"
    >
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <div className="mb-16">
            <span className="font-mono text-sm text-neo-black uppercase tracking-widest bg-white border-4 border-neo-black px-4 py-2 inline-block mb-4">
              EDUCATION
            </span>
            <h2 className="text-5xl md:text-7xl font-display font-black text-white tracking-tighter">
              WHERE I STUDIED
            </h2>
          </div>

          {/* Education Card */}
          <div
            ref={cardRef}
            className="bg-white border-4 border-neo-black shadow-neo-xl p-8 md:p-12"
            style={{ perspective: '1000px' }}
          >
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              {/* Icon */}
              <div className="bg-neo-black p-6 flex-shrink-0">
                <GraduationCap className="w-12 h-12 text-neo-yellow" />
              </div>

              {/* Content */}
              <div className="flex-grow">
                <h3 className="text-3xl md:text-4xl font-display font-black text-neo-black mb-4">
                  Anna University - Rajalakshmi Engineering College
                </h3>
                <p className="font-mono text-lg text-neo-black mb-2">
                   
                </p>
                <p className="font-body text-neo-black mb-6">
                  Bachelor of Engineering in Computer Science Engineering
                </p>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 bg-neo-yellow border-4 border-neo-black px-4 py-2">
                    <MapPin className="w-4 h-4" />
                    <span className="font-mono text-sm font-bold">
                      Chennai, India
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-neo-green border-4 border-neo-black px-4 py-2">
                    <Calendar className="w-4 h-4" />
                    <span className="font-mono text-sm font-bold">
                      May 2025
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 hidden lg:block">
        <div className="w-24 h-24 border-4 border-white bg-transparent rotate-45" />
      </div>
      <div className="absolute bottom-10 left-10 hidden lg:block">
        <div className="w-16 h-16 border-4 border-neo-black bg-neo-yellow" />
      </div>
    </section>
  );
};

export default Education;
