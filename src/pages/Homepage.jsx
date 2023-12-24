import "../style/Homepage.css";
import React from "react";
import Slider from "../components/Slider";
import { MdLocalShipping } from "react-icons/md";

const Homepage = () => {
  return (
    <div>
      <label className="form1">
        <h5 className="text">
          Free Holiday Shipping & Extended Holiday Returns{" "}
          <MdLocalShipping className="icon" />
        </h5>
      </label>
      <div className="Slider">
        <Slider />
      </div>

      <div className="video-container">
        <div className="video-text-container">
          <p className="video-text">
            <h1>TECHUICK</h1>{" "}
            <h4>
              is my final project as a full-stack developer student at
              APPLESEEDS. Transforming from zero coding knowledge to a
              proficient developer, I've created a feature-rich PC hardware
              store. This project showcases my dedication to learning,
              implementing, and mastering various technologies. From dynamic
              product displays to user authentication, I've incorporated
              cutting-edge features, pushing my coding abilities. As I navigate
              this journey from novice to proficient coder, TechuicK stands as a
              testament to my growth and commitment. Moving forward, I aspire to
              gain more hands-on experience and elevate my skills, aspiring to
              become an expert in the vast realm of coding.
            </h4>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
