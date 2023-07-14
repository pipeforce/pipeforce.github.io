import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Integrate.',
    image: '/img/app-presentation-01-image-03.png',
    description: (
      <>
        Connect systems and data. <br/>PIPEFORCE comes with connectors, messaging queues, data pipelines and <a href="/docs/guides/transformers/basics">more...</a> 
      </>
    ),
  },
  {
    title: 'Automate.',
    image: '/img/app-presentation-01-image-02.png',
    description: (
      <>
       Digitize and automate business processes. <br/>PIPEFORCE comes with triggers, workflows, forms, lists and <a href="/docs/commands_pipelines">more...</a>
      </>
    ),
  },
  {
    title: 'Monitor.',
    image: '/img/app-presentation-01-image-04.png',
    description: (
      <>
        Monitor and analyze data. <br/>PIPEFORCE has integrated distributed tracing across services, reportings and <a href="/docs/apps">more...</a>
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
