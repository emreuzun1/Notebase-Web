import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoMdSchool } from "react-icons/io";
import { IoPencil } from "react-icons/io5";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

import "./Documentation.styles.css";
import { State } from "../../Interfaces/State";
import { Document as DocumentInterface } from "../../Interfaces/Document";
import {
  createDownloadApi,
  getDocumentApi,
  getDownloadsApi,
} from "../../lib/api";

interface Download {
  id: string;
  has_liked: boolean;
  has_disliked: boolean;
  has_reported: boolean;
  date: string;
  user: string;
  document: string;
}

export const Documentation = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pages, setPages] = useState<any>([]);
  const { student } = useSelector((state: State) => state.auth);
  const [documentation, setDocumentation] = useState<DocumentInterface>();
  const [isTaken, setIsTaken] = useState<boolean>(false);
  const [downloaded, setDownloaded] = useState<Download>();
  const { id } = useParams();

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
    setPages(new Array(numPages));
  }

  const takeCourse = async () => {
    createDownloadApi(
      student!.user.id,
      student?.token!,
      documentation!.id!
    ).then((res) => {
      console.log(res);
    });
  };

  const checkIsTaken = async () => {
    await getDownloadsApi(student!.token).then((res) => {
      res.data.map((download: Download) => {
        if (download.document === id && download.user === student!.user.id) {
          setIsTaken(true);
          setDownloaded(download);
        }
      });
    });
  };

  const getDocument = async () => {
    await getDocumentApi(id!, student?.token!).then((res) => {
      setDocumentation(res.data);
    });
  };

  React.useEffect(() => {
    getDocument();
    checkIsTaken();
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
          <button className="doc-btn-container" onClick={takeCourse}>
            {!isTaken ? (
              <p className="doc-btn-text">Take course</p>
            ) : (
              <p className="doc-btn-text">Show PDF</p>
            )}
          </button>
        </div>
        <div className="doc-pdf-container">
          <Document
            file={documentation?.file}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={1} height={250} />
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
