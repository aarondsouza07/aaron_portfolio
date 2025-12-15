import { useState, useEffect } from 'react';
import { List, X } from '@phosphor-icons/react';
import gsap from 'gsap';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.to('.mobile-menu', {
        x: 0,
        duration: 0.5,
        ease: 'power3.out',
      });
      gsap.fromTo(
        '.mobile-nav-item',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, delay: 0.2, duration: 0.4 }
      );
    } else {
      gsap.to('.mobile-menu', {
        x: '100%',
        duration: 0.4,
        ease: 'power3.in',
      });
    }
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-border/50'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#home" className="text-2xl font-bold tracking-tight">
              <span className="text-foreground">Aaron</span>
              <span className="text-primary glow-text">.</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="nav-link"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => handleNavClick('#contact')}
              className="hidden md:block glow-button text-sm"
            >
              Hire Me
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-foreground p-2"
            >
              {isOpen ? <X size={28} weight="light" /> : <List size={28} weight="light" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className="mobile-menu md:hidden">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => handleNavClick(item.href)}
            className="mobile-nav-item text-3xl font-light text-foreground hover:text-primary transition-colors"
          >
            {item.label}
          </button>
        ))}
        <button
          onClick={() => handleNavClick('#contact')}
          className="mobile-nav-item glow-button mt-8"
        >
          Hire Me
        </button>
      </div>
    </>
  );
};

export default Navigation;
