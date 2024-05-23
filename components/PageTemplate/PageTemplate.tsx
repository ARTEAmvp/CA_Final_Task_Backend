import React, { ReactNode } from "react";
import Header from "../Header/Header";
import { footerLinks, socialLinks } from "../../constants/footerLinks";
import { links } from "../../constants/navLinks";
import Footer from "../Footer/Footer";
import styles from "./PageTemplate.module.css";

type PageTemplateProps = {
  children: ReactNode;
};

const PageTemplate = ({ children }: PageTemplateProps) => {
  return (
    <div className={styles.wrapper}>
      <Header logo={"https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e0af229af9419a75084_MindfulnessDark.svg"} links={links} />
      <div className={styles.main}>{children}</div>
      <Footer socialLinks={socialLinks} footerLinks={footerLinks}/>
    </div>
  );
};

export default PageTemplate;