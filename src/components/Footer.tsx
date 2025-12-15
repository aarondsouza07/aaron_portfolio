import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Footer fade in
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 60, filter: 'blur(10px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Floating particles
    const particles = particlesRef.current?.querySelectorAll('.particle');
    particles?.forEach((particle, i) => {
      gsap.to(particle, {
        y: -30 - Math.random() * 20,
        x: (Math.random() - 0.5) * 20,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: i * 0.2,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <footer ref={footerRef} className="relative py-12 border-t border-border/30">
      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 rounded-full bg-primary/40"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a href="#home" className="text-2xl font-bold tracking-tight">
            <span className="text-foreground">Aaron</span>
            <span className="text-primary glow-text">.</span>
          </a>

          {/* Nav Links */}
          <nav className="flex items-center gap-6">
            <a href="#home" className="nav-link text-sm">
              Home
            </a>
            <a href="#about" className="nav-link text-sm">
              About
            </a>
            <a href="#projects" className="nav-link text-sm">
              Projects
            </a>
            <a href="#contact" className="nav-link text-sm">
              Contact
            </a>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart size={16} weight="fill" className="text-primary" /> by Aaron
          </p>
        </div>

        <div className="mt-8 pt-8 border-t border-border/20 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Aaron. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
