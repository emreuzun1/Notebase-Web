import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { IoMdSchool } from "react-icons/io";
import { IoPencil } from "react-icons/io5";
import { BsFillCalendarDateFill } from "react-icons/bs";
import "./Documentation.styles.css";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

import { State } from "../../Interfaces/State";
import { Document as DocumentInterface } from "../../Interfaces/Document";

export const Documentation = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const { student } = useSelector((state: State) => state.auth);
  const [documentation, setDocumentation] = useState<DocumentInterface>();
  const { id } = useParams();

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
  }

  const getPages = () => {
    for (var i = 0; i < numPages!; i++) {
      return <Page pageNumber={i} height={250} />;
    }
  };

  React.useEffect(() => {
    axios(`https://notebase-api.herokuapp.com/api/document/get/${id}`, {
      headers: {
        Authorization: `Token ${student?.token}`,
      },
    }).then((res) => setDocumentation(res.data));
    console.log(documentation);
  }, []);

  return (
    <div className="doc-container">
      <div className="doc-top-container">
        <div>
          <p className="doc-title">{documentation?.title}</p>
          <div className="doc-detail-container">
            <IoMdSchool size={36} />
            <p className="doc-detail-text">
              {documentation?.department}{" "}
              <span>({documentation?.university})</span>
            </p>
          </div>
          <div className="doc-detail-container">
            <IoPencil size={36} />
          </div>
          <div className="doc-detail-container">
            <BsFillCalendarDateFill size={36} />
            <p className="doc-detail-text">{documentation?.date}</p>
          </div>
        </div>
        <div className="doc-pdf-container">
          <Document
            file={documentation?.file}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {[...Array(pageNumber)].map((v) => (
              <Page pageNumber={1} height={250} />
            ))}
          </Document>
        </div>
      </div>
      <div className="doc-description-container">
        <p className="doc-description-title">Description</p>
        <p className="doc-description-text">{documentation?.description}</p>
      </div>
    </div>
  );
};
