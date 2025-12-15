import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const splineWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: 50, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.4'
      )
      .fromTo(
        splineWrapperRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' },
        '-=0.8'
      );

    gsap.to('.hero-orb', {
      y: -15,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.5,
    });

    return () => tl.kill();
  }, []);

  /* Cursor-follow parallax for desktop only */
  useEffect(() => {
    if (!splineWrapperRef.current || 'ontouchstart' in window) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 8;
      const y = (e.clientY / window.innerHeight - 0.5) * 6;

      gsap.to(splineWrapperRef.current, {
        rotateY: x,
        rotateX: -y,
        duration: 0.6,
        ease: 'power3.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Spline Hero (Load First) */}
      <div
        ref={splineWrapperRef}
        className="absolute inset-0 z-0 transition-all duration-500 will-change-transform hover:drop-shadow-[0_0_40px_rgba(0,200,255,0.35)]"
      >
        <iframe
          src="https://my.spline.design/orb-341cPqAuFeX3n65vnv8LlSOB/"
          title="3D Spline Animation"
          frameBorder="0"
          width="100%"
          height="100%"
          loading="eager"
          fetchPriority="high"
          style={{
            pointerEvents: 'auto',
            transformStyle: 'preserve-3d',
          }}
        />
      </div>

      {/* Floating orbs */}
      <div className="hero-orb floating-orb w-72 h-72 top-20 -left-20 opacity-40 z-10" />
      <div className="hero-orb floating-orb w-96 h-96 bottom-20 -right-32 opacity-30 z-10" />
      <div className="hero-orb floating-orb w-48 h-48 top-1/3 left-1/4 opacity-20 z-10" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-5 z-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm text-primary">Available for work</span>
        </div>

        <h1
          ref={headlineRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-4"
        >
          Hi, I'm <span className="text-primary glow-text">Aaron</span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-2xl md:text-3xl lg:text-4xl font-semibold text-muted-foreground mb-8"
        >
          Web Developer
        </p>

        <p className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto mb-10">
          Crafting immersive digital experiences with cutting-edge technologies.
          Specializing in modern web development, 3D animations, and interactive interfaces.
        </p>

        <button
          ref={ctaRef}
          onClick={scrollToContact}
          className="glow-button text-lg px-8 py-4"
        >
          Hire Me
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
        <span className="text-xs text-muted-foreground tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1 h-3 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
