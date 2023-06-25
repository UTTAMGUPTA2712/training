// import React from "react";
// import { renderToString } from "react-dom/server";
// import ResumeCard from "./resumeCard";
// import jsPDF from "jspdf";
// import ResumeTemplate1 from "./resumeTemplate1";
import React from "react";
import { PDFViewer, Document, Page } from "@react-pdf/renderer";
import ResumeCard from "./resumeCard";

const DownloadPdf = ({ data }) => {
        <PDFViewer>
          <Document>
            <Page>
              <ResumeCard data={data} />
            </Page>
          </Document>
        </PDFViewer>
};
export default DownloadPdf;