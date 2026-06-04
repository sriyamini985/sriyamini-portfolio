import { motion } from 'framer-motion';
import { ArrowUp, Github, Instagram, Linkedin, Mail } from 'lucide-react';

export default function PremiumFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <footer className="w-full bg-black border-t border-burnt-orange/20 py-16 px-4 md:px-8 lg:px-12">
      <div className="max-w-[100rem] mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Brand Section */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-white">
                Sriyamini Reddy
              </h3>
              <p className="text-burnt-orange font-heading font-semibold text-sm md:text-base">
                Web Developer • Founder • Creative Builder
              </p>
              <p className="text-foreground font-paragraph text-sm md:text-base leading-relaxed">
                Building digital experiences, communities, and ideas that create impact.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h4 className="text-lg font-heading font-bold text-white">Quick Links</h4>
              <ul className="space-y-2">
                {[
                  { label: 'Home', href: '#' },
                  { label: 'Projects', href: '#projects' },
                  { label: 'Experience', href: '#experience' },
                  { label: 'Skills', href: '#skills' },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-foreground hover:text-burnt-orange font-paragraph text-sm transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h4 className="text-lg font-heading font-bold text-white">Connect</h4>
              <div className="flex gap-4">
                {[
                  { icon: Mail, link: 'mailto:sriyamini659@gmail.com', label: 'Email' },
                  { icon: Linkedin, link: 'https://www.linkedin.com/in/sriyamini-reddy985098', label: 'LinkedIn' },
                  { icon: Github, link: 'https://github.com/sriyamini985', label: 'GitHub' },
                  { icon: Instagram, link: 'https://instagram.com/_its__yamz', label: 'Instagram' },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, color: '#E67E22' }}
                    className="text-foreground hover:text-burnt-orange transition-colors duration-300"
                  >
                    <social.icon size={24} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="h-px bg-gradient-to-r from-transparent via-burnt-orange/30 to-transparent"
          />

          {/* Bottom Section */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row justify-between items-center gap-6"
          >
            <p className="text-foreground font-paragraph text-sm text-center md:text-left">
              © 2024 Sriyamini Reddy. All rights reserved. | Crafted with passion and code.
            </p>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(230, 126, 34, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-burnt-orange/10 hover:bg-burnt-orange/20 text-burnt-orange border border-burnt-orange/30 rounded-lg transition-all duration-300 font-paragraph font-medium text-sm"
            >
              <ArrowUp size={18} />
              Back to Top
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
