import { GrMail, GrLinkedin, GrGithub } from "react-icons/gr";

import "./Contact.styles.css";

const Contact = () => {
  return (
    <div
      className="contact-container"
      style={{
        backgroundImage: "linear-gradient(to bottom, #E69B69, #FFFFFF)",
      }}
    >
      <p className="title">Meet the minds behind Notebase</p>
      <div className="team-wrapper">
        <ul className="team-list">
          <li className="team-list-item">
            <div className="member-profile-pic">
              <img
                src={require("../../assets/emre.JPG")}
                alt="Emre"
                className="profile-pic"
              />
            </div>
            <p>
              <strong>Emre Uzun</strong>
            </p>
            <p>Frontend Developer</p>
            <p>Tester</p>
            <div className="item-contacts">
              <a href="mailto:uzun.emre1@outlook.com">
                <GrMail size={24} />
              </a>
              <a href="https://www.linkedin.com/in/emreuzun1/">
                <GrLinkedin size={24} />
              </a>
              <a href="https://github.com/emreuzun1">
                <GrGithub size={24} />
              </a>
            </div>
          </li>
          <li className="team-list-item">
            <div className="member-profile-pic"></div>
            <p>
              <strong>Ataberk Çeliktaş</strong>
            </p>
            <p>Project Management</p>
            <p>Backend Developer</p>
            <div className="item-contacts">
              <a href="mailto:ataberkceliktas97@hotmail.com">
                <GrMail size={24} />
              </a>
              <a href="https://www.linkedin.com/in/ataberk-%C3%A7elikta%C5%9F-7401991ab/">
                <GrLinkedin size={24} />
              </a>
              <a href="https://github.com/AtaberkCeliktas">
                <GrGithub size={24} />
              </a>
            </div>
          </li>
          <li className="team-list-item">
            <div className="member-profile-pic"></div>
            <p>
              <strong>Aynur Cemre Aka</strong>
            </p>
            <p>Artifical Intelligence</p>
            <div className="item-contacts">
              <a href="mailto:cemreaka@gmail.com">
                <GrMail size={24} />
              </a>
              <a href="https://www.linkedin.com/in/aynur-cemre-aka-15a79862/">
                <GrLinkedin size={24} />
              </a>
              <a href="https://github.com/cemreaka">
                <GrGithub size={24} />
              </a>
            </div>
          </li>
          <li className="team-list-item">
            <div className="member-profile-pic"></div>
            <p>
              <strong>Keremalp Durdabak</strong>
            </p>
            <p>Backend Developer</p>
            <div className="item-contacts">
              <a href="mailto:keremalp.durdabak@gmail.com">
                <GrMail size={24} />
              </a>
              <a href="https://www.linkedin.com/in/keremalpdurdabak/">
                <GrLinkedin size={24} />
              </a>
              <a href="https://github.com/KeremalpDurdabak">
                <GrGithub size={24} />
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;
