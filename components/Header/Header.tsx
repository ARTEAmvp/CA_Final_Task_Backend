import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import Image from 'next/image';

type HeaderProps = {
  logo: string;
  links: LinkType[];
}

type LinkType = {
  id: number;
  title: string;
  href: string;
}

const Header = ({ logo, links }: HeaderProps) => {
  return (
    <div className={styles.main}>
      <Link href="/" className={styles.logo} style={{ textDecoration: 'none' }}>
        <img src={logo} alt="Logo" className={styles.logoImage} />
      </Link>

      <nav>
        <ul className={styles.links}>
          {links.map((link) => (
            <li key={link.id}>
              <Link href={link.href} className={styles.link}>
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Header;