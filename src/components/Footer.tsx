import { motion } from 'framer-motion';
import { Github, Heart, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const footerLinks = [
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Achievements', id: 'achievements' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <footer className="bg-deep-charcoal border-t border-primary/10">
      <div className="container mx-auto px-6 lg:px-12 max-w-[100rem] py-12">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="font-heading text-3xl font-bold text-foreground"
            >
              Sriyamini<span className="text-primary">.</span>
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-foreground/70 leading-relaxed"
            >
              Web Developer | Founder | Creative Builder
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-foreground/60 text-sm"
            >
              Building elegant digital experiences with a unique perspective.
            </motion.p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <motion.h4
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="font-heading text-xl font-semibold text-foreground"
            >
              Quick Links
            </motion.h4>
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col gap-3"
            >
              {footerLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-foreground/70 hover:text-primary transition-colors duration-300 text-left"
                >
                  {link.label}
                </button>
              ))}
            </motion.nav>
          </div>

          {/* Connect Section */}
          <div className="space-y-4">
            <motion.h4
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="font-heading text-xl font-semibold text-foreground"
            >
              Connect
            </motion.h4>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex gap-4"
            >
              <a
                href="https://github.com/sriyamini985"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-lg bg-background/50 border border-primary/20 flex items-center justify-center text-foreground/70 hover:text-primary hover:border-primary/50 transition-all duration-300 hover:scale-110"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/sriyamini-reddy985098"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-lg bg-background/50 border border-primary/20 flex items-center justify-center text-foreground/70 hover:text-primary hover:border-primary/50 transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:sriyamini659@gmail.com"
                className="w-12 h-12 rounded-lg bg-background/50 border border-primary/20 flex items-center justify-center text-foreground/70 hover:text-primary hover:border-primary/50 transition-all duration-300 hover:scale-110"
              >
                <Mail className="h-5 w-5" />
              </a>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-foreground/60 text-sm pt-4"
            >
              Open to opportunities and collaborations
            </motion.p>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-primary/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-foreground/60 text-sm text-center md:text-left">
              © {currentYear} Sriyamini Reddy. All rights reserved.
            </p>
            <p className="text-foreground/60 text-sm flex items-center gap-2">
              Crafted with <Heart className="h-4 w-4 text-primary fill-primary" /> and creativity
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
