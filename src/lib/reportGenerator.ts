import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Define the structure of the data our report function will receive
interface ReportData {
  aivssScore: number;
  aarsScore: number;
  cvssScore: number;
  vectorString: string;
  chartImage: string; // This is the base64 image data URL
  aarsFactors: {
    name: string;
    value: number;
  }[];
}

export const generateReport = (data: ReportData) => {
  const doc = new jsPDF();

  //  fonts and colors
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("AIVSS Dynamic Risk Assessment Report", 105, 20, {
    align: "center",
  });

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Report Generated: ${new Date().toLocaleString()}`, 105, 28, {
    align: "center",
  });

  // the main score display
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Overall AIVSS Score:", 105, 45, { align: "center" });

  doc.setFontSize(48);
  doc.setTextColor(40, 40, 40);
  doc.text(data.aivssScore.toFixed(1), 105, 60, { align: "center" });

  // Add the component scores
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text("Component Scores", 20, 80);
  doc.text(`CVSS Base Score: ${data.cvssScore.toFixed(1)}`, 20, 88);
  doc.text(
    `Agentic AI Risk Score (AARS): ${data.aarsScore.toFixed(1)}`,
    20,
    96
  );

  // Add the Vector String
  doc.text("AIVSS Vector String:", 20, 110);
  doc.setFont("courier", "normal");
  doc.setFontSize(10);
  doc.text(data.vectorString, 20, 118);

  // Add the captured chart image
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Risk Visualization", 20, 135);
  doc.addImage(data.chartImage, "PNG", 15, 140, 180, 120);

  // --- PAGE 2: DETAILED AARS BREAKDOWN ---
  doc.addPage();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Detailed AARS Factor Breakdown", 105, 20, { align: "center" });

  //  data for the table
  const tableColumn = ["Factor Name", "Assessed Value"];
  const tableRows = data.aarsFactors.map((factor) => [
    factor.name,
    factor.value.toFixed(1),
  ]);

  //  function directly on the doc instance
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 30,
    theme: "grid",
    headStyles: { fillColor: [22, 160, 133] },
  });

  // Save the PDF and trigger the download
  doc.save("AIVSS-Report.pdf");
};
