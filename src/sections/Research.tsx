import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Users, BookOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Research = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;

    if (!section || !card) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(card,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
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

  return (
    <section
      ref={sectionRef}
      id="research"
      className="relative w-full py-24 bg-neo-pink"
    >
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <div className="mb-16">
            <span className="font-mono text-sm text-neo-black uppercase tracking-widest bg-white border-4 border-neo-black px-4 py-2 inline-block mb-4">
              RESEARCH
            </span>
            <h2 className="text-5xl md:text-7xl font-display font-black text-neo-black tracking-tighter">
              PUBLICATIONS
            </h2>
          </div>

          {/* Research Card */}
          <div
            ref={cardRef}
            className="bg-white border-4 border-neo-black shadow-neo-xl p-8 md:p-12"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-neo-black p-4">
                <FileText className="w-8 h-8 text-neo-yellow" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-display font-black text-neo-black leading-tight mb-4">
                  Campus Carpooling: Optimized Ridesharing for Students using Hybrid Ridesharing Algorithm HRA
                </h3>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-neo-black mt-1" />
                <div>
                  <span className="font-mono text-sm font-bold uppercase tracking-wider text-neo-black block mb-1">
                    Authors
                  </span>
                  <p className="font-body text-sm">
                    Dharshini B S; Logeshwaran Elumalai; Mohamed Aadhil A
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-neo-black mt-1" />
                <div>
                  <span className="font-mono text-sm font-bold uppercase tracking-wider text-neo-black block mb-1">
                    Published In
                  </span>
                  <p className="font-body text-sm">
                    2025 International Conference on Emerging Systems and Intelligent Computing (ESIC)
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-6 border-t-2 border-neo-black">
              <div className="bg-neo-yellow border-4 border-neo-black px-4 py-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider">
                  IEEE Conference
                </span>
              </div>
              <div className="bg-neo-green border-4 border-neo-black px-4 py-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider">
                  Volume 2025, pp. 449-454
                </span>
              </div>
              <div className="bg-neo-blue text-white border-4 border-neo-black px-4 py-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider">
                  Publisher: IEEE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 right-10 hidden lg:block">
        <div className="w-16 h-16 border-4 border-neo-black bg-neo-yellow rotate-12" />
      </div>
    </section>
  );
};

export default Research;
