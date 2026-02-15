import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: 'Tech Lead',
    company: 'Orang Utan Organics',
    period: 'June 2025 - Present',
    location: 'Uttarakhand, India',
    description: [
      'Created a seamless shopping experience via WhatsApp using the Meta API, integrating Razorpay for payment processing and Delhivery for logistics and shipment management.',
      'Designed and developed a fully functional e-commerce platform utilising React.js and Node.js, enabling smooth customer interactions and scalable business operations.',
      'Built custom automation tools to deliver personalised WhatsApp marketing messages, significantly improving customer engagement and retention rates.',
    ],
    color: 'neo-card-green',
  },
  {
    title: 'Web Developer',
    company: 'Freelancer',
    period: 'December 2024 - Present',
    location: 'Remote, India',
    description: [
      'Developed and maintained client websites, ensuring functionality, responsiveness, and an optimal user experience.',
      'Developed responsive websites using HTML, CSS, and JavaScript, ensuring compatibility across various devices and browsers.',
      'Collaborated with clients to determine project requirements, scope, and design preferences.',
    ],
    color: 'neo-card-pink',
  },
];

const Experience = () => {
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
          { x: index % 2 === 0 ? -80 : 80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
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
      'neo-card-green': 'bg-neo-green border-4 border-neo-black shadow-neo',
      'neo-card-pink': 'bg-neo-pink border-4 border-neo-black shadow-neo',
    };
    return classes[color] || classes['neo-card-green'];
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full py-24 bg-neo-black"
    >
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <div className="mb-16">
            <span className="font-mono text-sm text-neo-black uppercase tracking-widest bg-neo-yellow border-4 border-neo-yellow px-4 py-2 inline-block mb-4">
              EXPERIENCE
            </span>
            <h2
              ref={headingRef}
              className="text-5xl md:text-7xl font-display font-black text-white tracking-tighter"
            >
              WHERE I'VE WORKED
            </h2>
          </div>

          {/* Experience Cards */}
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={exp.company}
                ref={(el) => { cardsRef.current[index] = el; }}
                className={`${getCardClass(exp.color)} p-8`}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-display font-black text-neo-black mb-2">
                      {exp.title}
                    </h3>
                    <div className="flex items-center gap-2 text-neo-black">
                      <Briefcase className="w-5 h-5" />
                      <span className="font-mono font-bold text-lg">
                        {exp.company}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-neo-black font-mono text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2 text-neo-black font-mono text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-3">
                  {exp.description.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-neo-black"
                    >
                      <span className="w-2 h-2 bg-neo-black mt-2 flex-shrink-0" />
                      <span className="font-body text-sm leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 hidden lg:block">
        <div className="w-24 h-24 border-4 border-neo-yellow bg-transparent rotate-12" />
      </div>
    </section>
  );
};

export default Experience;
