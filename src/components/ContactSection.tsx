import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Instagram, Copy, Check, Download } from 'lucide-react';

interface ContactCard {
  id: string;
  title: string;
  value: string;
  icon: React.ReactNode;
  link: string;
  color: string;
}

const contactCards: ContactCard[] = [
  {
    id: 'email',
    title: 'Email',
    value: 'sriyamini659@gmail.com',
    icon: <Mail size={32} />,
    link: 'mailto:sriyamini659@gmail.com',
    color: 'from-red-500/20 to-red-600/10'
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    value: 'Sriyamini Reddy',
    icon: <Linkedin size={32} />,
    link: 'https://linkedin.com/in/sriyamini-reddy',
    color: 'from-blue-500/20 to-blue-600/10'
  },
  {
    id: 'github',
    title: 'GitHub',
    value: 'sriyamini985',
    icon: <Github size={32} />,
    link: 'https://github.com/sriyamini985',
    color: 'from-gray-500/20 to-gray-600/10'
  },
  {
    id: 'instagram',
    title: 'Instagram',
    value: '_its__yamz',
    icon: <Instagram size={32} />,
    link: 'https://instagram.com/_its__yamz',
    color: 'from-pink-500/20 to-pink-600/10'
  }
];

export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('sriyamini659@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

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

  return (
    <section className="w-full bg-deep-charcoal py-20 px-4 md:px-8 lg:px-12">
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
            Let's Connect
          </h2>
          <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto font-paragraph">
            Open to opportunities, collaborations, internships, startup discussions, and meaningful conversations.
          </p>
        </motion.div>

        {/* Split Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Message & CTA */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-3xl md:text-4xl font-heading font-bold text-white">
                Let's Build Something Amazing
              </h3>
              <p className="text-lg text-foreground font-paragraph leading-relaxed">
                I'm always excited to connect with like-minded professionals, founders, and collaborators. Whether you're interested in discussing a project, exploring partnership opportunities, or just want to chat about tech and innovation, I'd love to hear from you.
              </p>
            </motion.div>

            {/* Availability Status */}
            <motion.div
              variants={itemVariants}
              className="p-6 rounded-xl bg-gradient-to-br from-burnt-orange/10 to-transparent border border-burnt-orange/30 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-burnt-orange rounded-full animate-pulse" />
                <span className="text-burnt-orange font-heading font-bold">Available Now</span>
              </div>
              <p className="text-foreground font-paragraph">
                Open to freelance projects, full-time opportunities, and startup collaborations.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(230, 126, 34, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopyEmail}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-burnt-orange hover:bg-burnt-orange/90 text-white font-heading font-bold rounded-lg transition-all duration-300"
              >
                {copiedEmail ? (
                  <>
                    <Check size={20} />
                    Email Copied!
                  </>
                ) : (
                  <>
                    <Copy size={20} />
                    Copy Email
                  </>
                )}
              </motion.button>
              <motion.a
                href="mailto:sriyamini659@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-burnt-orange/10 hover:bg-burnt-orange/20 text-burnt-orange border border-burnt-orange/30 font-heading font-bold rounded-lg transition-all duration-300"
              >
                <Mail size={20} />
                Send Email
              </motion.a>
            </motion.div>

            {/* Resume Download */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-secondary/10 hover:bg-secondary/20 text-secondary border border-secondary/30 font-paragraph font-medium rounded-lg transition-all duration-300"
            >
              <Download size={18} />
              Download Resume
            </motion.button>
          </motion.div>

          {/* Right Side - Contact Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {contactCards.map((card) => (
              <motion.a
                key={card.id}
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ y: -8, boxShadow: '0 0 30px rgba(230, 126, 34, 0.3)' }}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.color} border border-burnt-orange/20 p-6 md:p-8 backdrop-blur-sm hover:border-burnt-orange/50 transition-all duration-300 cursor-pointer`}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-burnt-orange/0 to-burnt-orange/0 group-hover:from-burnt-orange/10 group-hover:to-burnt-orange/5 transition-all duration-300" />

                {/* Content */}
                <div className="relative z-10 space-y-4">
                  <div className="text-burnt-orange group-hover:scale-110 transition-transform duration-300">
                    {card.icon}
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-heading font-bold text-white mb-1">
                      {card.title}
                    </h4>
                    <p className="text-sm md:text-base text-foreground font-paragraph break-all">
                      {card.value}
                    </p>
                  </div>
                </div>

                {/* Hover border animation */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-burnt-orange/30 transition-all duration-300" />
              </motion.a>
            ))}

            {/* Professional Instagram Card */}
            <motion.a
              href="https://instagram.com/ms.satyabhama"
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ y: -8, boxShadow: '0 0 30px rgba(230, 126, 34, 0.3)' }}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-burnt-orange/20 p-6 md:p-8 backdrop-blur-sm hover:border-burnt-orange/50 transition-all duration-300 cursor-pointer sm:col-span-2"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-burnt-orange/0 to-burnt-orange/0 group-hover:from-burnt-orange/10 group-hover:to-burnt-orange/5 transition-all duration-300" />

              {/* Content */}
              <div className="relative z-10 space-y-4">
                <div className="text-burnt-orange group-hover:scale-110 transition-transform duration-300">
                  <Instagram size={32} />
                </div>
                <div>
                  <h4 className="text-lg md:text-xl font-heading font-bold text-white mb-1">
                    Professional Instagram
                  </h4>
                  <p className="text-sm md:text-base text-foreground font-paragraph">
                    ms.satyabhama
                  </p>
                </div>
              </div>

              {/* Hover border animation */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-burnt-orange/30 transition-all duration-300" />
            </motion.a>
          </motion.div>
        </div>

        {/* Social Links Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 pt-16 border-t border-burnt-orange/20"
        >
          <div className="text-center">
            <p className="text-foreground font-paragraph mb-6">
              Connect with me on your preferred platform
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {contactCards.map((card) => (
                <motion.a
                  key={card.id}
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, color: '#E67E22' }}
                  className="text-foreground hover:text-burnt-orange transition-colors duration-300"
                >
                  {card.icon}
                </motion.a>
              ))}
              <motion.a
                href="https://instagram.com/ms.satyabhama"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: '#E67E22' }}
                className="text-foreground hover:text-burnt-orange transition-colors duration-300"
              >
                <Instagram size={32} />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
