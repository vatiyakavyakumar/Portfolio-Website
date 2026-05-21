import { useCallback, useEffect, useRef, useState } from "react";
import "./styles/Work.css";
import { FaJava, FaDatabase, FaHtml5, FaCss3Alt, FaJs, FaPython, FaBrain, FaServer, FaCode } from "react-icons/fa6";
import { SiMongodb } from "react-icons/si";

const workItems = [
  {
    number: "01",
    title: "Share Market Portfolio Analysis",
    category: "Java Advanced + MySQL",
    year: "2024",
    tags: [
      { name: "Java", icon: <FaJava /> },
      { name: "MySQL", icon: <FaDatabase /> },
      { name: "OOP", icon: <FaCode /> },
      { name: "Backend", icon: <FaServer /> }
    ],
    description:
      "A backend-driven stock market analysis system using Advanced Java and MySQL to store, retrieve, and analyze large volumes of stock data with real-time insights.",
    link: "#",
  },
  {
    number: "02",
    title: "Grocery Store Website",
    category: "Full Stack Web App",
    year: "2024",
    tags: [
      { name: "HTML", icon: <FaHtml5 /> },
      { name: "CSS", icon: <FaCss3Alt /> },
      { name: "JavaScript", icon: <FaJs /> },
      { name: "MongoDB", icon: <SiMongodb /> }
    ],
    description:
      "A full-stack grocery shopping website with an interactive responsive UI and MongoDB for secure, scalable product and order data management.",
    link: "#",
  },
  {
    number: "03",
    title: "Smart Bakery Management",
    category: "ML + Full Stack",
    year: "2025",
    tags: [
      { name: "Python", icon: <FaPython /> },
      { name: "MongoDB", icon: <SiMongodb /> },
      { name: "ML", icon: <FaBrain /> },
      { name: "JavaScript", icon: <FaJs /> }
    ],
    description:
      "A full-stack bakery app with an integrated machine learning model for real-time delivery predictions, personalized discounts, and smart notifications.",
    link: "#",
  },
];

const CARD_COUNT = workItems.length;

/** Returns relative position of card i to active: -1 (left), 0 (active), 1 (right), etc. */
function getOffset(i: number, active: number, total: number): number {
  let diff = ((i - active) + total) % total;
  if (diff > Math.floor(total / 2)) diff -= total;
  return diff;
}

function cardTransform(offset: number) {
  if (offset === 0) {
    return {
      transform: "translateX(0px) rotateY(0deg) translateZ(0px)",
      opacity: 1,
      zIndex: 10,
      pointerEvents: "auto" as const,
    };
  }
  if (offset === 1 || offset === -1) {
    const dir = offset > 0 ? 1 : -1;
    return {
      transform: `translateX(${dir * 340}px) rotateY(${-dir * 30}deg) translateZ(-90px)`,
      opacity: 0.5,
      zIndex: 5,
      pointerEvents: "auto" as const,
    };
  }
  // hidden cards (more than 1 away)
  const dir = offset > 0 ? 1 : -1;
  return {
    transform: `translateX(${dir * 680}px) rotateY(${-dir * 50}deg) translateZ(-200px)`,
    opacity: 0,
    zIndex: 0,
    pointerEvents: "none" as const,
  };
}

const Work = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);   // always holds latest value
  const sectionRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  // Stable goTo — reads from ref, not from stale closure
  const goTo = useCallback((next: number) => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    activeIndexRef.current = next;
    setActiveIndex(next);
    setTimeout(() => { isAnimating.current = false; }, 800);
  }, []);

  const goNext = useCallback(() =>
    goTo((activeIndexRef.current + 1) % CARD_COUNT), [goTo]);
  const goPrev = useCallback(() =>
    goTo((activeIndexRef.current - 1 + CARD_COUNT) % CARD_COUNT), [goTo]);

  // Register wheel listener ONCE — no stale closure because we use refs
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const handleWheel = (e: WheelEvent) => {
      // Only intercept horizontal scroll (trackpad swipe left/right)
      // Let vertical up/down scroll pass through to scroll the page normally
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);
      if (absX > absY && absX > 8) {
        e.preventDefault();
        if (e.deltaX > 0) goNext();
        else goPrev();
      }
      // vertical scroll → page scrolls naturally (no preventDefault)
    };
    section.addEventListener("wheel", handleWheel, { passive: false });
    return () => section.removeEventListener("wheel", handleWheel);
  }, [goNext, goPrev]);

  // touch swipe
  const touchX = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 40) dx > 0 ? goNext() : goPrev();
  };

  return (
    <div
      className="work-section"
      id="work"
      ref={sectionRef}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Ambient glows */}
      <div className="work-glow work-glow--a" />
      <div className="work-glow work-glow--b" />

      {/* Heading */}
      <div className="work-header">
        <h2>My <span>Work</span></h2>
        <p className="work-hint">
          <span>←</span> scroll to explore <span>→</span>
        </p>
      </div>

      {/* Coverflow Stage */}
      <div className="work-stage">
        {workItems.map((item, i) => {
          const offset = getOffset(i, activeIndex, CARD_COUNT);
          const style = cardTransform(offset);
          return (
            <div
              key={item.number}
              className={`work-card ${offset === 0 ? "work-card--active" : ""}`}
              style={style}
              onClick={() => offset !== 0 && goTo(i)}
            >
              {/* Top glow accent */}
              <div className="work-card-accent" />

              {/* Number badge */}
              <span className="work-card-num">{item.number}</span>

              {/* Title first */}
              <h3 className="work-card-title">{item.title}</h3>

              {/* Category below title */}
              <p className="work-card-category">{item.category}</p>

              {/* Tech tags / Language icons */}
              <div className="work-card-tags">
                {item.tags.map((tag) => (
                  <span className="work-card-tag" key={tag.name}>
                    {tag.icon} {tag.name}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="work-card-desc">{item.description}</p>

              {/* Live Project Button */}
              <a
                href={item.link}
                className="work-card-btn"
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="work-card-btn-dot" />
                Live Project
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="work-nav">
        <button className="work-nav-btn" onClick={goPrev} aria-label="Previous project">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="work-dots">
          {workItems.map((_, i) => (
            <button
              key={i}
              className={`work-dot ${i === activeIndex ? "work-dot--active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Project ${i + 1}`}
            />
          ))}
        </div>
        <button className="work-nav-btn" onClick={goNext} aria-label="Next project">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Work;
