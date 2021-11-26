import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Develop Enterprise Applications',
    image: '/img/app-presentation-01-image-04.png',
    description: (
      <>
        Develop fully featured enterprise applications with a ready-to use
        form framework, reports, and lists.
      </>
    ),
  },
  {
    title: 'Integrate APIs & Data',
    image: '/img/app-presentation-01-image-03.png',
    description: (
      <>
        Connect APIs of different types and systems. Map, transform, enrich 
        and analyze data streams.
      </>
    ),
  },
  {
    title: 'Manage Workflows',
    image: '/img/app-presentation-01-image-02.png',
    description: (
      <>
        Design and discuss BPMN workflows and directly connect them with data 
        pipelines and apps.
      </>
    ),
  },
];

function Feature({image, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img src={image}/>
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
