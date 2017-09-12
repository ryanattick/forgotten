// React
import React from 'react';

// Material UI
import { Card, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

// Styling
import styles from '../../../styles/about.css';

const About = (props) => {
  return (
    <div>
      <Card>
        <CardHeader className={styles.about_header}>
          <img src='assets/NRresized2.png'></img>
          <div className={styles.about_header_title}>Ninja Rabbits</div>
          <div className={styles.about_header_subtitle}>presents</div>
        </CardHeader>
        <CardMedia
          mediaStyle={{display: 'flex',
            'flexDirection': 'column',
            'justifyContent': 'center'}}>
          <div className={styles.about_inner_body}>
            <div className={styles.about_inner_body_title}>FORGOTTEN</div>
            <div className={styles.about_inner_body_description}>Forgotten is a logic-centered game in which you must solve puzzles and riddles to progress through levels of increasing difficulty. You must complete logic tasks that correspond to the trajectory of the storyline in order to unfold the mystery behind Forgotten.</div>
          </div>
          <img id={styles.about_inner_img} src='assets/creepy_dark_basement.jpg' alt="" />
        </CardMedia>
      </Card>
    </div>
  );
};

export default About;
