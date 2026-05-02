import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          Graduation <span>&</span>
          <br /> Certificate
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>LJ University</h4>
                <h5>Computer Engineering</h5>
              </div>
              <h3>2023 - Present</h3>
            </div>
            <p>
              Currently pursuing Bachelor of Engineering in Computer Engineering.
              <br />
              Sem 1: 8.50 SPI | Sem 2: 7.0 SPI | Sem 3: 9.50 SPI | Sem 4: 8.88 SPI
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>High School (HSC)</h4>
                <h5>Gujarat Board</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Completed Higher Secondary Certificate with 83%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
