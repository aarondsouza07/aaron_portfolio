import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FileHtml,
  FileCss,
  FileJs,
  Atom,
  Sparkle,
} from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const PROFILE_IMAGE = 'https://i.postimg.cc/Bvx3nNgH/HEIF-Image.avif';

const skills = [
  { icon: FileHtml, label: 'HTML5', color: '#E34F26' },
  { icon: FileCss, label: 'CSS3', color: '#1572B6' },
  { icon: FileJs, label: 'JavaScript', color: '#F7DF1E' },
  { icon: Atom, label: 'React', color: '#61DAFB' },
  { icon: Sparkle, label: 'GSAP', color: '#88CE02' },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;

    // Section fade in
    gsap.fromTo(
      section,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
        },
      }
    );

    // Image animation
    gsap.fromTo(
      image,
      { opacity: 0, x: -80, filter: 'blur(10px)' },
      {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Content animation
    gsap.fromTo(
      content,
      { opacity: 0, x: 80 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Skills stagger animation
    gsap.fromTo(
      '.skill-item',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-24 md:py-32">
      {/* Background orbs */}
      <div className="floating-orb w-64 h-64 top-20 right-0 opacity-20" />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="flex justify-center lg:justify-start">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl scale-110" />

              {/* Image container */}
              <div className="glow-ring">
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-background">
                  <img
                    src={PROFILE_IMAGE}
                    alt="Aaron - Web Developer"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 border-2 border-primary rounded-full animate-pulse" />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-primary rounded-full animate-bounce" />
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef}>
            <span className="section-label mb-6">About Me</span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Passionate about creating{' '}
              <span className="text-primary glow-text">digital experiences</span>
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              I'm a creative web developer with a passion for building beautiful,
              functional, and user-centered digital experiences. With expertise in
              modern frameworks, 3D animations, and interactive design, I transform
              ideas into immersive web applications that captivate and engage.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-8">
              My approach combines technical excellence with creative vision,
              ensuring every project delivers both exceptional performance and
              stunning aesthetics. Whether it's a dynamic landing page or a complex
              web application, I bring dedication and innovation to every line of
              code.
            </p>

            {/* Skills Grid */}
            <div className="skills-grid grid grid-cols-3 md:grid-cols-6 gap-4">
              {skills.map(({ icon: Icon, label, color }) => (
                <div
                  key={label}
                  className="skill-item skill-icon group flex flex-col items-center gap-2"
                >
                  <Icon size={24} weight="light" style={{ color }} />
                  <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
