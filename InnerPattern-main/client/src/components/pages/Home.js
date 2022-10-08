import LandingLogo from "../../assets/mainlogo.png";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main>
      <div className="LandingContainer">
        <div className="divContainer">
          <img
            src={LandingLogo}
            className="LandingLogo"
            alt="landing page logo"
          ></img>
          <p className="LandingText">
            Welcome to InnerPattern, where we strive to understand ourselves
            better, become more mindful, and in the process modulate the thought
            patterns that are generating our suffering.{" "}
          </p>
          <div className="LandingBtn">
            <Link
              to="/SignUp"
              style={{ textDecoration: "none", color: "white" }}
            >
              Start!
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;