import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { Document, Page } from "react-pdf";

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

  React.useEffect(() => {
    axios(`https://notebase-api.herokuapp.com/api/document/get/${id}`, {
      headers: {
        Authorization: `Token ${student?.token}`,
      },
    }).then((res) => setDocumentation(res.data));
    console.log(documentation);
  }, []);

  return (
    <div>
      <Document file={`${documentation?.file}`}>
        <Page pageNumber={pageNumber} />
      </Document>
    </div>
  );
};
