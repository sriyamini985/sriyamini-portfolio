import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { X } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  category: 'Hackathons' | 'Certifications' | 'Leadership' | 'Workshops';
  description: string;
  icon: string;
  size: 'small' | 'medium' | 'large';
}

interface Certificate {
  id: string;
  title: string;
  category: 'Hackathons' | 'Certifications' | 'Leadership' | 'Workshops';
  image: string;
}

const achievements: Achievement[] = [
  {
    id: '1',
    title: 'Adobe Hackathon',
    category: 'Hackathons',
    description: 'Participated in Adobe India Hackathon',
    icon: '🎯',
    size: 'large'
  },
  {
    id: '2',
    title: 'GDG Solution Challenge',
    category: 'Hackathons',
    description: 'Google Developer Group Solution Challenge Participant',
    icon: '💡',
    size: 'medium'
  },
  {
    id: '3',
    title: 'Google Cloud Agentic AI',
    category: 'Workshops',
    description: 'Google Cloud Agentic AI Day Participant',
    icon: '🤖',
    size: 'medium'
  },
  {
    id: '4',
    title: 'TechSpark Winner',
    category: 'Hackathons',
    description: 'Winner at TechSpark 2024 National Technical Fest',
    icon: '⚡',
    size: 'large'
  },
  {
    id: '5',
    title: 'IIT Aspire',
    category: 'Certifications',
    description: 'IIT Aspire Participation',
    icon: '🏆',
    size: 'small'
  },
  {
    id: '6',
    title: 'Hackathon Finalist',
    category: 'Hackathons',
    description: 'Multiple Hackathon Finalist & Participant',
    icon: '🚀',
    size: 'medium'
  },
  {
    id: '7',
    title: 'GDG Leadership',
    category: 'Leadership',
    description: 'GDG On Campus Leadership Role',
    icon: '👥',
    size: 'medium'
  },
  {
    id: '8',
    title: 'Community Leader',
    category: 'Leadership',
    description: 'Event Coordination & Community Leadership',
    icon: '🎤',
    size: 'small'
  },
  {
    id: '9',
    title: 'ManaSetu Founder',
    category: 'Leadership',
    description: 'Startup Founder – ManaSetu',
    icon: '🌱',
    size: 'large'
  },
  {
    id: '10',
    title: 'Academic Excellence',
    category: 'Certifications',
    description: 'Consistent Academic Excellence',
    icon: '📚',
    size: 'small'
  },
  {
    id: '11',
    title: 'Technical Workshops',
    category: 'Workshops',
    description: 'Multiple Technical Workshops & Certifications',
    icon: '🛠️',
    size: 'medium'
  }
];

const certificates: Certificate[] = [
  {
    id: 'cert1',
    title: 'Adobe Hackathon Participation',
    category: 'Hackathons',
    image: 'https://static.wixstatic.com/media/9dc27f_17c2de613fa947bc821288965220416a~mv2.jpeg'
  },
  {
    id: 'cert2',
    title: 'TechSpark 2024 Winner',
    category: 'Hackathons',
    image: 'https://static.wixstatic.com/media/9dc27f_d635230353e340d08da3add3dd80a97c~mv2.jpeg'
  },
  {
    id: 'cert3',
    title: 'Tech Spark Participation',
    category: 'Hackathons',
    image: 'https://static.wixstatic.com/media/9dc27f_846c5f324f60411eb7695b9115a0a20c~mv2.jpeg'
  },
  {
    id: 'cert4',
    title: 'Tech Spark Certificate',
    category: 'Hackathons',
    image: 'https://static.wixstatic.com/media/9dc27f_77bee45f33724e6aa54c868a946e0c60~mv2.jpeg'
  },
  {
    id: 'cert5',
    title: 'Leadership Certificate',
    category: 'Leadership',
    image: 'https://static.wixstatic.com/media/9dc27f_192ddc4f7b004f5b94e90336db091324~mv2.jpeg'
  },
  {
    id: 'cert6',
    title: 'GDG Solution Challenge',
    category: 'Certifications',
    image: 'https://static.wixstatic.com/media/9dc27f_40c6bf08ae0a45938a9fa546b71fe20e~mv2.jpeg'
  },
  {
    id: 'cert7',
    title: 'GDG Solution Challenge Certificate',
    category: 'Certifications',
    image: 'https://static.wixstatic.com/media/9dc27f_30c1c27120624ddcb787d8c42760b802~mv2.jpeg'
  },
  {
    id: 'cert8',
    title: 'Google Cloud Agentic AI',
    category: 'Workshops',
    image: 'https://static.wixstatic.com/media/9dc27f_ee60f36d791843bf98f0288f38869406~mv2.jpeg'
  }
];

const categories: Array<'Hackathons' | 'Certifications' | 'Leadership' | 'Workshops'> = [
  'Hackathons',
  'Certifications',
  'Leadership',
  'Workshops'
];

export default function AchievementsSection() {
  const [selectedCategory, setSelectedCategory] = useState<'Hackathons' | 'Certifications' | 'Leadership' | 'Workshops' | 'All'>('All');
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredCerts = selectedCategory === 'All' 
    ? certificates 
    : certificates.filter(cert => cert.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const getGridSize = (size: string) => {
    switch (size) {
      case 'large':
        return 'md:col-span-2 md:row-span-2';
      case 'medium':
        return 'md:col-span-1 md:row-span-1';
      case 'small':
        return 'md:col-span-1 md:row-span-1';
      default:
        return 'md:col-span-1';
    }
  };

  return (
    <section id="achievements" className="w-full bg-deep-charcoal py-20 px-4 md:px-8 lg:px-12">
      <div className="max-w-[100rem] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-white mb-4">
            Achievements & Milestones
          </h2>
          <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto font-paragraph">
            A collection of achievements, leadership experiences, hackathons, certifications, and professional growth milestones throughout my journey as a developer, leader, and founder.
          </p>
        </motion.div>

        {/* Achievement Wall - Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-20"
        >
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              variants={itemVariants}
              className={`${getGridSize(achievement.size)} group relative overflow-hidden rounded-2xl bg-gradient-to-br from-burnt-orange/10 to-transparent border border-burnt-orange/20 p-6 md:p-8 backdrop-blur-sm hover:border-burnt-orange/50 transition-all duration-300 cursor-pointer`}
              whileHover={{ y: -8, boxShadow: '0 0 30px rgba(230, 126, 34, 0.3)' }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-burnt-orange/0 to-burnt-orange/0 group-hover:from-burnt-orange/10 group-hover:to-burnt-orange/5 transition-all duration-300" />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="text-4xl md:text-5xl mb-4">{achievement.icon}</div>
                  <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-sm md:text-base text-foreground font-paragraph">
                    {achievement.description}
                  </p>
                </div>
                <div className="mt-4 inline-block">
                  <span className="text-xs md:text-sm px-3 py-1 rounded-full bg-burnt-orange/20 text-burnt-orange border border-burnt-orange/30">
                    {achievement.category}
                  </span>
                </div>
              </div>

              {/* Hover border animation */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-burnt-orange/30 transition-all duration-300" />
            </motion.div>
          ))}
        </motion.div>

        {/* Certificate Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <h3 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              Certificate Showcase
            </h3>
            <p className="text-lg text-foreground font-paragraph">
              Click on any certificate to view in detail
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {['All', ...categories].map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category as any)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full font-paragraph font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-burnt-orange text-white shadow-lg shadow-burnt-orange/50'
                    : 'bg-burnt-orange/10 text-burnt-orange border border-burnt-orange/30 hover:bg-burnt-orange/20'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* Certificate Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filteredCerts.map((cert, index) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => setSelectedCert(cert)}
                className="group relative overflow-hidden rounded-xl cursor-pointer"
              >
                <div className="relative h-64 md:h-72 overflow-hidden rounded-xl border border-burnt-orange/20 hover:border-burnt-orange/50 transition-all duration-300">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div>
                      <p className="text-white font-heading font-bold text-sm">{cert.title}</p>
                      <p className="text-burnt-orange text-xs">{cert.category}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      {selectedCert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedCert(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[90vh] rounded-2xl overflow-hidden"
          >
            <Image
              src={selectedCert.image}
              alt={selectedCert.title}
              width={1200}
              height={900}
              className="w-full h-full object-contain"
            />
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 bg-burnt-orange hover:bg-burnt-orange/80 text-white p-2 rounded-full transition-all duration-300"
            >
              <X size={24} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
