const paragraphs = [
  "Studio for Eclectic Architecture is a dynamic firm offering various design solutions. Our core services encompass architecture, interiors, and landscape, ensuring a comprehensive approach to every project we undertake. We specialize in creating unique designs for residential homes, commercial spaces, villas, apartments, layouts, and resorts, providing tailored solutions that reflect functionality and aesthetic appeal.",
  "At Studio for Eclectic Architecture, we blend creativity with practicality, using cutting-edge techniques to bring visionary concepts to life. Our expertise extends to planning and Building Information Modeling (BIM) services, ensuring that every stage of development is meticulously mapped out for efficiency and precision. Whether you’re looking for sustainable designs, innovative interiors, or striking landscapes, we have the experience and creativity to meet your needs.",
];

export default function HistoryText() {
  return (
    <div className="history-text">
      <h1 className="history-heading">
        <span className="history-heading-line"><span>WHERE IT ALL BEGAN</span></span>
      </h1>
      <div className="history-paragraphs">
        {paragraphs.map((text) => <p className="history-paragraph" key={text.slice(0, 24)}>{text}</p>)}
      </div>
    </div>
  );
}
