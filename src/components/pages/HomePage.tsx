// HPI 1.7-G
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ExternalLink, Award, Briefcase, Code2, GraduationCap, ArrowRight, Sparkles, Layers, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { Experience, Projects, Skills, Achievements } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProfessionalJourney from '@/components/ProfessionalJourney';
import * as THREE from 'three';

// --- 3D Canvas Component ---

const ThreeDPortfolio = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cubesRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x1a1a1a);

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xFF8C00, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Create rotating cubes
    const cubes: THREE.Mesh[] = [];
    const positions = [
      { x: -2, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 2, y: 0, z: 0 }
    ];

    positions.forEach((pos, idx) => {
      const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
      const material = new THREE.MeshPhongMaterial({
        color: idx === 1 ? 0xFF8C00 : 0x333333,
        emissive: idx === 1 ? 0xFF8C00 : 0x000000,
        shininess: 100
      });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(pos.x, pos.y, pos.z);
      cube.userData.rotationSpeed = 0.01 + Math.random() * 0.01;
      scene.add(cube);
      cubes.push(cube);
    });
    cubesRef.current = cubes;

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      cubes.forEach((cube) => {
        cube.rotation.x += cube.userData.rotationSpeed;
        cube.rotation.y += cube.userData.rotationSpeed;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
};

// --- Utility Components ---

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

// --- Main Page Component ---

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
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const skillsByCategory = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skills[]>);

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
      
      {/* --- HERO SECTION --- */}
      <section id="hero" className="relative min-h-screen w-full flex items-center justify-center pt-20 overflow-hidden">
        <div className="noise-bg" />
        
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-6 lg:px-12 max-w-[120rem] relative z-10">
          <div className="flex items-center justify-center min-h-[80vh]">
            
            {/* Center Content */}
            <div className="space-y-10 relative z-20 max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6 text-center"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-primary/20">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium tracking-wide text-foreground/80 uppercase">Available for new opportunities</span>
                </div>
                
                <h1 className="font-heading text-6xl sm:text-7xl lg:text-8xl xl:text-[7rem] font-bold leading-[1.1] tracking-tight">
                  <span className="block text-gradient">Sriyamini</span>
                  <span className="block text-gradient-primary">Reddy.</span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-foreground/70 font-medium leading-relaxed">
                  Web Developer <span className="text-primary mx-2">•</span> Founder <span className="text-primary mx-2">•</span> Creative Builder
                </p>
                
                <p className="text-base lg:text-lg text-foreground/50 max-w-2xl mx-auto leading-relaxed">
                  Crafting elegant digital experiences with a unique perspective. 
                  Merging technical precision with creative vision to build the future.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-center justify-center gap-6"
              >
                <MagneticButton onClick={scrollToProjects} className="bg-primary text-primary-foreground px-8 py-6 text-lg rounded-xl shadow-[0_0_40px_-10px_rgba(255,140,0,0.5)]">
                  Explore Work <ArrowRight className="w-5 h-5 ml-2" />
                </MagneticButton>
                
                <MagneticButton onClick={handleDownloadResume} variant="outline" className="border-foreground/20 text-foreground hover:bg-foreground/5 px-8 py-6 text-lg rounded-xl glass-panel">
                  <Download className="w-5 h-5 mr-2" /> Resume
                </MagneticButton>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="flex items-center justify-center gap-6 pt-8 border-t border-foreground/10"
              >
                <a href="https://github.com/sriyamini" target="_blank" rel="noopener noreferrer" className="text-foreground/50 hover:text-primary transition-colors duration-300 p-2 hover:bg-primary/10 rounded-full">
                  <Github className="w-6 h-6" />
                </a>
                <a href="https://linkedin.com/in/sriyamini-reddy" target="_blank" rel="noopener noreferrer" className="text-foreground/50 hover:text-primary transition-colors duration-300 p-2 hover:bg-primary/10 rounded-full">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="mailto:sriyamini@example.com" className="text-foreground/50 hover:text-primary transition-colors duration-300 p-2 hover:bg-primary/10 rounded-full">
                  <Mail className="w-6 h-6" />
                </a>
              </motion.div>
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
                  I'm Sriyamini Reddy, a 3rd-year Computer Science student passionate about building elegant digital experiences that make a tangible difference.
                </p>
                <p className="text-xl leading-relaxed text-foreground/60">
                  I approach problems with a unique perspective, merging technical rigor with creative thinking. My short-term goal is to excel as a Software Developer, mastering the craft of code. My long-term vision is entrepreneurship—creating innovative solutions that impact lives on a larger scale.
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

      {/* --- 3D PORTFOLIO SECTION --- */}
      <section id="3d-portfolio" className="py-32 bg-deep-charcoal relative border-t border-white/5">
        <div className="container mx-auto px-6 lg:px-12 max-w-[120rem]">
          <SectionHeading title="3D Portfolio" subtitle="Interactive visualization of my creative workspace." />
          
          <div className="relative h-[500px] rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl shadow-black/50">
            <ThreeDPortfolio />
          </div>
        </div>
      </section>

      {/* --- SKILLS SECTION (2.5D Floating Grid) --- */}
      <section id="skills" className="py-32 bg-background relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
        
        <div className="container mx-auto px-6 lg:px-12 max-w-[120rem] relative z-10">
          <SectionHeading title="Skills" subtitle="A curated stack of technologies I use to bring ideas to life." />

          <div className="min-h-[400px]">
            {isLoading ? (
              <div className="w-full h-64 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : skills.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-12">
                {Object.entries(skillsByCategory).map(([category, categorySkills], categoryIndex) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                      <Cpu className="w-5 h-5 text-primary" />
                      <h3 className="font-heading text-2xl font-bold text-foreground tracking-wide">
                        {category}
                      </h3>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                      {categorySkills.map((skill, index) => (
                        <motion.div
                          key={skill._id}
                          whileHover={{ x: 10, scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
                          className="glass-panel p-4 rounded-xl flex items-center gap-4 cursor-default transition-all duration-300 border border-white/5 hover:border-primary/30"
                        >
                          {skill.icon ? (
                            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center p-2 shrink-0">
                              <Image 
                                src={skill.icon} 
                                alt={skill.skillName || 'Skill icon'} 
                                width={24}
                                className="w-full h-full object-contain"
                              />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                              <Code2 className="w-5 h-5 text-foreground/40" />
                            </div>
                          )}
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-foreground truncate">
                              {skill.skillName}
                            </h4>
                            {skill.proficiencyLevel && (
                              <p className="text-xs text-foreground/50 uppercase tracking-wider mt-1">{skill.proficiencyLevel}</p>
                            )}
                          </div>
                          
                          {skill.isCoreSkill && (
                            <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(255,140,0,0.8)] shrink-0" />
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-foreground/50">No skills data available</div>
            )}
          </div>
        </div>
      </section>

      {/* --- PROFESSIONAL JOURNEY SECTION --- */}
      <ProfessionalJourney />

      {/* --- EXPERIENCE SECTION (Scroll Timeline) --- */}
      <section id="experience" className="py-32 bg-deep-charcoal relative">
        <div className="container mx-auto px-6 lg:px-12 max-w-[80rem]">
          <SectionHeading title="Work Experience" subtitle="Roles and responsibilities that shaped my expertise." />

          <div className="relative min-h-[400px]">
            {isLoading ? (
               <div className="w-full h-64 flex items-center justify-center">
                 <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
               </div>
            ) : experience.length > 0 ? (
              <div className="relative">
                {/* Central Line */}
                <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 transform md:-translate-x-1/2" />
                
                <div className="space-y-16 md:space-y-24">
                  {experience.map((exp, index) => {
                    const isEven = index % 2 === 0;
                    return (
                      <motion.div
                        key={exp._id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0 ${isEven ? 'md:flex-row-reverse' : ''}`}
                      >
                        {/* Timeline Node */}
                        <div className="absolute left-[-5px] md:left-1/2 top-8 md:top-1/2 w-3 h-3 rounded-full bg-primary transform md:-translate-x-1/2 md:-translate-y-1/2 shadow-[0_0_15px_rgba(255,140,0,0.8)] z-10" />
                        
                        {/* Content */}
                        <div className={`w-full md:w-1/2 pl-8 md:pl-0 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                          <div className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors group">
                            <div className={`flex items-center gap-4 mb-4 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                              {exp.companyLogo && (
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 p-2">
                                  <Image 
                                    src={exp.companyLogo} 
                                    alt={exp.companyName || 'Company logo'} 
                                    width={48}
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                              )}
                              <div>
                                <h3 className="font-heading text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                                  {exp.roleTitle}
                                </h3>
                                <p className="text-primary font-medium">{exp.companyName}</p>
                              </div>
                            </div>
                            
                            <div className={`flex flex-wrap items-center gap-3 text-sm text-foreground/50 mb-4 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
                              <span className="px-3 py-1 rounded-full bg-white/5">{exp.timeline}</span>
                              {exp.location && <span>• {exp.location}</span>}
                            </div>
                            
                            <p className="text-foreground/70 leading-relaxed mb-6">
                              {exp.description}
                            </p>
                            
                            {exp.companyWebsite && (
                              <a 
                                href={exp.companyWebsite} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={`inline-flex items-center gap-2 text-sm font-bold text-foreground hover:text-primary transition-colors ${isEven ? 'md:justify-end w-full' : ''}`}
                              >
                                Visit Website <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-foreground/50">No experience data available</div>
            )}
          </div>
        </div>
      </section>

      {/* --- PROJECTS SECTION (Sticky Stacking Cards) --- */}
      <section id="projects" className="py-32 bg-background relative">
        <div className="container mx-auto px-6 lg:px-12 max-w-[100rem]">
          <SectionHeading title="Featured Work" subtitle="A selection of projects that showcase my technical and creative capabilities." />

          <div className="min-h-[600px]">
            {isLoading ? (
               <div className="w-full h-64 flex items-center justify-center">
                 <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
               </div>
            ) : projects.length > 0 ? (
              <div className="flex flex-col gap-12 md:gap-24 pb-24">
                {projects.map((project, index) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="sticky"
                    style={{ top: `calc(10vh + ${index * 2}rem)` }}
                  >
                    <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl shadow-black/50 group">
                      <div className="grid lg:grid-cols-2 h-full">
                        
                        {/* Project Info */}
                        <div className="p-8 md:p-12 flex flex-col justify-center h-full bg-deep-charcoal/80">
                          <div className="flex items-center justify-between mb-6">
                            {project.role && (
                              <span className="text-primary font-mono text-sm tracking-wider uppercase">{project.role}</span>
                            )}
                            {project.status && (
                              <Badge variant="outline" className="border-white/20 text-foreground/70 bg-white/5">
                                {project.status}
                              </Badge>
                            )}
                          </div>
                          
                          <h3 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6 group-hover:text-primary transition-colors duration-500">
                            {project.projectTitle}
                          </h3>
                          
                          <p className="text-lg text-foreground/70 leading-relaxed mb-8">
                            {project.description}
                          </p>
                          
                          {project.techStack && (
                            <div className="flex flex-wrap gap-2 mb-10">
                              {project.techStack.split(',').map((tech, i) => (
                                <span key={i} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-foreground/80 font-medium">
                                  {tech.trim()}
                                </span>
                              ))}
                            </div>
                          )}
                          
                          {project.projectUrl && (
                            <div className="mt-auto pt-6 border-t border-white/10">
                              <a 
                                href={project.projectUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 text-lg font-bold text-foreground hover:text-primary transition-colors group/link"
                              >
                                View Live Project 
                                <span className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover/link:bg-primary/20 transition-colors">
                                  <ArrowRight className="w-5 h-5 group-hover/link:-rotate-45 transition-transform duration-300" />
                                </span>
                              </a>
                            </div>
                          )}
                        </div>
                        
                        {/* Project Image */}
                        <div className="relative h-[40vh] lg:h-auto overflow-hidden bg-black">
                          {project.previewImage ? (
                            <Image 
                              src={project.previewImage} 
                              alt={project.projectTitle || 'Project preview'} 
                              width={1200}
                              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-white/5">
                              <Code2 className="w-24 h-24 text-white/10" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-r from-deep-charcoal/80 to-transparent lg:hidden" />
                        </div>
                        
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-foreground/50">No projects data available</div>
            )}
          </div>
        </div>
      </section>

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
              <MagneticButton onClick={() => window.location.href = 'mailto:sriyamini@example.com'} className="w-full sm:w-auto bg-primary text-primary-foreground px-10 py-8 text-xl rounded-2xl shadow-[0_0_40px_-10px_rgba(255,140,0,0.5)]">
                <Mail className="w-6 h-6 mr-3" /> Get in Touch
              </MagneticButton>
              
              <div className="flex items-center gap-4">
                <a href="https://github.com/sriyamini" target="_blank" rel="noopener noreferrer" className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all duration-300 group">
                  <Github className="w-8 h-8 text-foreground group-hover:text-primary transition-colors" />
                </a>
                <a href="https://linkedin.com/in/sriyamini-reddy" target="_blank" rel="noopener noreferrer" className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all duration-300 group">
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