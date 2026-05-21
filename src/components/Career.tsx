import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          Education <span>&</span>
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
              Bachelor of Engineering in Computer Engineering.
              <br />
              Ahmedabad, Gujarat
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Certificates</h4>
                <h5>Learning & Development</h5>
              </div>
              <h3>3 Courses</h3>
            </div>
            <p>
              DBMS Course - Master the Fundamentals and Advanced Concepts
              <br />
              Exploratory Data Analysis for Machine Learning
              <br />
              Inheritance and Data Structures in Java
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
