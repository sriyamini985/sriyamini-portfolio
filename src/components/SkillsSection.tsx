import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Wrench, Zap } from 'lucide-react';
import { Image } from '@/components/ui/image';

interface Skill {
  name: string;
  proficiency: number;
  icon?: string;
  category: string;
}

const skillsData: Record<string, Skill[]> = {
  'Frontend': [
    { name: 'HTML5', proficiency: 80, category: 'Frontend' },
    { name: 'CSS3', proficiency: 70, category: 'Frontend' },
    { name: 'JavaScript', proficiency: 65, category: 'Frontend' },
    { name: 'React.js', proficiency: 50, category: 'Frontend' },
  ],
  'Backend': [
    { name: 'Node.js', proficiency: 50, category: 'Backend' },
    { name: 'Express.js', proficiency: 50, category: 'Backend' },
    { name: 'MySQL', proficiency: 50, category: 'Backend' },
  ],
  'Programming': [
    { name: 'Python', proficiency: 60, category: 'Programming' },
  ],
  'Tools & Platforms': [
    { name: 'Git', proficiency: 80, category: 'Tools & Platforms' },
    { name: 'GitHub', proficiency: 80, category: 'Tools & Platforms' },
    { name: 'VS Code', proficiency: 80, category: 'Tools & Platforms' },
    { name: 'Canva', proficiency: 70, category: 'Tools & Platforms' },
    { name: 'Figma', proficiency: 40, category: 'Tools & Platforms' },
    { name: 'AI Tools', proficiency: 60, category: 'Tools & Platforms' },
  ],
};

const categoryIcons: Record<string, React.ReactNode> = {
  'Frontend': <Code2 className="w-6 h-6" />,
  'Backend': <Database className="w-6 h-6" />,
  'Programming': <Zap className="w-6 h-6" />,
  'Tools & Platforms': <Wrench className="w-6 h-6" />,
};

const CircularProgress = ({ proficiency, size = 120 }: { proficiency: number; size?: number }) => {
  const radius = size / 2 - 8;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (proficiency / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="3"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="3"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF8C00" />
            <stop offset="100%" stopColor="#E67E22" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-primary">{proficiency}%</span>
      </div>
    </div>
  );
};

const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group h-full"
    >
      {/* Glow effect */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 rounded-2xl bg-gradient-radial from-burnt-orange/20 via-burnt-orange/5 to-transparent blur-xl pointer-events-none"
          style={{
            left: mousePosition.x - 50,
            top: mousePosition.y - 50,
          }}
        />
      )}

      {/* Card */}
      <motion.div
        animate={{
          y: isHovered ? -8 : 0,
        }}
        transition={{ duration: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
        className="relative h-full p-8 rounded-2xl glass-panel border border-white/10 hover:border-primary/40 transition-all duration-300 flex flex-col items-center justify-center text-center overflow-hidden group"
      >
        {/* Background gradient on hover */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.08 : 0,
          }}
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent pointer-events-none"
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-6">
          {/* Circular Progress */}
          <motion.div
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <CircularProgress proficiency={skill.proficiency} size={100} />
          </motion.div>

          {/* Skill Name */}
          <div>
            <h4 className="font-heading text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
              {skill.name}
            </h4>
            <p className="text-xs text-foreground/50 uppercase tracking-wider mt-2 font-medium">
              Proficiency
            </p>
          </div>

          {/* Animated underline */}
          <motion.div
            animate={{
              width: isHovered ? '100%' : '0%',
            }}
            transition={{ duration: 0.3 }}
            className="h-1 bg-gradient-to-r from-primary via-burnt-orange to-primary rounded-full"
          />
        </div>

        {/* Subtle 3D tilt effect */}
        <motion.div
          animate={{
            rotateX: isHovered ? -5 : 0,
            rotateY: isHovered ? 5 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{ perspective: '1000px' }}
          className="absolute inset-0 pointer-events-none"
        />
      </motion.div>
    </motion.div>
  );
};

const CategorySection = ({ category, skills, index }: { category: string; skills: Skill[]; index: number }) => {
  const icon = categoryIcons[category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="space-y-8"
    >
      {/* Category Header */}
      <div className="flex items-center gap-4 pb-6 border-b border-white/10">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-burnt-orange/10 flex items-center justify-center text-primary">
          {icon}
        </div>
        <div>
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            {category}
          </h3>
          <p className="text-sm text-foreground/50 mt-1">
            {skills.length} {skills.length === 1 ? 'skill' : 'skills'}
          </p>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, idx) => (
          <SkillCard key={skill.name} skill={skill} index={idx} />
        ))}
      </div>
    </motion.div>
  );
};

export default function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      id="skills"
      className="py-32 bg-background relative overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />

      {/* Mouse-following glow effect */}
      <motion.div
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 30 }}
        className="absolute w-96 h-96 rounded-full bg-gradient-radial from-primary/10 via-primary/5 to-transparent blur-3xl pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          left: -192,
          top: -192,
        }}
      />

      <div className="container mx-auto px-6 lg:px-12 max-w-[120rem] relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-20 md:mb-32 text-center"
        >
          <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight mb-4">
            <span>Technical</span>
            <span className="text-primary"> Arsenal</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/60 font-paragraph max-w-2xl mx-auto">
            A curated stack of modern technologies I use to build exceptional digital experiences.
          </p>
        </motion.div>

        {/* Skills Grid - Bento Layout */}
        <div className="space-y-20">
          {Object.entries(skillsData).map(([category, skills], index) => (
            <CategorySection
              key={category}
              category={category}
              skills={skills}
              index={index}
            />
          ))}
        </div>

        {/* Bottom accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full origin-center"
        />
      </div>
    </section>
  );
}
