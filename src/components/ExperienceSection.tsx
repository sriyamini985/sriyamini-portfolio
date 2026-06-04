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
            Professional <span className="text-primary">Experience</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/60 font-paragraph max-w-3xl mx-auto">
            Diverse roles and responsibilities that shaped my journey as a developer and leader.
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="flex gap-8 md:gap-12">
                {/* Left: Icon and Timeline */}
                <div className="flex flex-col items-center gap-4 md:gap-6">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-burnt-orange/10 border border-primary/30 flex items-center justify-center text-primary shrink-0"
                  >
                    {exp.icon}
                  </motion.div>
                  {index !== experiences.length - 1 && (
                    <div className="w-1 h-20 md:h-32 bg-gradient-to-b from-primary/50 to-transparent" />
                  )}
                </div>

                {/* Right: Content */}
                <div className="pb-8 md:pb-12 flex-1">
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="p-8 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 group-hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="space-y-4">
                      <div>
                        <span className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-bold mb-3">
                          {exp.period}
                        </span>
                        <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-1">
                          {exp.title}
                        </h3>
                        <p className="text-lg text-primary font-semibold">{exp.company}</p>
                      </div>

                      <p className="text-foreground/80 leading-relaxed">
                        {exp.description.join(' ')}
                      </p>

                      {exp.highlights.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-4">
                          {exp.highlights.map((highlight, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-foreground/70"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
