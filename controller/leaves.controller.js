const leaves = require("../models/leaves.model");
const config = require("../config/middlewares");
const puppeteer = require("puppeteer");

async function createPDF(data) {
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
}

module.exports.addNewLeaves = async (req, res, next) => {
  const {
    leave_id,
    admission_date_en,
    admission_date_ar,
    discharge_date_en,
    discharge_date_ar,
    issue_date,
    name_en,
    name_ar,
    national_id,
    employer,
    physician_name_en,
    physician_name_ar,
    position_en,
    position_ar,
    countryId,
  } = req.body;
  try {
    const new_leave = await leaves.create({
      leave_id,
      admission_date_en,
      admission_date_ar,
      discharge_date_en,
      discharge_date_ar,
      issue_date,
      name_en,
      name_ar,
      national_id,
      employer,
      physician_name_en,
      physician_name_ar,
      position_en,
      position_ar,
      countryId,
    });
    if (new_leave) {
      // here create pdf to this leaves
      // config.generateInvoicePdf(new_leave.dataValues);
      const dynamicData = {
        title: "Dynamic PDF Example",
        description: "This PDF was generated dynamically using Puppeteer.",
        items: [
          { name: "Item 1", value: "Value 1" },
          { name: "Item 2", value: "Value 2" },
          { name: "Item 3", value: "Value 3" },
        ],
      };
      await createPDF(dynamicData);
    }
    return res.status(200).json({
      status_code: 200,
      data: null,
      message: "leave added successfully",
    });
  } catch (error) {
    console.log("errorr ", error);
    return res.status(500).json({
      status_code: 500,
      data: null,
      message: error.message,
    });
  }
};

module.exports.getOneLeaveDetails = async (req, res, next) => {
  try {
    const { national_id, leave_id } = req.body;
    const leave = await leaves.findOne({
      where: { national_id, leave_id },
    });
    if (leave) {
      return res.status(200).json({
        status_code: 200,
        data: leave,
        message: "request success",
      });
    } else {
      return res.status(400).json({
        status_code: 400,
        data: null,
        message: "you dont have a leave or rewrite it correctly",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status_code: 500,
      data: null,
      message: error.message,
    });
  }
};
