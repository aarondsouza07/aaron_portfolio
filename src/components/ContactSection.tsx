import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  GithubLogo,
  LinkedinLogo,
  TwitterLogo,
  PaperPlaneTilt,
} from '@phosphor-icons/react';
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

  /* ✅ Initialize EmailJS once */
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  useEffect(() => {
    const inputs = gsap.utils.toArray('.contact-input') as HTMLElement[];
    const socialIcons = gsap.utils.toArray('.social-icon') as HTMLElement[];

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
        },
      }
    );

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
        },
      }
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);

    gsap.to('.submit-btn', {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });

    try {
      const result = await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: EMAILJS_PUBLIC_KEY } // ✅ FIXED
      );

      console.log('EmailJS success:', result.text);

      toast({
        title: 'Message sent!',
        description: "Thanks for reaching out. I'll get back to you soon.",
      });

      formRef.current.reset();
    } catch (error: any) {
      console.error('EmailJS error:', error);

      toast({
        title: 'Failed to send message',
        description:
          'Something went wrong. Please try again or email me directly.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="relative py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="glass-card p-8">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* ✅ MATCH EMAILJS TEMPLATE VARIABLES */}
              <div className="contact-input">
                <label className="block text-sm mb-2">Your Name</label>
                <input
                  type="text"
                  name="from_name"
                  required
                  className="glass-input"
                />
              </div>

              <div className="contact-input">
                <label className="block text-sm mb-2">Your Email</label>
                <input
                  type="email"
                  name="from_email"
                  required
                  className="glass-input"
                />
              </div>

              <div className="contact-input">
                <label className="block text-sm mb-2">Message</label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="glass-input resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-btn glow-button w-full flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Sending...' : (
                  <>
                    Send Message
                    <PaperPlaneTilt size={20} weight="bold" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Side (unchanged UI) */}
          {/* Keep your existing content here */}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

  );
};

export default ContactSection;
