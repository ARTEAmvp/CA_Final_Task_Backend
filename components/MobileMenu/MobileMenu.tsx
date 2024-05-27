import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './MobileMenu.module.css';
import { useRouter } from 'next/router';
import cookies from 'js-cookie';
import burgerButton from '../../Icons/burgerIcon.svg'

type MobileMenuProps = {
  links: LinkType[];
};

type LinkType = {
  id: number;
  title: string;
  href: string;
};

const MobileMenu = ({ links }: MobileMenuProps) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
    const token = cookies.get('jwt_token');
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  const logout = () => {
    cookies.remove('jwt_token');
    router.push('/');
  };

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  return (
    <div className={styles.mobileMenu}>
      <button className={styles.burgerButton} onClick={toggleMenu}>
        <img src={burgerButton.src} alt="BurgerBtn" />
      </button>
      <div className={isMenuOpen ? styles.mobileMenuOpen : ''}>
      {isMenuOpen && (
        <nav className={styles.nav}>
          <ul className={styles.links}>
            {links.map((link) => (
              <li key={link.id}>
                <Link href={link.href} className={styles.link}>
                  {link.title}
                </Link>
              </li>
            ))}
            <li>
              {isLoggedIn ? (
                <a href="/" onClick={logout} className={styles.link}>
                  Logout
                </a>
              ) : (
                <Link href="/login" className={styles.link}>
                  Login
                </Link>
              )}
            </li>
          </ul>
        </nav>
      )}
    </div>
    </div>
  );
};

export default MobileMenu;