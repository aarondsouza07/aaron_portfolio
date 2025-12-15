import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const splineWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const [heroReady, setHeroReady] = useState(false);

  /* -------------------------------
     Cursor-follow (smooth + fast)
  -------------------------------- */
  useEffect(() => {
    if ('ontouchstart' in window) return;

    const onMouseMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 4;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 3;
    };

    const animate = () => {
      mouse.current.x += (target.current.x - mouse.current.x) * 0.08;
      mouse.current.y += (target.current.y - mouse.current.y) * 0.08;

      if (splineWrapperRef.current) {
        splineWrapperRef.current.style.transform = `
          perspective(1000px)
          rotateY(${mouse.current.x}deg)
          rotateX(${-mouse.current.y}deg)
        `;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* -------------------------------
     Hero reveal (after model load)
  -------------------------------- */
  useEffect(() => {
    if (!heroReady || !contentRef.current) return;

    gsap.fromTo(
      contentRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
      }
    );
  }, [heroReady]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen overflow-hidden flex items-center justify-center"
    >
      {/* 3D HERO BACKGROUND */}
      <div
        ref={splineWrapperRef}
        className="absolute inset-0 z-0 will-change-transform transition-[filter] duration-300 hover:drop-shadow-[0_0_35px_rgba(0,200,255,0.35)]"
      >
        <iframe
          src="https://my.spline.design/orb-341cPqAuFeX3n65vnv8LlSOB/"
          title="3D Hero"
          frameBorder="0"
          loading="eager"
          fetchPriority="high"
          width="100%"
          height="100%"
          onLoad={() => setHeroReady(true)} // 🔑 KEY FIX
          style={{
            pointerEvents: 'auto',
            transform: 'translateZ(0)',
          }}
        />
      </div>

      {/* CONTENT (renders AFTER hero is ready) */}
      <div
        ref={contentRef}
        className={`relative z-10 text-center px-6 transition-opacity duration-500 ${
          heroReady ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm text-primary">Available for work</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4">
          Hi, I’m <span className="text-primary glow-text">Aaron</span>
        </h1>

        <p className="text-2xl md:text-3xl text-muted-foreground mb-8">
          Web Developer
        </p>

        <p className="max-w-2xl mx-auto text-lg text-muted-foreground/80 mb-10">
          Crafting immersive digital experiences with modern web technologies
          and interactive 3D interfaces.
        </p>

        <button className="glow-button text-lg px-8 py-4">
          Hire Me
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
