import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail, ArrowUpRight, Download, FileText } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const content = contentRef.current;

    if (!section || !heading || !content) return;

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

      gsap.fromTo(content,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.2,
          ease: 'power2.out',
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

  const socialLinks = [
    { icon: Github, href: 'https://github.com/logee48', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/logee48', label: 'LinkedIn' },
  ];

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/src/resume.pdf';
    link.download = 'Logesh_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <footer
      ref={sectionRef}
      id="contact"
      className="relative w-full py-24 bg-neo-black"
    >
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Main CTA */}
          <div className="text-center mb-16">
            <h2
              ref={headingRef}
              className="text-5xl md:text-8xl font-display font-black text-white tracking-tighter mb-8"
            >
              LET'S WORK
              <br />
              <span className="text-neo-yellow">TOGETHER</span>
            </h2>
          </div>

          {/* Contact & Socials */}
          <div
            ref={contentRef}
            className="flex flex-col items-center gap-8"
          >
            {/* Email */}
            <a
              href="mailto:logeshwaran.elumalai@outlook.com"
              className="group flex items-center gap-4 bg-neo-yellow border-4 border-neo-yellow px-6 md:px-8 py-4 hover:bg-white hover:border-white transition-all duration-200"
            >
              <Mail className="w-6 h-6 text-neo-black" />
              <span className="font-mono text-lg md:text-2xl font-bold text-neo-black uppercase tracking-wider">
                LOGESHWARAN.ELUMALAI@OUTLOOK.COM
              </span>
              <ArrowUpRight className="w-6 h-6 text-neo-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>

            {/* Download Resume Button */}
            <button
              onClick={handleDownloadResume}
              className="group flex items-center gap-4 bg-white border-4 border-white px-6 md:px-8 py-4 hover:bg-neo-green hover:border-neo-green transition-all duration-200"
            >
              <FileText className="w-6 h-6 text-neo-black" />
              <span className="font-mono text-lg md:text-xl font-bold text-neo-black uppercase tracking-wider">
                Download Resume
              </span>
              <Download className="w-6 h-6 text-neo-black group-hover:translate-y-1 transition-transform" />
            </button>

            {/* Social Links */}
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border-4 border-white p-4 hover:bg-neo-blue hover:border-neo-blue transition-all duration-200 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6 text-neo-black group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="mt-12 pt-8 border-t-2 border-neo-gray w-full text-center">
              <p className="font-mono text-sm text-gray-500">
                © 2025 Logeshwaran Elumalai. ALL RIGHTS RESERVED.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 hidden lg:block pointer-events-none">
        <div className="w-16 h-16 border-4 border-neo-yellow bg-transparent rotate-12" />
      </div>
      <div className="absolute bottom-20 right-20 hidden lg:block pointer-events-none">
        <div className="w-20 h-20 border-4 border-neo-blue bg-transparent -rotate-12" />
      </div>
    </footer>
  );
};

export default Footer;
