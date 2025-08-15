import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Interface for the data our report function receives
interface ReportData {
  aivssScore: number;
  aarsScore: number;
  cvssScore: number;
  vectorString: string;
  aarsFactors: { name: string; value: number }[];
  radarImage: string;
  barImage: string;
  distImage: string;
}

// Helper function to get image dimensions asynchronously
const getImageDimensions = (imageDataUrl: string) => {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.onerror = (err) => reject(err);
    img.src = imageDataUrl;
  });
};

// --- NEW HELPER FUNCTION ---
// This function encapsulates the logic for adding an image and advancing the "cursor".
const addImageAndAdvanceCursor = async (
  doc: jsPDF,
  imageData: string,
  currentY: number
) => {
  const pageContentWidth = doc.internal.pageSize.getWidth() - 40; // Page width with 20mm margins
  const margin = 5; // Margin between images

  const dims = await getImageDimensions(imageData);
  const aspectRatio = dims.height / dims.width;
  const pdfImageHeight = pageContentWidth * aspectRatio;

  // Check if the image will fit on the current page, otherwise add a new page
  if (currentY + pdfImageHeight > doc.internal.pageSize.getHeight() - 20) {
    doc.addPage();
    currentY = 20; // Reset cursor to top of new page
  }

  doc.addImage(
    imageData,
    "PNG",
    20,
    currentY,
    pageContentWidth,
    pdfImageHeight
  );

  // Return the new Y position for the next element
  return currentY + pdfImageHeight + margin;
};

export const generateReport = async (data: ReportData) => {
  const doc = new jsPDF();

  // --- PAGE 1: EXECUTIVE SUMMARY ---
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
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Overall AIVSS Score:", 105, 45, { align: "center" });
  doc.setFontSize(48);
  doc.setTextColor(40, 40, 40);
  doc.text(data.aivssScore.toFixed(1), 105, 60, { align: "center" });
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
  doc.text("AIVSS Vector String:", 20, 110);
  doc.setFont("courier", "normal");
  doc.setFontSize(10);
  doc.text(data.vectorString, 20, 118);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Risk Visualization", 20, 135);

  // --- FIX IS HERE: Using the "Running Cursor" approach ---
  // 1. Initialize our cursor's Y position
  let currentY = 140;

  // 2. Add each image and update the cursor's position
  currentY = await addImageAndAdvanceCursor(doc, data.radarImage, currentY);
  currentY = await addImageAndAdvanceCursor(doc, data.barImage, currentY);
  await addImageAndAdvanceCursor(doc, data.distImage, currentY); // No need to save the final Y

  // --- PAGE 2: DETAILED AARS BREAKDOWN ---
  doc.addPage();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Detailed AARS Factor Breakdown", 105, 20, { align: "center" });
  const tableColumn = ["Factor Name", "Assessed Value"];
  const tableRows = data.aarsFactors.map((factor) => [
    factor.name,
    factor.value.toFixed(1),
  ]);
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 30,
    theme: "grid",
    headStyles: { fillColor: [22, 160, 133] },
  });

  doc.save("AIVSS-Report.pdf");
};
