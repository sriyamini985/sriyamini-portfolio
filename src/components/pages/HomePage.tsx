import ExperienceSection from '@/components/ExperienceSection';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ProfessionalJourney from '@/components/ProfessionalJourney';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Achievements, Experience, Projects, Skills } from '@/entities';
import { BaseCrudService } from '@/integrations';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Award, Briefcase, Code2, Download, ExternalLink, Github, GraduationCap, Layers, Linkedin, Mail, Sparkles } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

// ... keep existing code (PremiumProfileImage, MagneticButton, SectionHeading components) ...

const PremiumProfileImage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const x = e.clientX - centerX;
      const y = e.clientY - centerY;

      mouseX.set(x);
      mouseY.set(y);
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative h-[350px] lg:h-[420px] flex items-center justify-center perspective"
      style={{ perspective: '1200px' }}
    >
      {/* Ambient Glow Background */}
      <motion.div
        animate={{
          scale: isHovering ? 1.1 : 1,
          opacity: isHovering ? 0.8 : 0.6,
        }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 bg-gradient-radial from-burnt-orange/30 via-burnt-orange/10 to-transparent rounded-full blur-[80px] pointer-events-none"
      />

      {/* Floating Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-burnt-orange rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 10 - 5, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}

      {/* Main Image Container */}
      <motion.div
        ref={imageRef}
        style={{
          rotateX,
          rotateY,
          z: 100,
        }}
        animate={{
          y: isHovering ? -8 : 0,
        }}
        transition={{ duration: 0.4, type: 'spring', stiffness: 200, damping: 20 }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Circular Gradient Ring */}
        <motion.div
          animate={{
            boxShadow: isHovering
              ? '0 0 60px rgba(230, 126, 34, 0.6), inset 0 0 60px rgba(230, 126, 34, 0.2)'
              : '0 0 40px rgba(230, 126, 34, 0.3), inset 0 0 40px rgba(230, 126, 34, 0.1)',
          }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 rounded-3xl border-2 border-burnt-orange/40 pointer-events-none"
        />

        {/* Depth Shadow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-transparent via-transparent to-black/20 pointer-events-none" />

        {/* Profile Image */}
        <motion.div
          animate={{
            scale: isHovering ? 1.02 : 1,
          }}
          transition={{ duration: 0.3 }}
          className="relative w-full h-full rounded-3xl overflow-hidden"
        >
          <Image
            src="https://static.wixstatic.com/media/9dc27f_554a1345a1cb45c5b753360b0c753e9c~mv2.png"
            alt="Sriyamini Reddy - Professional Developer and Founder"
            width={400}
            className="w-full h-full object-cover"
          />

          {/* Soft Glow Animation Overlay */}
          <motion.div
            animate={{
              opacity: isHovering ? 0.4 : 0.2,
            }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-gradient-to-t from-burnt-orange/20 via-transparent to-transparent pointer-events-none"
          />
        </motion.div>

        {/* Orange Highlight Accent */}
        <motion.div
          animate={{
            opacity: isHovering ? 0.6 : 0.3,
            scale: isHovering ? 1.1 : 1,
          }}
          transition={{ duration: 0.4 }}
          className="absolute -top-20 -right-20 w-40 h-40 bg-burnt-orange/20 rounded-full blur-3xl pointer-events-none"
        />
      </motion.div>

      {/* Floating Motion Indicator */}
      <motion.div
        animate={{
          y: [0, 4, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-foreground/40 font-medium tracking-widest uppercase pointer-events-none"
      >
        Move mouse to explore
      </motion.div>
    </motion.div>
  );
};

const MagneticButton = ({ children, className, onClick, variant = 'default' }: { children: React.ReactNode; className?: string; onClick?: () => void; variant?: 'default' | 'outline' }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      <Button
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        onClick={onClick}
        variant={variant}
        className={`relative overflow-hidden group ${className}`}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        {variant === 'default' && (
          <div className="absolute inset-0 bg-gradient-to-r from-burnt-orange to-amber opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        )}
      </Button>
    </motion.div>
  );
};

const SectionHeading = ({ title, subtitle, align = 'center' }: { title: string; subtitle: string; align?: 'left' | 'center' }) => (
  <div className={`mb-16 md:mb-24 ${align === 'center' ? 'text-center' : 'text-left'}`}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight mb-4">
        {title.split(' ').map((word, i, arr) => (
          <span key={i} className={i === arr.length - 1 ? 'text-primary' : ''}>
            {word}{i !== arr.length - 1 ? ' ' : ''}
          </span>
        ))}
      </h2>
      <p className="text-lg md:text-xl text-foreground/60 font-paragraph max-w-2xl mx-auto">
        {subtitle}
      </p>
    </motion.div>
  </div>
);

export default function HomePage() {
  const [experience, setExperience] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Projects[]>([]);
  const [skills, setSkills] = useState<Skills[]>([]);
  const [achievements, setAchievements] = useState<Achievements[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    async function loadData() {
      try {
        const [expData, projData, skillsData, achievData] = await Promise.all([
          BaseCrudService.getAll<Experience>('experience'),
          BaseCrudService.getAll<Projects>('projects'),
          BaseCrudService.getAll<Skills>('skills'),
          BaseCrudService.getAll<Achievements>('achievements')
        ]);

        setExperience(expData.items);
        setProjects(projData.items);
        setSkills(skillsData.items);
        setAchievements(achievData.items);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  const handleDownloadResume = () => {
    window.open('/resume.pdf', '_blank');
  };

  const scrollToProjects = () => {
    document.getElementById('projects-redesigned')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground font-paragraph selection:bg-primary/30 selection:text-primary-foreground overflow-clip">
      <style>{`
        .glass-panel {
          background: rgba(18, 18, 18, 0.6);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .text-gradient {
          background: linear-gradient(to right, #F8F8F8, #E0E0E0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .text-gradient-primary {
          background: linear-gradient(to right, #FF8C00, #E67E22);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .noise-bg {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.03;
          pointer-events: none;
          z-index: 1;
        }
      `}</style>

      <Header />

      {/* --- HERO SECTION (Split 50/50 Layout) --- */}
      <section id="hero" className="relative min-h-screen w-full flex items-center justify-center pt-20 overflow-hidden">
        <div className="noise-bg" />

        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-12 max-w-[120rem] relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">

            {/* LEFT SIDE: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8 relative z-20"
            >
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-primary/20">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium tracking-wide text-foreground/80 uppercase">Available for opportunities</span>
                </div>

                <div>
                  <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-4">
                    <span className="block text-gradient">Sriyamini</span>
                    <span className="block text-gradient-primary">Reddy</span>
                  </h1>
                  <p className="text-xl lg:text-2xl text-foreground/70 font-medium">
                    Web Developer <span className="text-primary mx-2">•</span> Founder <span className="text-primary mx-2">•</span> Creative Builder
                  </p>
                </div>

                <p className="text-base lg:text-lg text-foreground/60 leading-relaxed max-w-xl">
                  Computer Science student passionate about building digital experiences, startup ideas, and impactful web solutions.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <MagneticButton onClick={scrollToProjects} className="bg-primary text-primary-foreground px-8 py-4 text-base rounded-xl shadow-[0_0_40px_-10px_rgba(255,140,0,0.5)]">
                  View Projects <ArrowRight className="w-4 h-4 ml-2" />
                </MagneticButton>

                <MagneticButton onClick={handleDownloadResume} variant="outline" className="border-foreground/20 text-foreground hover:bg-foreground/5 px-8 py-4 text-base rounded-xl glass-panel">
                  <Download className="w-4 h-4 mr-2" /> Download Resume
                </MagneticButton>
              </motion.div>
            </motion.div>

            {/* RIGHT SIDE: Premium Profile Image - Reduced Size */}
            <div className="hidden lg:flex lg:justify-center">
              <div className="w-full max-w-md">
                <PremiumProfileImage />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        >
          <span className="text-xs uppercase tracking-widest text-foreground/40 font-medium">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent"
          />
        </motion.div>
      </section>

      {/* --- ABOUT SECTION (Split Layout) --- */}
      <section id="about" className="py-32 bg-deep-charcoal relative border-t border-white/5">
        <div className="container mx-auto px-6 lg:px-12 max-w-[120rem]">
          <div className="grid lg:grid-cols-12 gap-16 items-start">

            {/* Sticky Left */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-8">
              <SectionHeading title="About Me" subtitle="A creative builder with a different perspective." align="left" />

              <div className="glass-panel p-8 rounded-2xl border-l-4 border-l-primary relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-150" />
                <GraduationCap className="w-10 h-10 text-primary mb-6" />
                <h4 className="font-heading text-2xl font-bold text-foreground mb-2">Education</h4>
                <p className="text-lg text-foreground/80 font-medium">B.Tech Computer Science</p>
                <p className="text-foreground/60 mb-4">Sri Venkateswara College of Engineering</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="px-3 py-1 rounded-full bg-white/5 text-foreground/70">2023 - 2027</span>
                  <span className="px-3 py-1 rounded-full bg-primary/20 text-primary font-semibold">CGPA: 9.15</span>
                </div>
              </div>
            </div>

            {/* Scrolling Right */}
            <div className="lg:col-span-7 space-y-12">
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-2xl leading-relaxed text-foreground/90 font-medium">
                  I'm Sriyamini Reddy, a Computer Science Engineering student who recently completed 3rd year.
                </p>
                <p className="text-xl leading-relaxed text-foreground/60">
                  I enjoy creating new things, exploring ideas, and approaching problems from different perspectives. My interests lie in web development, technology, creativity, and building meaningful digital experiences.
                </p>
                <p className="text-xl leading-relaxed text-foreground/60">
                  My short-term goal is to become a Software Developer in a reputed company. My long-term vision is to become an entrepreneur and build impactful ventures.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 pt-8 border-t border-white/10">
                {[
                  { icon: Code2, title: "Developer", desc: "Architecting robust, scalable web applications with modern stacks." },
                  { icon: Briefcase, title: "Founder", desc: "Leading initiatives and building products from zero to one." },
                  { icon: Award, title: "Achiever", desc: "Recognized in multiple hackathons and technical competitions." },
                  { icon: Layers, title: "Creative", desc: "Designing intuitive, user-centric interfaces and experiences." }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group"
                  >
                    <item.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                    <h4 className="text-xl font-bold text-foreground mb-2">{item.title}</h4>
                    <p className="text-foreground/60 text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SKILLS SECTION (Premium Bento Grid) --- */}
      <SkillsSection />

      {/* --- PROFESSIONAL JOURNEY SECTION --- */}
      <ProfessionalJourney />

      {/* --- EXPERIENCE SECTION (Redesigned) --- */}
      <ExperienceSection />

      {/* --- PROJECTS SECTION (Redesigned) --- */}
      <ProjectsSection />

      {/* --- ACHIEVEMENTS SECTION (3D Tilt Cards) --- */}
      <section id="achievements" className="py-32 bg-deep-charcoal relative border-t border-white/5">
        <div className="container mx-auto px-6 lg:px-12 max-w-[120rem]">
          <SectionHeading title="Recognition" subtitle="Milestones, awards, and certifications." />

          <div className="min-h-[400px]">
            {isLoading ? (
               <div className="w-full h-64 flex items-center justify-center">
                 <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
               </div>
            ) : achievements.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement._id}
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group perspective-[2000px]"
                  >
                    <div className="relative h-full glass-panel rounded-2xl border border-white/10 p-6 transition-all duration-500 transform-style-3d group-hover:rotate-x-[-5deg] group-hover:rotate-y-[5deg] group-hover:border-primary/30 group-hover:shadow-2xl group-hover:shadow-primary/10">

                      <div className="flex items-start justify-between mb-6">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <Award className="w-6 h-6" />
                        </div>
                        {achievement.date && (
                          <span className="text-sm font-mono text-foreground/50 bg-white/5 px-3 py-1 rounded-full">
                            {new Date(achievement.date).getFullYear()}
                          </span>
                        )}
                      </div>

                      <h3 className="font-heading text-2xl font-bold text-foreground mb-2 leading-tight">
                        {achievement.title}
                      </h3>

                      {achievement.issuer && (
                        <p className="text-primary font-medium mb-4">{achievement.issuer}</p>
                      )}

                      <p className="text-foreground/60 text-sm leading-relaxed mb-6 line-clamp-3">
                        {achievement.description}
                      </p>

                      {achievement.verificationUrl && (
                        <div className="mt-auto pt-4 border-t border-white/5">
                          <a
                            href={achievement.verificationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-bold text-foreground hover:text-primary transition-colors"
                          >
                            Verify Credential <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      )}

                      {/* Subtle glow effect on hover */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-foreground/50">No achievements data available</div>
            )}
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION (Massive Footer Style) --- */}
      <section id="contact" className="py-32 lg:py-48 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-12 max-w-[100rem] relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto space-y-12"
          >
            <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight">
              Let's build something <span className="text-primary italic">extraordinary.</span>
            </h2>

            <p className="text-xl md:text-2xl text-foreground/60 font-medium">
              Open to new opportunities, collaborations, and interesting conversations.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
              <MagneticButton onClick={() => window.location.href = 'mailto:sriyamini659@gmail.com'} className="w-full sm:w-auto bg-primary text-primary-foreground px-10 py-8 text-xl rounded-2xl shadow-[0_0_40px_-10px_rgba(255,140,0,0.5)]">
                <Mail className="w-6 h-6 mr-3" /> Get in Touch
              </MagneticButton>

              <div className="flex items-center gap-4">
                <a href="https://github.com/sriyamini985" target="_blank" rel="noopener noreferrer" className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all duration-300 group">
                  <Github className="w-8 h-8 text-foreground group-hover:text-primary transition-colors" />
                </a>
                <a href="https://www.linkedin.com/in/sriyamini-reddy-128ba3298" target="_blank" rel="noopener noreferrer" className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all duration-300 group">
                  <Linkedin className="w-8 h-8 text-foreground group-hover:text-primary transition-colors" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
