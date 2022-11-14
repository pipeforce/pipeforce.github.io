import React from 'react';
import Link from '@docusaurus/Link';
import DocPage from "@theme-original/DocPage";
import CookieConsent from "react-cookie-consent";
import styles from "./DocsLayout.module.css"

export default function TwoColDocItem(props) {
  return (
    <>
      <CookieConsent
        location="bottom"
        buttonText="Accept All"
        cookieName="pipeLogaCookie"
        className={styles.cookieConsent}
        buttonClasses={styles.buttonStyle}
        expires={150}
        style={{
          alignItems: "center"
        }}
      >
        <h3 className={styles.cookieHeader}>This site uses cookies.</h3>
        <p className={styles.cookieContent}>We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. <Link to="/terms">Read More</Link></p>
      </CookieConsent>
      <DocPage {...props} />
    </>
  );
}