import React from 'react'
import styles from './Footer.module.css'
import Link from 'next/link'

type FooterProps = {
  footerLinks: FooterLink[];
  socialLinks: FooterLink[];
}

type FooterLink = {
  id: number;
  title: string;
  href: string;
};

const Footer = ({ footerLinks, socialLinks }: FooterProps) => {
  return (
    <footer>
      <div className={styles.container}>
        <div className={styles.navLinks}>
          <ul>
            {footerLinks.map((link) => (
              <li key={link.id}>
                <Link href={link.href}>
                  <span className={styles.link}>{link.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.socialLinks}>
          <ul>
            {socialLinks.map((link) => (
              <li key={link.id}>
                <Link href={link.href}>
                  <span className={styles.link}>{link.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.copyRight}>
          <p>&copy; {new Date().getFullYear()} AskAndYouShallReceive. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
