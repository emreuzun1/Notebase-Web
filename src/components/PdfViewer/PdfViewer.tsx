import { FC, useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import "./PdfViewer.styles.css";

interface IPdfViewer {
  file: any;
}

const PdfViewer: FC<IPdfViewer> = ({ file }) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(0);

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
  }

  return (
    <div className="card">
      <div
        className="close-btn"
        onClick={() =>
          document.getElementById("pdf-modal")?.classList.remove("isOpen")
        }
      >
        <GrClose color="black" />
      </div>
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} className="pdf-page" />
        <div
          style={{
            display: "flex",
            gap: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className={pageNumber === 1 ? "caret-btn disabled" : "caret-btn"}
            onClick={() => setPageNumber(pageNumber - 1)}
          >
            <AiFillCaretLeft
              size={24}
              color={pageNumber === 1 ? "lightgray" : "black"}
            />
          </div>
          <p>
            {pageNumber} of {numPages}
          </p>
          <div
            className={
              pageNumber === numPages ? "caret-btn disabled" : "caret-btn"
            }
            onClick={() => setPageNumber(pageNumber + 1)}
          >
            <AiFillCaretRight
              size={24}
              color={pageNumber === numPages ? "lightgray" : "black"}
            />
          </div>
        </div>
      </Document>
    </div>
  );
};

export default PdfViewer;
