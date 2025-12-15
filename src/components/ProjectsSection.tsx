import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, GithubLogo } from '@phosphor-icons/react';
import project1 from '@/assets/project-1.png';
import project2 from '@/assets/project-2.png';
import project3 from '@/assets/project-3.png';
import project4 from '@/assets/project-4.png';
import project5 from '@/assets/project-5.png';
import project6 from '@/assets/project-6.png';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: '3D Interactive Web',
    description: 'A stunning 3D interactive website with Spline integration and smooth animations.',
    image: project1,
    tags: ['React', 'Spline', 'GSAP'],
  },
  {
    id: 2,
    title: 'Gaming UI Design',
    description: 'Next-level gaming UI with 3D elements and immersive user experience.',
    image: project2,
    tags: ['React', 'Three.js', 'Tailwind'],
  },
  {
    id: 3,
    title: '3D Portfolio',
    description: 'Creative developer portfolio with stunning 3D visuals and animations.',
    image: project3,
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    id: 4,
    title: 'Gaming Website',
    description: 'Modern gaming website with vibrant colors and dynamic layouts.',
    image: project4,
    tags: ['React', 'Framer Motion', 'CSS3'],
  },
  {
    id: 5,
    title: 'Animation Tools',
    description: 'Showcase of top web animation tools with interactive demos.',
    image: project5,
    tags: ['GSAP', 'Spline', 'Locomotive'],
  },
  {
    id: 6,
    title: 'Animated Portfolio',
    description: 'Step-by-step animated portfolio with smooth scroll effects.',
    image: project6,
    tags: ['CSS', 'JavaScript', 'GSAP'],
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const cards = gsap.utils.toArray('.project-card') as HTMLElement[];

    // Cards entrance animation
    gsap.fromTo(
      cards,
      { opacity: 0, y: 80, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Horizontal scroll on desktop
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      gsap.to(container, {
        x: () => -(container!.scrollWidth - window.innerWidth + 200),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${container!.scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative py-24 lg:py-0 lg:min-h-screen">
      {/* Background orbs */}
      <div className="floating-orb w-80 h-80 top-40 -left-40 opacity-20" />
      <div className="floating-orb w-64 h-64 bottom-20 right-20 opacity-15" />

      <div className="container mx-auto px-6 lg:pt-32">
        {/* Section Header */}
        <div className="mb-12 lg:mb-16">
          <span className="section-label mb-4">My Work</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Featured <span className="text-primary glow-text">Projects</span>
          </h2>
        </div>

        {/* Projects Container */}
        <div
          ref={containerRef}
          className="flex flex-col lg:flex-row gap-8 lg:gap-10 lg:pr-[200px]"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card flex-shrink-0 w-full lg:w-[400px]"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden rounded-xl mb-6 group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 md:h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Overlay buttons */}
                <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                    <span>View Project</span>
                    <ArrowUpRight size={16} weight="bold" />
                  </button>
                  <button className="p-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors">
                    <GithubLogo size={20} weight="light" />
                  </button>
                </div>
              </div>

              {/* Project Info */}
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium bg-secondary/50 text-muted-foreground rounded-full border border-border/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
