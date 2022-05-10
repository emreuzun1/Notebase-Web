import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoMdSchool } from "react-icons/io";
import { IoPencil } from "react-icons/io5";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { BiLock } from "react-icons/bi";

import "./Documentation.styles.css";
import { State } from "../../Interfaces/State";
import { Document as DocumentInterface } from "../../Interfaces/Document";
import {
  createDownloadApi,
  getDocumentApi,
  getDownloadsApi,
  getStudentApi,
} from "../../lib/api";
import { Student } from "../../Interfaces/Student";
import Edit from "../../components/Edit/Edit";
import PdfViewer from "../../components/PdfViewer/PdfViewer";

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
  const [editMode, setEditMode] = useState<boolean>(false);
  const [numPages, setNumPages] = useState(null);
  const [pages, setPages] = useState<any[]>([]);
  const { student } = useSelector((state: State) => state.auth);
  const [documentation, setDocumentation] = useState<DocumentInterface>();
  const [isTaken, setIsTaken] = useState<boolean>(false);
  const [downloaded, setDownloaded] = useState<Download>();
  const [author, setAuthor] = useState<Student>();
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
    ).then((res) => {});
  };

  const showPdf = () => {
    document.getElementById("pdf-modal")?.classList.add("isOpen");
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

  // Gets the author of the document.
  const getAuthor = async () => {
    await getStudentApi(documentation!.user.toString()).then((res) => {
      setAuthor({ user: res.data, token: "" });
      if (res.data.id === student?.user.id) {
        setEditMode(true);
        setIsTaken(true);
      }
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

  React.useEffect(() => {
    if (documentation) {
      getAuthor();
    }
  }, [documentation]);

  return (
    <div className="doc-container">
      <div className="doc-top-container">
        <div style={{ minWidth: "20%" }}>
          <p className="doc-title">{documentation?.title}</p>
          <div className="doc-detail-container">
            <IoMdSchool size={36} />
            <p className="doc-detail-text">
              {documentation?.faculty}{" "}
              <span>({documentation?.university})</span>
            </p>
          </div>
          <div className="doc-detail-container">
            <IoPencil size={36} />
            <p className="doc-detail-text">{author?.user.first_name}</p>
          </div>
          <div className="doc-detail-container">
            <BsFillCalendarDateFill size={36} />
            <p className="doc-detail-text">{documentation?.date}</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {!isTaken ? (
              <button className="doc-btn-container" onClick={takeCourse}>
                <p className="doc-btn-text">Take document</p>
              </button>
            ) : (
              <button className="doc-btn-container" onClick={showPdf}>
                <p className="doc-btn-text">Show PDF</p>
              </button>
            )}
            {editMode && (
              <button
                className="doc-btn-container"
                onClick={() =>
                  document.getElementById("edit-modal")?.classList.add("isOpen")
                }
              >
                <p className="doc-btn-text">Edit PDF</p>
              </button>
            )}
          </div>
        </div>
        <div className="doc-pdf-container">
          <Document
            file={documentation?.file}
            onLoadSuccess={onDocumentLoadSuccess}
            className="doc-pdf-wrapper"
          >
            {Array.from(new Array(numPages), (el, index) => {
              return (
                <Page
                  key={`${index}`}
                  pageNumber={index + 1}
                  height={250}
                  className={!isTaken ? "doc-blur" : ""}
                />
              );
            })}
            {!isTaken && (
              <div className="doc-locked-container">
                <BiLock size={36} color="black" />
                <p style={{ fontSize: 24 }}>Locked</p>
              </div>
            )}
          </Document>
        </div>
      </div>
      <div className="doc-description-container">
        <p className="doc-description-title">Description</p>
        <p className="doc-description-text">{documentation?.description}</p>
      </div>
      {documentation && (
        <div className="modalView" id="edit-modal">
          <Edit documentation={documentation!} />
        </div>
      )}
      <div className="modalView" id="pdf-modal">
        <PdfViewer file={documentation?.file} />
      </div>
    </div>
  );
};
