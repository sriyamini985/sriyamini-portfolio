import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { X, Award, Trophy, Star, Zap } from 'lucide-react';
import { Achievements } from '@/entities';
import { BaseCrudService } from '@/integrations';

interface Certificate {
  id: string;
  title: string;
  category: string;
  image: string;
}

const categoryIcons: Record<string, React.ReactNode> = {
  'Hackathons': <Zap className="w-6 h-6" />,
  'Certifications': <Award className="w-6 h-6" />,
  'Leadership': <Trophy className="w-6 h-6" />,
  'Workshops': <Star className="w-6 h-6" />,
};

export default function AchievementsSection() {
  const [achievements, setAchievements] = useState<Achievements[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCert, setSelectedCert] = useState<Achievements | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    async function loadAchievements() {
      try {
        const data = await BaseCrudService.getAll<Achievements>('achievements');
        setAchievements(data.items);
        
        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(data.items.map(item => item.description?.split('|')[0]?.trim() || 'Other'))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error loading achievements:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadAchievements();
  }, []);

  const filteredAchievements = selectedCategory === 'All' 
    ? achievements 
    : achievements.filter(ach => {
        const category = ach.description?.split('|')[0]?.trim() || 'Other';
        return category === selectedCategory;
      });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  if (isLoading) {
    return (
      <section id="achievements" className="w-full bg-deep-charcoal py-20 px-4 md:px-8 lg:px-12">
        <div className="max-w-[100rem] mx-auto">
          <div className="text-center mb-16">
            <div className="h-12 bg-burnt-orange/10 rounded-lg w-64 mx-auto mb-4 animate-pulse" />
            <div className="h-6 bg-burnt-orange/10 rounded-lg w-96 mx-auto animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

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
            A comprehensive collection of awards, hackathon wins, leadership roles, certifications, and professional growth milestones throughout my journey as a developer, leader, and founder.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {['All', ...categories].map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
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

        {/* Achievements Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
        >
          {filteredAchievements.length > 0 ? (
            filteredAchievements.map((achievement) => (
              <motion.div
                key={achievement._id}
                variants={itemVariants}
                onClick={() => setSelectedCert(achievement)}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-burnt-orange/10 to-transparent border border-burnt-orange/20 p-6 md:p-8 backdrop-blur-sm hover:border-burnt-orange/50 transition-all duration-300 cursor-pointer"
                whileHover={{ y: -8, boxShadow: '0 0 30px rgba(230, 126, 34, 0.3)' }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-burnt-orange/0 to-burnt-orange/0 group-hover:from-burnt-orange/10 group-hover:to-burnt-orange/5 transition-all duration-300" />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="text-4xl md:text-5xl mb-4">
                      {categoryIcons[achievement.description?.split('|')[0]?.trim() || 'Other'] || '🏆'}
                    </div>
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-3">
                      {achievement.title}
                    </h3>
                    <p className="text-sm md:text-base text-foreground/80 font-paragraph leading-relaxed">
                      {achievement.description?.split('|').slice(1).join('|').trim() || achievement.description}
                    </p>
                    {achievement.date && (
                      <p className="text-xs text-foreground/60 mt-3">
                        {new Date(achievement.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short' 
                        })}
                      </p>
                    )}
                  </div>
                  <div className="mt-4 inline-block">
                    <span className="text-xs md:text-sm px-3 py-1 rounded-full bg-burnt-orange/20 text-burnt-orange border border-burnt-orange/30">
                      {achievement.description?.split('|')[0]?.trim() || 'Achievement'}
                    </span>
                  </div>
                </div>

                {/* Hover border animation */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-burnt-orange/30 transition-all duration-300" />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-foreground/60 text-lg">No achievements in this category yet.</p>
            </div>
          )}
        </motion.div>

        {/* Certificate Gallery */}
        {achievements.some(a => a.certificateImage) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-24 pt-16 border-t border-burnt-orange/20"
          >
            <div className="text-center mb-12">
              <h3 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
                Certificate Gallery
              </h3>
              <p className="text-lg text-foreground font-paragraph">
                Click on any certificate to view in detail
              </p>
            </div>

            {/* Certificate Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {achievements
                .filter(a => a.certificateImage)
                .map((cert, index) => (
                  <motion.div
                    key={cert._id}
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
                        src={cert.certificateImage!}
                        alt={cert.title || 'Certificate'}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <div>
                          <p className="text-white font-heading font-bold text-sm">{cert.title}</p>
                          <p className="text-burnt-orange text-xs">{cert.issuer}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          </motion.div>
        )}
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
            {selectedCert.certificateImage ? (
              <Image
                src={selectedCert.certificateImage}
                alt={selectedCert.title || 'Certificate'}
                width={1200}
                height={900}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="bg-deep-charcoal p-12 rounded-2xl max-w-2xl">
                <h3 className="text-3xl font-heading font-bold text-white mb-4">{selectedCert.title}</h3>
                <p className="text-lg text-foreground/80 mb-6">{selectedCert.description}</p>
                {selectedCert.issuer && (
                  <p className="text-foreground/60 mb-2">
                    <span className="font-semibold text-burnt-orange">Issuer:</span> {selectedCert.issuer}
                  </p>
                )}
                {selectedCert.date && (
                  <p className="text-foreground/60 mb-4">
                    <span className="font-semibold text-burnt-orange">Date:</span> {new Date(selectedCert.date).toLocaleDateString()}
                  </p>
                )}
                {selectedCert.verificationUrl && (
                  <a
                    href={selectedCert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-6 px-6 py-2 bg-burnt-orange text-white rounded-lg hover:bg-burnt-orange/80 transition-colors"
                  >
                    Verify Certificate
                  </a>
                )}
              </div>
            )}
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
