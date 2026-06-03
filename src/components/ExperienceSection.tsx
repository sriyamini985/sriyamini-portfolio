import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, Users, Lightbulb } from 'lucide-react';
import { Image } from '@/components/ui/image';

interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string[];
  icon: React.ReactNode;
  highlights: string[];
  color: string;
  glowColor: string;
}

const experiences: ExperienceItem[] = [
  {
    id: '1',
    title: 'Founder & CEO',
    company: 'ManaSetu',
    period: '2025 – Present',
    description: [
      'Building and leading ManaSetu',
      'Defining product vision and strategy',
      'Managing development and growth'
    ],
    icon: <Lightbulb className="w-6 h-6" />,
    highlights: ['Leadership', 'Product Vision', 'Strategy'],
    color: 'from-amber-500/20 to-amber-600/10',
    glowColor: 'rgba(217, 119, 6, 0.5)'
  },
  {
    id: '2',
    title: 'Promotions Lead',
    company: 'GDG On Campus SVCE',
    period: '2025 – 2026',
    description: [
      'Led promotions and outreach',
      'Organized community engagement initiatives',
      'Grew developer community participation'
    ],
    icon: <Users className="w-6 h-6" />,
    highlights: ['Community', 'Engagement', 'Growth'],
    color: 'from-purple-500/20 to-purple-600/10',
    glowColor: 'rgba(147, 51, 234, 0.5)'
  },
  {
    id: '3',
    title: 'Ladies Representative',
    company: 'SVCE',
    period: '2023 – Present',
    description: [
      'Student leadership and coordination',
      'Communication between students and faculty',
      'Fostering inclusive community'
    ],
    icon: <Briefcase className="w-6 h-6" />,
    highlights: ['Leadership', 'Coordination', 'Impact'],
    color: 'from-pink-500/20 to-pink-600/10',
    glowColor: 'rgba(236, 72, 153, 0.5)'
  }
];

const ExperienceSection = () => {
  return (
    <section id="experience-redesigned" className="py-32 bg-deep-charcoal relative overflow-hidden border-t border-white/5">
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
            Professional <span className="text-primary">Journey</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/60 font-paragraph max-w-3xl mx-auto">
            Leadership • Growth • Ownership • Entrepreneurship
          </p>
        </motion.div>

        {/* Interactive Journey Timeline */}
        <div className="relative">
          {/* Animated Connection Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-1/2">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="w-full h-full bg-gradient-to-b from-primary via-primary/50 to-transparent origin-top"
              style={{
                boxShadow: '0 0 30px rgba(255, 140, 0, 0.6), 0 0 60px rgba(255, 140, 0, 0.3)'
              }}
            />
          </div>

          {/* Experience Cards */}
          <div className="space-y-16 md:space-y-24">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
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
                      whileHover={{ y: -8 }}
                      className={`relative p-8 md:p-10 rounded-2xl border border-white/10 transition-all duration-300 group overflow-hidden bg-gradient-to-br ${exp.color} backdrop-blur-sm`}
                      style={{
                        boxShadow: `inset 0 0 30px ${exp.glowColor}20`
                      }}
                    >
                      {/* Hover Glow Effect */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background: `radial-gradient(circle at 50% 50%, ${exp.glowColor}30, transparent 70%)`
                        }}
                      />

                      {/* Content */}
                      <div className="relative z-10">
                        {/* Period Badge */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + 0.1 }}
                          className="inline-block mb-4"
                        >
                          <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-mono font-bold text-primary">
                            {exp.period}
                          </span>
                        </motion.div>

                        {/* Icon and Title */}
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-primary group-hover:scale-110 transition-transform duration-300">
                            {exp.icon}
                          </div>
                          <div>
                            <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                              {exp.title}
                            </h3>
                            <p className="text-lg font-semibold text-primary mt-1">
                              {exp.company}
                            </p>
                          </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2 mb-6">
                          {exp.description.map((desc, i) => (
                            <motion.p
                              key={i}
                              initial={{ opacity: 0, x: isEven ? 10 : -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 + i * 0.05 }}
                              className="text-foreground/80 leading-relaxed text-base md:text-lg flex items-start gap-2"
                            >
                              <span className="text-primary mt-1">•</span>
                              <span>{desc}</span>
                            </motion.p>
                          ))}
                        </div>

                        {/* Highlights */}
                        <div className="flex flex-wrap gap-2">
                          {exp.highlights.map((highlight, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 + i * 0.05 }}
                              className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs md:text-sm font-medium text-foreground/70 hover:text-primary hover:border-primary/50 transition-all duration-300"
                            >
                              {highlight}
                            </motion.span>
                          ))}
                        </div>
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
            Driven by leadership, innovation, and the ambition to build meaningful solutions.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-foreground/60">
              🚀 Building Impact
            </span>
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-foreground/60">
              💡 Driving Innovation
            </span>
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-foreground/60">
              🎯 Leading Growth
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
