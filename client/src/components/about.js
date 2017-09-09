import React from 'react';

const About = (props) => {
  return (
    <div style={{background: "url('https://images.designtrends.com/wp-content/uploads/2016/02/28130351/Full-Dark-Scary-Room-Background.jpg') no-repeat center center fixed", backgroundSize: "cover"}}>
      <h2 style={{textAlign: "center", color: "white"}}><strong>Your Mission:</strong></h2><br></br>
      <h3 style={{textAlign: "center", color: "white"}}>
        Survive.
      </h3>
      <br></br>
      <h4 style={{textAlign: "center", lineHeight: "150%", color: "white"}}>
        You wake up in a pitch black basement. Alone. You make the first move. If you have what it takes to solve each puzzle, you might make it out alive. Test your logical thinking while uncovering the mystery of your hidden past with Forgotten.
      </h4>
    </div>
  );
};

export default About;
