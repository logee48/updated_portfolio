import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, ExternalLink, GraduationCap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const certificates = [
  {
    title: 'Applied Accelerated Artificial Intelligence',
    institution: 'Indian Institute of Technology, Palakkad',
    platform: 'NPTEL',
    date: 'October 2022',
    link: 'https://drive.google.com/file/d/1CwO-MvZGkNR5C6K47v-68pOTT4D2ybuJ/view?usp=sharing',
    color: 'neo-card-green',
  },
  {
    title: 'Entrepreneurship',
    institution: 'Indian Institute of Technology, Madras',
    platform: 'NPTEL',
    date: 'October 2024',
    link: 'https://drive.google.com/file/d/1rvZzqfFc9g2n359KnsK2OtI5zGK3_DgR/view?usp=sharing',
    color: 'neo-card-yellow',
  },
  {
    title: 'The Joy of Computing using Python',
    institution: 'Indian Institute of Technology, Madras',
    platform: 'NPTEL',
    date: 'October 2024',
    link: 'https://drive.google.com/file/d/1nSCQIHNOefWBYyUOrLS_v2Bjca28Tuz7/view?usp=sharing',
    color: 'neo-card-pink',
  },
];

const Certificates = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !heading || cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(heading,
        { x: -50, opacity: 0 },
        {
          x: 0,
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

      cards.forEach((card, index) => {
        gsap.fromTo(card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });

    }, section);

    return () => ctx.revert();
  }, []);

  const getCardClass = (color: string) => {
    const classes: Record<string, string> = {
      'neo-card-pink': 'bg-neo-pink border-4 border-neo-black shadow-neo hover:shadow-neo-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200',
      'neo-card-blue': 'bg-neo-blue border-4 border-neo-black shadow-neo hover:shadow-neo-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200',
      'neo-card-green': 'bg-neo-green border-4 border-neo-black shadow-neo hover:shadow-neo-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200',
      'neo-card-yellow': 'bg-neo-yellow border-4 border-neo-black shadow-neo hover:shadow-neo-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200',
    };
    return classes[color] || classes['neo-card-green'];
  };

  return (
    <section
      ref={sectionRef}
      id="certificates"
      className="relative w-full py-24 bg-neo-green"
    >
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <div className="mb-16">
            <span className="font-mono text-sm text-neo-black uppercase tracking-widest bg-white border-4 border-neo-black px-4 py-2 inline-block mb-4">
              CERTIFICATES
            </span>
            <h2
              ref={headingRef}
              className="text-5xl md:text-7xl font-display font-black text-neo-black tracking-tighter"
            >
              CREDENTIALS
            </h2>
          </div>

          {/* Certificate Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert, index) => (
              <div
                key={cert.title}
                ref={(el) => { cardsRef.current[index] = el; }}
                className={`${getCardClass(cert.color)} p-6`}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-neo-black p-3 flex-shrink-0">
                    <Award className="w-6 h-6 text-neo-yellow" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-display font-black text-neo-black mb-2">
                      {cert.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <GraduationCap className="w-4 h-4 text-neo-black" />
                      <span className="font-mono text-sm">
                        {cert.institution}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex gap-2">
                        <span className="font-mono text-xs uppercase tracking-wider bg-white border-2 border-neo-black px-2 py-1">
                          {cert.platform}
                        </span>
                        <span className="font-mono text-xs uppercase tracking-wider bg-neo-black text-white px-2 py-1">
                          {cert.date}
                        </span>
                      </div>
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 font-mono text-xs font-bold uppercase tracking-wider hover:underline"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default Certificates;
