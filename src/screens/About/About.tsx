import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Wrapper } from "../../components";
import avatarImage from "../../assets/images/creator_avatar.jpeg";
import "./styles.scss";
const About: React.FC = () => {
  return (
    <div className="profile">
      <img src={avatarImage} alt="" className="profile-image" />
      <h1 className="profile-text">Hi I am Dimitar Sabev</h1>
      <h2 className="profile-text">The creator of this awesome pokemon app</h2>
      <h4 className="profile-text">This project is created by me</h4>
      <div className="profile-links">
        <a href="https://github.com/dimitarsabev00" target="_blank">
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/dimitarsabev00/" target="_blank">
          <FaLinkedin />
        </a>
      </div>
    </div>
  );
};

export default Wrapper(About);
