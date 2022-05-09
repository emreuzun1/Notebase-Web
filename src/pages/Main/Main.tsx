import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AiFillLike, AiFillDislike, AiFillFolder } from "react-icons/ai";
import { MdReportProblem } from "react-icons/md";
import { GrRefresh } from "react-icons/gr";
import { Link } from "react-router-dom";

import { Document } from "../../Interfaces/Document";
import { State } from "../../Interfaces/State";
import { getAllDocumentsApi } from "../../lib/api";
import styles from "./Main.module.css";
import { Create } from "../../components/Create/Create";

export const Main = () => {
  const { student } = useSelector((state: State) => state.auth);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [data, setData] = useState<Document[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");

  const getDocuments = async () => {
    await getAllDocumentsApi(student?.token!).then((res) => {
      setDocuments(res.data);
      setData(res.data);
    });
  };

  const createDocument = () => {
    const element = document.getElementById("modal");
    element?.classList.add("isOpen");
  };

  useEffect(() => {
    getDocuments();
  }, []);

  const searchDocuments = () => {
    let filteredData = documents;
    if (searchInput.length >= 3) {
      filteredData = data.filter((document: Document) => {
        if (document.title.includes(searchInput)) {
          return true;
        }
        if (document.description.includes(searchInput)) {
          return true;
        }
      });
    }
    setData(filteredData);
  };

  return (
    <div className={styles.app}>
      <div className={styles.body}>
        <div className={styles.sidebar}>
          <div className={styles.create_btn_wrapper} id="create-btn">
            <button className={styles.create_btn} onClick={createDocument}>
              Create Note
            </button>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.toolbar}>
            <input
              type="text"
              placeholder="Search"
              value={searchInput}
              className={styles.input}
              onChange={(e) => {
                setSearchInput(e.target.value);
                searchDocuments();
              }}
            />
            <button
              className={styles.searchBtn}
              onClick={() => {
                setData(documents);
              }}
            >
              <GrRefresh size={24} />
            </button>
          </div>
          <div className={styles.note_content}>
            <ul className={styles.list}>
              {data.map((document: Document) => (
                <Link to={`${document.id}`} key={document.id}>
                  <li className={styles.listItem}>
                    <img src={require("../../assets/logo.png")} alt="Logo" />
                    <div className={styles.listItemDetail}>
                      <div>
                        <p>{document.title}</p>
                        <div style={{ display: "flex" }}>
                          <p>{document.department}</p>
                          <p style={{ marginLeft: 8 }}>
                            ({document.university})
                          </p>
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
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="modalView" id="modal">
        <Create />
      </div>
    </div>
  );
};
