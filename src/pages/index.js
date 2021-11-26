import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container"> 
        <span className={styles.message}><b>Open</b> Platform for <b>Low Code</b> workflow <b>Automation</b> and <b>Integration</b>.</span>
        <br/><br/>
        <p className="hero__subtitle">Learn how to create Enterprise Solutions in a fraction of time.</p>
        <br/>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
           Getting Started
          </Link>
          &nbsp; &nbsp;
          <Link
            className="button button--primary-light button--lg"
            to="https://pipeforce.io/demo-vereinbaren/">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
