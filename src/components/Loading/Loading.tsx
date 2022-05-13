import { FC } from "react";
import "./Loading.styles.css";

interface ILoading {
  text?: string;
}

const Loading: FC<ILoading> = ({ text }) => {
  return (
    <div className="loading-card">
      <div className="loading-dots">
        <div className="loading-dot" />
        <div className="loading-dot" />
        <div className="loading-dot" />
      </div>
      <div>{text}</div>
    </div>
  );
};

export default Loading;
