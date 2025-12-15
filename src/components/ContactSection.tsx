import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GithubLogo, LinkedinLogo, TwitterLogo, PaperPlaneTilt } from '@phosphor-icons/react';
import { toast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

const EMAILJS_SERVICE_ID = 'service_bhqredh';
const EMAILJS_TEMPLATE_ID = 'template_58rx79g';
const EMAILJS_PUBLIC_KEY = 'sPOHL2VPTnOGIulHe';

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const inputs = gsap.utils.toArray('.contact-input') as HTMLElement[];
    const socialIcons = gsap.utils.toArray('.social-icon') as HTMLElement[];

    // Form inputs animation
    gsap.fromTo(
      inputs,
      { opacity: 0, x: -40 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Social icons animation
    gsap.fromTo(
      socialIcons,
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        stagger: 0.1,
        duration: 0.5,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.social-icons',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    
    setIsSubmitting(true);

    // Animate submit button
    gsap.to('.submit-btn', {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );

      toast({
        title: 'Message sent!',
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      formRef.current.reset();
    } catch (error) {
      console.error('Email error:', error);
      toast({
        title: 'Error sending message',
        description: 'Please try again later or contact me directly via email.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="relative py-24 md:py-32">
      {/* Background orbs */}
      <div className="floating-orb w-72 h-72 top-20 right-20 opacity-20" />
      <div className="floating-orb w-48 h-48 bottom-40 left-10 opacity-15" />

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="section-label mb-4">Get in Touch</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Let's Work <span className="text-primary glow-text">Together</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Have a project in mind or just want to say hello? I'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="glass-card p-8">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="contact-input">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-muted-foreground mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    maxLength={100}
                    className="glass-input"
                    placeholder="John Doe"
                  />
                </div>

                <div className="contact-input">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-muted-foreground mb-2"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    maxLength={255}
                    className="glass-input"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="contact-input">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-muted-foreground mb-2"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    maxLength={1000}
                    rows={5}
                    className="glass-input resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit-btn glow-button w-full flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <PaperPlaneTilt size={20} weight="bold" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-semibold mb-6">
                Let's create something{' '}
                <span className="text-primary">amazing</span>
              </h3>

              <p className="text-muted-foreground leading-relaxed mb-8">
                I'm currently available for freelance work and exciting new
                opportunities. Whether you need a stunning website, a web
                application, or help with your existing project, I'm here to
                help bring your vision to life.
              </p>

              <div className="mb-8">
                <p className="text-sm text-muted-foreground mb-2">Email me at</p>
                <a
                  href="mailto:aarondsouza747@gmail.com"
                  className="text-xl font-medium text-primary hover:underline"
                >
                  aarondsouza747@gmail.com
                </a>
              </div>

              {/* Social Icons */}
              <div className="social-icons">
                <p className="text-sm text-muted-foreground mb-4">
                  Or find me on social media
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/aarondsouza07"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon skill-icon"
                  >
                    <GithubLogo size={24} weight="light" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon skill-icon"
                  >
                    <LinkedinLogo size={24} weight="light" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon skill-icon"
                  >
                    <TwitterLogo size={24} weight="light" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
