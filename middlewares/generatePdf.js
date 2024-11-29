const puppeteer = require("puppeteer");

// const PDFDocument = require("pdfkit");
// const fs = require("fs");
// exports.generateInvoicePdf = (leaveObj) => {
//   try {
//     const doc = new PDFDocument();

//     // Create a write stream to save the PDF
//     let writeStream = fs.createWriteStream(
//       `./public/leaves/leave_${leaveObj.id}_${leaveObj.leave_id}.pdf`
//     );

//     doc.registerFont("Cairo", "./public/fonts/Cairo-Regular.ttf");
//     doc.registerFont("Cairo-Bold", "./public/fonts/Cairo-Bold.ttf");
//     doc.pipe(writeStream);

//     // Invoice title
//     doc.fontSize(25).text("leave permission", { align: "center" });
//     doc.moveDown();

//     // Add brand name at the top
//     doc.fontSize(18).text(process.env.brand_logo, { align: "left" });
//     doc.moveDown();

//     // Define styles
//     const headerColor = "#f0f0f0"; // Background color for the header
//     const rowHeight = 30; // Height for both the header and rows
//     const paddingLeft = 5; // Padding for the "Items" column

//     // Dynamically calculate starting Y position to center the table vertically
//     // const totalTableHeight = rowHeight * (newInvoiceItems.length + 1); // Header + rows
//     // const pageHeight = doc.page.height;
//     // const startY = (pageHeight - totalTableHeight) / 2;

//     // Invoice info with increased font size
//     // doc.fontSize(18).text(`Invoice ID: ${leaveObj.id}`);

//     // const isClientNameArabic = /[ء-ي]/u.test(clientName);

//     // Finalize PDF
//     doc.end();

//     writeStream.on("finish", () => {
//       // console.log(`Invoice ${leaveObj.id} generated successfully.`);
//     });

//     return writeStream.path;
//   } catch (error) {
//     console.log("error    ", error);
//     throw new Error(error);
//   }
// };

exports.createPDF = async (data) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Generate HTML dynamically using template literals
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Dynamic PDF</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
        }
        h1 {
          color: #4CAF50;
          text-align: center;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        table, th, td {
          border: 1px solid #ddd;
        }
        th, td {
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f4f4f4;
        }
      </style>
    </head>
    <body>
      <h1>${data.title}</h1>
      <p>${data.description}</p>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          ${data.items
            .map(
              (item, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${item.name}</td>
              <td>${item.value}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    </body>
    </html>
  `;

  // Set the generated HTML as page content
  await page.setContent(htmlContent);

  // Create a PDF from the page
  await page.pdf({
    // path: `./public/leaves/leave_${leaveObj.id}_${leaveObj.leave_id}.pdf`,
    path: `./public/leaves/leave_1.pdf`,
    format: "A4",
    printBackground: true, // Ensures the background styles are included
  });

  await browser.close();
  //   console.log(`PDF saved to: ${outputPath}`);
};

// Dynamic data to inject into the HTML
const dynamicData = {
  title: "Dynamic PDF Example",
  description: "This PDF was generated dynamically using Puppeteer.",
  items: [
    { name: "Item 1", value: "Value 1" },
    { name: "Item 2", value: "Value 2" },
    { name: "Item 3", value: "Value 3" },
  ],
};

// Generate the PDF
// createPDF(dynamicData, "dynamic-output.pdf");
