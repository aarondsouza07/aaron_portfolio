import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate logo entrance
    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
      { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' }
    );

    // Animate progress bar
    tl.to(progressRef.current, {
      width: '100%',
      duration: 2,
      ease: 'power2.out',
      onUpdate: function () {
        if (percentRef.current) {
          const progress = Math.round(this.progress() * 100);
          percentRef.current.textContent = `${progress}%`;
        }
      },
    });

    // Fade out preloader
    tl.to(preloaderRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => {
        if (preloaderRef.current) {
          preloaderRef.current.style.display = 'none';
        }
        onComplete();
      },
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={preloaderRef} className="preloader">
      {/* Floating orbs background */}
      <div className="floating-orb w-64 h-64 -top-32 -left-32 opacity-30" />
      <div className="floating-orb w-96 h-96 -bottom-48 -right-48 opacity-20" />

      <div ref={logoRef} className="flex flex-col items-center">
        {/* Logo */}
        <div className="relative mb-4">
          <span className="text-6xl md:text-8xl font-bold tracking-tighter">
            <span className="text-foreground">Aaron</span>
            <span className="text-primary glow-text">.</span>
          </span>
        </div>

        <p className="text-muted-foreground text-sm tracking-widest uppercase mb-8">
          Web Developer
        </p>

        {/* Progress bar */}
        <div className="progress-bar-container">
          <div ref={progressRef} className="progress-bar" />
        </div>

        <span ref={percentRef} className="text-primary mt-4 font-mono text-sm">
          0%
        </span>
      </div>
    </div>
  );
};

export default Preloader;
