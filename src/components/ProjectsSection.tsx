import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight, Zap, Crown } from 'lucide-react';
import { Image } from '@/components/ui/image';

interface Project {
  id: string;
  title: string;
  role: string;
  period: string;
  description: string;
  techStack: string[];
  website?: string;
  image?: string;
  isFeatured?: boolean;
  badges?: string[];
}

const projects: Project[] = [
  {
    id: 'manasetu',
    title: 'ManaSetu',
    role: 'Founder & CEO',
    period: '2025 – Present',
    description: 'Community-powered platform focused on connecting people, opportunities, collaboration, and impact.',
    techStack: ['React.js', 'Node.js', 'Express.js', 'MySQL'],
    website: 'https://www.workearncommunity.com/',
    image: 'https://static.wixstatic.com/media/9dc27f_88e648b9c8f647448d806eb65f26d10c~mv2.png?originWidth=448&originHeight=448',
    isFeatured: true,
    badges: ['Startup', 'Founder']
  },
  {
    id: 'punarvasu',
    title: 'Punarvasu',
    role: 'Frontend Developer',
    period: '2024 – 2025',
    description: 'Modern web application with responsive design and interactive user interfaces.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'React.js'],
    image: 'https://static.wixstatic.com/media/9dc27f_466156c4e47e4436b5e4a792aaa4947d~mv2.png?originWidth=448&originHeight=448'
  },
  {
    id: 'moodfixer',
    title: 'MoodFixer',
    role: 'Full Stack Developer',
    period: '2024',
    description: 'Interactive mood-based platform that helps users track and improve their emotional well-being.',
    techStack: ['React.js', 'Node.js', 'MongoDB'],
    image: 'https://static.wixstatic.com/media/9dc27f_a88208d63c7847459c24bc8dae515bae~mv2.png?originWidth=448&originHeight=448'
  },
  {
    id: 'skillverse',
    title: 'SkillVerse',
    role: 'Full Stack Developer',
    period: '2024',
    description: 'Learning and skill development platform connecting learners with resources and mentors.',
    techStack: ['React.js', 'Firebase', 'Tailwind CSS'],
    image: 'https://static.wixstatic.com/media/9dc27f_489a8b32942e4026ba032603ce7e1f42~mv2.png?originWidth=448&originHeight=448'
  },
  {
    id: 'resumebuilder',
    title: 'Resume Builder',
    role: 'Frontend Developer',
    period: '2023 – 2024',
    description: 'Intuitive resume creation platform with real-time preview and multiple templates.',
    techStack: ['React.js', 'JavaScript', 'CSS'],
    image: 'https://static.wixstatic.com/media/9dc27f_96c04c63feb44d94a4b6b0bb94b57bd2~mv2.png?originWidth=448&originHeight=448'
  },
  {
    id: 'wellnest',
    title: 'WellNest',
    role: 'Full Stack Developer',
    period: '2023 – 2024',
    description: 'Wellness-focused web application promoting healthy lifestyle and mental well-being.',
    techStack: ['React.js', 'Node.js', 'PostgreSQL'],
    image: 'https://static.wixstatic.com/media/9dc27f_2eba4368984c4f8f98a82aa6b86b9780~mv2.png?originWidth=448&originHeight=448'
  }
];

const ProjectsSection = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const featuredProject = projects.find(p => p.isFeatured);
  const otherProjects = projects.filter(p => !p.isFeatured);

  return (
    <section id="projects-redesigned" className="py-32 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 max-w-[120rem] relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight mb-6">
            Featured <span className="text-primary">Work</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/60 font-paragraph max-w-3xl mx-auto">
            Premium projects showcasing leadership, innovation, and technical excellence.
          </p>
        </motion.div>

        {/* Featured Project - ManaSetu */}
        {featuredProject && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-32"
          >
            <div className="relative rounded-3xl overflow-hidden group"
              onMouseEnter={() => setHoveredId('manasetu')}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Background Glow */}
              <motion.div
                animate={{
                  opacity: hoveredId === 'manasetu' ? 1 : 0.6,
                  scale: hoveredId === 'manasetu' ? 1.05 : 1
                }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent pointer-events-none"
                style={{
                  boxShadow: 'inset 0 0 60px rgba(255, 140, 0, 0.3)'
                }}
              />

              {/* Border Glow */}
              <div className="absolute inset-0 rounded-3xl border-2 border-primary/30 group-hover:border-primary/60 transition-colors duration-500 pointer-events-none" />

              <div className="relative z-10 grid lg:grid-cols-2 gap-12 p-8 md:p-12 lg:p-16 bg-gradient-to-br from-deep-charcoal/80 to-background/80 backdrop-blur-xl">
                {/* Left: Image and Info */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="flex flex-col justify-center space-y-8"
                >
                  {/* Logo and Badges */}
                  <div className="space-y-6">
                    <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 p-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Image
                        src={featuredProject.image || 'https://static.wixstatic.com/media/9dc27f_04cc23d22d024d24a0d08e338a68a7d3~mv2.png?originWidth=448&originHeight=448'}
                        alt={featuredProject.title}
                        width={80}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-3">
                      {featuredProject.badges?.map((badge, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="px-4 py-2 rounded-full bg-primary/20 border border-primary/40 text-sm font-bold text-primary flex items-center gap-2"
                        >
                          {badge === 'Startup' && <Zap className="w-4 h-4" />}
                          {badge === 'Founder' && <Crown className="w-4 h-4" />}
                          {badge}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Title and Role */}
                  <div>
                    <h3 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-3">
                      {featuredProject.title}
                    </h3>
                    <p className="text-lg text-primary font-semibold mb-2">{featuredProject.role}</p>
                    <p className="text-foreground/60 text-sm">{featuredProject.period}</p>
                  </div>

                  {/* Description */}
                  <p className="text-lg text-foreground/80 leading-relaxed">
                    {featuredProject.description}
                  </p>

                  {/* Tech Stack */}
                  <div>
                    <h4 className="font-heading text-sm uppercase tracking-widest text-primary mb-4 font-bold">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {featuredProject.techStack.map((tech, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 }}
                          className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-foreground/80 hover:border-primary/50 transition-colors"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  {featuredProject.website && (
                    <motion.a
                      href={featuredProject.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg w-fit shadow-[0_0_40px_-10px_rgba(255,140,0,0.5)] hover:shadow-[0_0_60px_-10px_rgba(255,140,0,0.7)] transition-all duration-300"
                    >
                      Visit Website <ArrowRight className="w-5 h-5" />
                    </motion.a>
                  )}
                </motion.div>

                {/* Right: Large Image */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden"
                >
                  <motion.div
                    animate={{
                      scale: hoveredId === 'manasetu' ? 1.05 : 1
                    }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full"
                  >
                    <Image
                      src={featuredProject.image || 'https://static.wixstatic.com/media/9dc27f_8143efe64ddf475395a5129733972da2~mv2.png?originWidth=448&originHeight=448'}
                      alt={featuredProject.title}
                      width={500}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/40 via-transparent to-transparent pointer-events-none" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Other Projects - Bento Grid */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12"
          >
            Other <span className="text-primary">Projects</span>
          </motion.h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative rounded-2xl overflow-hidden h-full"
              >
                {/* Card Background */}
                <motion.div
                  animate={{
                    y: hoveredId === project.id ? -8 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="relative h-full rounded-2xl border border-white/10 group-hover:border-primary/30 transition-colors duration-300 overflow-hidden"
                >
                  {/* Image Background */}
                  <div className="absolute inset-0">
                    <Image
                      src={project.image || 'https://static.wixstatic.com/media/9dc27f_55687c30b3994e18b6451c4753245df3~mv2.png?originWidth=448&originHeight=448'}
                      alt={project.title}
                      width={400}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal via-deep-charcoal/40 to-transparent" />
                  </div>

                  {/* Hover Glow */}
                  <motion.div
                    animate={{
                      opacity: hoveredId === project.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent pointer-events-none"
                  />

                  {/* Content */}
                  <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                    <motion.div
                      animate={{
                        y: hoveredId === project.id ? -4 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <h4 className="font-heading text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h4>
                      <p className="text-primary font-semibold text-sm mb-3">{project.role}</p>
                      <p className="text-foreground/80 text-sm leading-relaxed mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Tech Stack Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.techStack.slice(0, 2).map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium text-foreground/70"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 2 && (
                          <span className="px-2 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium text-foreground/70">
                            +{project.techStack.length - 2}
                          </span>
                        )}
                      </div>

                      {/* Period */}
                      <p className="text-foreground/50 text-xs font-mono">{project.period}</p>
                    </motion.div>
                  </div>

                  {/* Hover Arrow */}
                  <motion.div
                    animate={{
                      opacity: hoveredId === project.id ? 1 : 0,
                      scale: hoveredId === project.id ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center"
                  >
                    <ArrowRight className="w-5 h-5 text-primary" />
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-24 pt-16 border-t border-white/10 text-center"
        >
          <p className="text-lg text-foreground/70 mb-6">
            Each project represents a commitment to excellence, innovation, and real-world impact.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-foreground/60">
              ✨ Premium Quality
            </span>
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-foreground/60">
              🚀 Production Ready
            </span>
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-foreground/60">
              💼 Professional Grade
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
