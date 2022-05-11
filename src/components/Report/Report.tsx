import { FC } from "react";

import { GrClose } from "react-icons/gr";

interface IReport {
  file: any;
}

const Report: FC<IReport> = ({ file }) => {
  return (
    <div className="card">
      <div
        className="create-close-btn"
        onClick={() =>
          document.getElementById("report-modal")?.classList.remove("isOpen")
        }
      >
        <GrClose color="black" />
      </div>
      <form
        encType="multipart/form-data"
        className="create-form"
        action="https://formsubmit.co/caketechco@gmail.com"
        method="post"
      >
        <input type="hidden" name="_next" value="http://localhost:3000/main" />
        <input type="hidden" name="_captcha" value="false" />
        <div className="card-input-wrapper">
          <div className="card-input-title">Your File : </div>
          <input type="file" name="attachment" accept="application/pdf" />
        </div>
        <div className="card-input-wrapper">
          <input
            type="text"
            name="text"
            className="card-input description"
            placeholder="If you want to explain your self please write here."
          />
        </div>
        <button type="submit" className="card-btn" style={{ width: "100%" }}>
          If you think your note is valid, click here and send us a mail.
        </button>
      </form>
    </div>
  );
};

export default Report;
