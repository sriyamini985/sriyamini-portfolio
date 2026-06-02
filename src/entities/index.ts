/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: achievements
 * Interface for Achievements
 */
export interface Achievements {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType date */
  date?: Date | string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  certificateImage?: string;
  /** @wixFieldType text */
  issuer?: string;
  /** @wixFieldType url */
  verificationUrl?: string;
}


/**
 * Collection ID: experience
 * Interface for Experience
 */
export interface Experience {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  roleTitle?: string;
  /** @wixFieldType text */
  companyName?: string;
  /** @wixFieldType text */
  timeline?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  companyLogo?: string;
  /** @wixFieldType text */
  location?: string;
  /** @wixFieldType url */
  companyWebsite?: string;
}


/**
 * Collection ID: projects
 * Interface for Projects
 */
export interface Projects {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  projectTitle?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  role?: string;
  /** @wixFieldType text */
  techStack?: string;
  /** @wixFieldType text */
  status?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  previewImage?: string;
  /** @wixFieldType url */
  projectUrl?: string;
}


/**
 * Collection ID: skills
 * Interface for Skills
 */
export interface Skills {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  skillName?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  icon?: string;
  /** @wixFieldType text */
  proficiencyLevel?: string;
  /** @wixFieldType number */
  yearsOfExperience?: number;
  /** @wixFieldType boolean */
  isCoreSkill?: boolean;
}
