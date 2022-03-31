import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AiFillLike, AiFillDislike, AiFillFolder } from "react-icons/ai";
import { MdReportProblem } from "react-icons/md";
import { Document } from "../../Interfaces/Document";
import { State } from "../../Interfaces/State";
import { getAllDocumentsApi } from "../../lib/api";
import styles from "./Main.module.css";

export const Main = () => {
  const { student } = useSelector((state: State) => state.auth);
  const [documents, setDocuments] = useState<Document[]>([]);

  const getDocuments = async () => {
    await getAllDocumentsApi(student?.token!).then((res) => {
      setDocuments(res.data);
    });
  };

  useEffect(() => {
    getDocuments();
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.body}>
        <div className={styles.sidebar}>
          <div className={styles.create_btn_wrapper} id="create-btn">
            <button className={styles.create_btn}>Create Note</button>
          </div>
          <div className={styles.notes_folders}>
            <div className={styles.folder}>
              <AiFillFolder size={36} color="black" />
              <p>All Notes</p>
            </div>
            <div className={styles.folder}>
              <AiFillFolder size={36} color="black" />
              <p>My Notes</p>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.toolbar}>
            <input type="text" placeholder="Search" className={styles.input} />
          </div>
          <div className={styles.note_content}>
            <ul className={styles.list}>
              {documents.map((document: Document) => (
                <li className={styles.listItem} key={document.id}>
                  <img src={require("../../assets/logo.png")} alt="Logo" />
                  <div className={styles.listItemDetail}>
                    <div>
                      <p>{document.title}</p>
                      <div style={{ display: "flex" }}>
                        <p>{document.department}</p>
                        <p style={{ marginLeft: 8 }}>({document.university})</p>
                      </div>
                    </div>
                    <div className={styles.listItemReviews}>
                      <div className={styles.reviewContainer}>
                        <AiFillLike size={24} color="black" />
                        <p>{document.like_count}</p>
                      </div>
                      <div className={styles.reviewContainer}>
                        <AiFillDislike size={24} color="black" />
                        <p>{document.like_count}</p>
                      </div>
                      <div className={styles.reviewContainer}>
                        <MdReportProblem size={24} color="black" />
                        <p>{document.like_count}</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
