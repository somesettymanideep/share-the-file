export const historySlides = [
  { title: "OUR HISTORY", text: "Studio for Eclectic Architecture is a dynamic firm offering various design solutions. Our core services encompass architecture, interiors, and landscape, ensuring a comprehensive approach to every project we undertake. We specialize in creating unique designs for residential homes, commercial spaces, villas, apartments, layouts, and resorts, providing tailored solutions that reflect functionality and aesthetic appeal." },
  { title: "CREATIVITY & PRECISION", text: "At Studio for Eclectic Architecture, we blend creativity with practicality, using cutting-edge techniques to bring visionary concepts to life. Our expertise extends to planning and Building Information Modeling (BIM) services, ensuring that every stage of development is meticulously mapped out for efficiency and precision. Whether you’re looking for sustainable designs, innovative interiors, or striking landscapes, we have the experience and creativity to meet your needs." },
  { title: "SPACES THAT ENDURE", text: "Our team works closely with clients, offering personalized solutions that reflect their vision while maintaining harmony with the environment and local context. From small-scale residences to expansive resorts, our approach to architecture is driven by versatility, innovation, and a passion for timeless design. At Studio for Eclectic Architecture, we don’t just build structures—we create spaces that inspire and endure." },
];

export default function HistoryText() {
  return (
    <>
      {historySlides.map((slide, i) => (
        <div className="history-slide history-text-slide" key={slide.title}>
          <span className="history-slide-number" aria-hidden="true">0{i + 1}</span>
          <div className="history-slide-body">
            <span className="history-slide-count">0{i + 1} / 0{historySlides.length}</span>
            {i === 0 ? (
              <h1 className="history-heading"><span className="history-heading-line"><span>{slide.title}</span></span></h1>
            ) : (
              <h2 className="history-heading"><span className="history-heading-line"><span>{slide.title}</span></span></h2>
            )}
            <p className="history-paragraph">{slide.text}</p>
          </div>
        </div>
      ))}
    </>
  );
}
