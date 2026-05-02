import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const workItems = [
  {
    number: "01",
    title: "Enterprise GenAI RAG Copilot",
    category: "AI & Data Science",
    tools: "LLaMA-3, RAG, Vector Databases",
    image: "/images/feedback.webp",
    alt: "Enterprise GenAI Copilot project",
  },
  {
    number: "02",
    title: "Multi-Modal Fake News Detection",
    category: "Machine Learning",
    tools: "Transformer NLP, CNN, Explainable AI",
    image: "/images/ecommerce.webp",
    alt: "Fake News Detection project",
  },
  {
    number: "03",
    title: "Hospital Management System",
    category: "Web Development",
    tools: "Python, Django, Database",
    image: "/images/weather.jpeg",
    alt: "Hospital Management project",
  },
];

const Work = () => {
  useGSAP(() => {
  let translateX: number = 0;

  function setTranslateX() {
    const box = document.getElementsByClassName("work-box");
    const rectLeft = document
      .querySelector(".work-container")!
      .getBoundingClientRect().left;
    const rect = box[0].getBoundingClientRect();
    const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
    let padding: number =
      parseInt(window.getComputedStyle(box[0]).padding) / 2;
    translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
  }

  setTranslateX();

  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".work-section",
      start: "top top",
      end: `+=${translateX}`, // Use actual scroll width
      scrub: true,
      pin: true,
      id: "work",
    },
  });

  timeline.to(".work-flex", {
    x: -translateX,
    ease: "none",
  });

  // Clean up (optional, good practice)
  return () => {
    timeline.kill();
    ScrollTrigger.getById("work")?.kill();
  };
}, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {workItems.map((item) => (
            <div className="work-box" key={item.number}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{item.number}</h3>

                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{item.tools}</p>
              </div>
              <WorkImage image={item.image} alt={item.alt} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
