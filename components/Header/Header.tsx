import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import { useEffect, useState } from 'react';
import cookies from 'js-cookie'
import { useRouter } from 'next/router';

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

  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = cookies.get('jwt_token');
    setIsLoggedIn(!!token);
  }, []);

  const logout = () => {
    cookies.remove('jwt_token')
    router.push("/");
  };

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
    </div>
  );
}

export default Header;