import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Automate Processes',
    image: '/img/app-presentation-01-image-02.png',
    description: (
      <>
       Digitize, automate and optimize business processes. PIPEFORCE comes with triggers, jobs, workflows, built-in dashboards and <a href="/docs/commands_pipelines">more...</a>
      </>
    ),
  },
  {
    title: 'Integrate Data',
    image: '/img/app-presentation-01-image-03.png',
    description: (
      <>
        Connect systems and exchange data. PIPEFORCE comes with connectors, messaging queues, data transformation, data mapping and <a href="/docs/guides/transformers/basics">more...</a> 
      </>
    ),
  },
  {
    title: 'Develop Applications',
    image: '/img/app-presentation-01-image-04.png',
    description: (
      <>
        Develop applications and share them on the marketplace. PIPEFORCE comes with forms, lists, key-value store, monitoring and <a href="/docs/apps">more...</a>
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
