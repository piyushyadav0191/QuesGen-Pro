import { PDFDocument, rgb } from "pdf-lib";

export async function generatePDF(user: any) {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();

  // Add a new page to the document
  const page = pdfDoc.addPage([600, 400]);
  const { width, height } = page.getSize();
  const fontSize = 14;

  // Create a text content for the PDF
  const textContent = `
    Questions:
    ${user.game
      .map((game: any) => {
        return game.Question.map(
          (question: any) => `${question.question} ${question.answer}`
        );
      })
      .join("\n")}
  `;

  // Draw the text on the page
  page.drawText(textContent, {
    x: 50,
    y: height - 50,
    size: fontSize,
    color: rgb(0, 0, 0), // Black color
  });

  // Serialize the PDF document to bytes
  const pdfBytes = await pdfDoc.save();

  return pdfBytes;
}
