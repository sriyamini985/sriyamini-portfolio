import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Code2, Award, Users, Lightbulb, Zap, GraduationCap, Star } from 'lucide-react';

interface TimelineEntry {
  year: string;
  title: string;
  organization?: string;
  description: string;
  icon: React.ReactNode;
  highlights?: string[];
  category: 'education' | 'founder' | 'leadership' | 'development' | 'research' | 'builder';
}

const timelineData: TimelineEntry[] = [
  {
    year: '2023 – Present',
    title: 'Computer Science Engineering Student',
    organization: 'Sri Venkateswara College of Engineering',
    description: 'Building strong foundations in web development, problem solving, and software engineering. Exploring frontend technologies, backend fundamentals, and modern development tools.',
    icon: <GraduationCap className="w-6 h-6" />,
    category: 'education'
  },
  {
    year: '2023 – Present',
    title: 'Project Builder',
    description: 'Created projects including ManaSetu, MoodFixer, SkillVerse, Resume Builder, and WellNest. Built projects combining creativity, functionality, and user-focused problem solving.',
    icon: <Star className="w-6 h-6" />,
    highlights: ['ManaSetu', 'MoodFixer', 'SkillVerse', 'Resume Builder', 'WellNest'],
    category: 'builder'
  },
  {
    year: '2024 – Present',
    title: 'Ladies Representative',
    description: 'Strengthened communication, leadership, event coordination, and team collaboration skills. Building inclusive communities and fostering meaningful connections.',
    icon: <Users className="w-6 h-6" />,
    highlights: ['Leadership', 'Event Coordination', 'Team Collaboration'],
    category: 'leadership'
  },
  {
    year: '2024 – 2025',
    title: 'Frontend Developer',
    organization: 'Purnvasu',
    description: 'Worked on frontend implementation using modern web technologies. Focused on responsive UI, clean interfaces, and development best practices.',
    icon: <Code2 className="w-6 h-6" />,
    highlights: ['Responsive Design', 'UI/UX Implementation', 'Best Practices'],
    category: 'development'
  },
  {
    year: '2025',
    title: 'Research Team Member',
    organization: 'Webotex',
    description: 'Worked on research-driven technical initiatives. Contributed to structured development, usability thinking, and solution-oriented implementation.',
    icon: <Award className="w-6 h-6" />,
    highlights: ['Research Development', 'Usability Focus', 'Technical Innovation'],
    category: 'research'
  },
  {
    year: '2025 – Present',
    title: 'Promotions Lead',
    organization: 'GDG On Campus SVCE',
    description: 'Leading technical event promotions and student engagement initiatives. Contributing to growing community participation and awareness around developer programs and innovation culture.',
    icon: <Zap className="w-6 h-6" />,
    highlights: ['Event Promotions', 'Community Growth', 'Student Engagement'],
    category: 'leadership'
  },
  {
    year: '2025 – Future',
    title: 'Founder & CEO',
    organization: 'ManaSetu',
    description: 'Leading an early-stage startup initiative. Driving product vision, strategy, execution, and innovation. Building solutions with a focus on impact, creativity, and long-term scalability.',
    icon: <Lightbulb className="w-6 h-6" />,
    highlights: ['Product Vision', 'Strategy & Execution', 'Innovation Focus'],
    category: 'founder'
  }
];

const categoryColors = {
  education: 'from-blue-500/20 to-blue-600/10',
  founder: 'from-amber-500/20 to-amber-600/10',
  leadership: 'from-purple-500/20 to-purple-600/10',
  development: 'from-green-500/20 to-green-600/10',
  research: 'from-pink-500/20 to-pink-600/10',
  builder: 'from-orange-500/20 to-orange-600/10'
};

const categoryBorders = {
  education: 'border-blue-500/30',
  founder: 'border-amber-500/30',
  leadership: 'border-purple-500/30',
  development: 'border-green-500/30',
  research: 'border-pink-500/30',
  builder: 'border-orange-500/30'
};

const categoryAccents = {
  education: 'text-blue-400',
  founder: 'text-amber-400',
  leadership: 'text-purple-400',
  development: 'text-green-400',
  research: 'text-pink-400',
  builder: 'text-orange-400'
};

export default function ProfessionalJourney() {
  return (
    <section id="professional-journey" className="py-32 bg-deep-charcoal relative overflow-hidden border-t border-white/5">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-12 max-w-[100rem] relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight mb-6">
            Professional <span className="text-primary">Journey</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/60 font-paragraph max-w-3xl mx-auto">
            Not just a student—actively building, leading, learning, and growing. A journey of continuous evolution, ambitious vision, and meaningful impact.
          </p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-24 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 backdrop-blur-xl"
        >
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="md:col-span-2">
              <h3 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
                Sriyamini Reddy
              </h3>
              <p className="text-lg text-primary font-medium mb-6">Computer Science Engineering Student</p>
              <p className="text-foreground/70 leading-relaxed text-lg">
                A 3rd-year student with a founder's mindset, blending technical excellence with creative problem-solving. Passionate about building elegant solutions that create tangible impact.
              </p>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-sm text-foreground/60 uppercase tracking-wider mb-1">Institution</p>
                <p className="font-heading text-lg font-bold text-foreground">Sri Venkateswara College of Engineering</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-sm text-foreground/60 uppercase tracking-wider mb-1">Timeline</p>
                <p className="font-heading text-lg font-bold text-foreground">2023 – 2027</p>
              </div>
              <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30">
                <p className="text-sm text-foreground/60 uppercase tracking-wider mb-1">CGPA</p>
                <p className="font-heading text-2xl font-bold text-primary">9.15</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-primary/50 to-transparent transform md:-translate-x-1/2" />

          {/* Timeline Items */}
          <div className="space-y-16 md:space-y-24">
            {timelineData.map((entry, index) => {
              const isEven = index % 2 === 0;
              const categoryColor = categoryColors[entry.category as keyof typeof categoryColors];
              const categoryBorder = categoryBorders[entry.category as keyof typeof categoryBorders];
              const categoryAccent = categoryAccents[entry.category as keyof typeof categoryAccents];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Node */}
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    className="absolute left-[-11px] md:left-1/2 top-8 md:top-1/2 w-6 h-6 rounded-full bg-primary transform md:-translate-x-1/2 md:-translate-y-1/2 shadow-[0_0_20px_rgba(255,140,0,0.8)] z-10 border-4 border-deep-charcoal cursor-pointer"
                  />

                  {/* Content Container */}
                  <div className={`w-full md:w-1/2 pl-8 md:pl-0 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                    <motion.div
                      whileHover={{ y: -5 }}
                      className={`relative p-8 md:p-10 rounded-2xl border transition-all duration-300 group overflow-hidden ${categoryBorder} bg-gradient-to-br ${categoryColor}`}
                    >
                      {/* Hover Glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Content */}
                      <div className="relative z-10">
                        {/* Year Badge */}
                        <div className="inline-block mb-4">
                          <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-mono font-bold text-primary">
                            {entry.year}
                          </span>
                        </div>

                        {/* Icon and Title */}
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 ${categoryAccent}`}>
                            {entry.icon}
                          </div>
                          <div>
                            <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                              {entry.title}
                            </h3>
                            {entry.organization && (
                              <p className={`text-lg font-semibold mt-1 ${categoryAccent}`}>
                                {entry.organization}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-foreground/80 leading-relaxed mb-6 text-base md:text-lg">
                          {entry.description}
                        </p>

                        {/* Highlights */}
                        {entry.highlights && entry.highlights.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {entry.highlights.map((highlight, i) => (
                              <motion.span
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs md:text-sm font-medium text-foreground/70 hover:text-primary hover:border-primary/50 transition-all duration-300"
                              >
                                {highlight}
                              </motion.span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
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
            Driven by curiosity, execution, and the ambition to build meaningful solutions.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-foreground/60">
              🚀 Always Learning
            </span>
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-foreground/60">
              💡 Building Solutions
            </span>
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-foreground/60">
              🎯 Creating Impact
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
