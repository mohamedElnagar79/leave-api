const leaves = require("../models/leaves.model");
const config = require("../config/middlewares");
const puppeteer = require("puppeteer");
const Country = require("../models/countries.model");
const { Sequelize } = require("sequelize");

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
      <title>sick leaves</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
        }
          Top-head{
          text-align:center;
          }
        h3 {
          color: blue;
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
    <div class="Top-head">
    <h3>تقرير إجازة مرضية</h3>
      <h3>Sick Leave Report</h3>
    </div>
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
    path: `./public/leaves/leave_${data.id}_${data.leave_id}.pdf`,
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
    // admission_date_ar,
    discharge_date_en,
    issue_date,
    name_en,
    name_ar,
    national_id,
    employer_en,
    employer_ar,
    physician_name_en,
    physician_name_ar,
    position_en,
    position_ar,
    countryId,
  } = req.body;
  try {
    let admission_date_ar = config.convertDates(admission_date_en);
    let discharge_date_ar = config.convertDates(discharge_date_en);
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
      employer_en,
      employer_ar,
      physician_name_en,
      physician_name_ar,
      position_en,
      position_ar,
      countryId,
    });
    if (new_leave) {
      let leave_days = config.calcDays(
        new_leave.dataValues.admission_date_en,
        new_leave.dataValues.discharge_date_en
      );
      console.log("leave days count ===> ", leave_days);
      // here create pdf to this leaves
      // config.generateInvoicePdf(new_leave.dataValues);
      const dynamicData = {
        title: "Dynamic PDF Example",
        id: new_leave.dataValues.id,
        leave_id: new_leave.dataValues.leave_id,
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
      attributes: {
        include: [
          [Sequelize.col("Country.country_name_en"), "nationality_en"],
          [Sequelize.col("Country.country_name_ar"), "nationality_ar"],
        ],
      },
      include: [
        {
          model: Country,
          attributes: [], // Exclude original attributes from Country to avoid duplication
        },
      ],
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
