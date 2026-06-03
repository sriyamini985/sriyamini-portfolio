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

    </section>
  );
};

export default ExperienceSection;
