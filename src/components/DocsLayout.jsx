import React from 'react';
import DocPage from "@theme-original/DocPage";
import CookieConsent from "react-cookie-consent";
import styles from "./DocsLayout.module.css"

export default function TwoColDocItem(props) {
  return (
    <>
      <CookieConsent
        location="bottom"
        buttonText="Agree!!"
        cookieName="pipeLogaCookie"
        className={styles.cookieConsent}
        buttonClasses={styles.buttonStyle}
        expires={150}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
      <DocPage {...props} />
    </>
  );
}