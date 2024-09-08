import React from "react";
import "./testimonials.css";

const Testimonials = () => {
  const testimonialsData = [
    {
      id: 1,
      name: "Saman Perera",
      position: "Student",
      message:
        "I really enjoyed the online course. I thought it was well planned and layed out, easy for me to follow.",
    },
    {
      id: 2,
      name: "Amal Peiris",
      position: "Student",
      message:
        "To be honest , this was my first online class. I am looking forward to taking more online classes. The experience of this class has being nothing but positive.",
    },
    {
      id: 3,
      name: "Dasun Samantha",
      position: "Student",
      message:
        "Overall I enjoyed the course. I liked that everything was straight forward.",
    },
    {
      id: 4,
      name: "Amith Almeida",
      position: "Student",
      message:
        "I liked being able to access info anytime of the day.",
      
    },
  ];
  return (
    <section className="testimonials">
      <h2>What our students say</h2>
      <div className="testmonials-cards">
        {testimonialsData.map((e) => (
          <div className="testimonial-card" key={e.id}>
            <p className="message">{e.message}</p>
            <div className="info">
              <p className="name">{e.name}</p>
              <p className="position">{e.position}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
