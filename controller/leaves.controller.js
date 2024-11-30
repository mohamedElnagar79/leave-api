const leaves = require("../models/leaves.model");
const config = require("../config/middlewares");
const puppeteer = require("puppeteer");
const Country = require("../models/countries.model");
const { Sequelize } = require("sequelize");
const moment = require("moment");

const getFormattedDateTime = () => {
  // Getting current time in "hh:mm A" format
  const currentTime = moment().format("hh:mm A");

  // Getting current date in "dddd, DD MMMM YYYY" format
  const currentDate = moment().format("dddd, DD MMMM YYYY");

  return { currentTime, currentDate };
};

async function createPDF(data, leave_days, DateObj) {
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
        margin: 0px 0px 20px 20px;
      }
      Top-head {
        text-align: center;
      }
      h3 {
        color: #3773b9;
        text-align: center;
      }
      .dark-head {
        color: #2b3e75;
      }
      .custom-table {
        width: 90%;
        margin:2rem auto;
        border-collapse: collapse;
        border: 1px solid rgb(221, 221, 221);
        border-radius:10px !important;
      }

      /* Style the table cells */
      .custom-table td {
        padding: 10px;
        font-size: 13px;
        text-align: center;
        border: 1px solid rgb(221, 221, 221);
      }

      /* Optional: Style the first row to stand out */
      .custom-table tr:first-child td {
        background-color: #f2f2f2;
        font-weight: bold;
      }

      .custom-table .one {
        color: #6491c6 !important;
        width: 120px;
      }
      .custom-table .two {
        color: #566491 !important;
      }
      .darkBg {
        background-color: #f5f5f5 !important;
      }
      .leave-duration {
        background-color: #283c78;
        color: white;
      }
      .custom-table tbody tr .one {
        width: 50px;
      }
      .custom-table tbody tr td:last-child {
        width: 50px;
      }
      .transparnt-bg td {
        background-color: transparent !important;
      }
      .header-logos {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px 20px 20px;
        background-color: #fff;
      }

      .logo-seha,
      .logo-ksa,
      .logo-design {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      .logo-seha img,
      .logo-ksa img,
      .logo-design {
        width: 170px; /* Adjust as needed */
        height: auto;
      }
         .footer-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 50px;
    }
    .qr-section {
      text-align: center;
      flex: 1;
    }
    .qr-section img {
      width: 150px;
      height: 150px;
      margin-bottom: 10px;
    }
    .qr-section p {
      margin: 5px 0;
      font-size: 14px;
    }
    .qr-section a {
      color: #0070c0;
      text-decoration: none;
      font-size: 14px;
    }
    .logo-section {
      flex: 1;
      text-align: right;
    }
    .logo-section img {
      display: block;
      margin-bottom: 10px;
      max-width: 150px;
      height: auto;
    }
    .logo-section .text {
      font-size: 14px;
      text-align: right;
      margin-bottom: 20px;
    }
    .timestamp {
      margin-top: 30px;
      text-align: center;
      font-size: 14px;
      color: #555;
    }
    </style>
    </head>
    <body>
   <div class="Top-head">
      <div class="header-logos">
        <div class="logo-seha">
          <img src='${process.env.SERVER_HOST}/public/images/seha.PNG' alt="seha logo"/>
        </div>
        <div class="logo-ksa">
          <img src='${process.env.SERVER_HOST}/public/images/saudia.PNG' alt="KSA Logo" />
        </div>
        <div class="logo-design">
          <img src='${process.env.SERVER_HOST}/public/images/3.PNG' alt="design Logo" />
        </div>
      </div>
      <h3>تقرير إجازة مرضية</h3>
      <h3 class="dark-head">Sick Leave Report</h3>
    </div>
        <table class="custom-table" style="border: solid 1px red !important">

<tbody>
  <tr class="transparnt-bg">
    <td class="one"  colspan="1">leave_id</td>

    <td class="two"  colspan="2">${data.leave_id}</td>
    <td class="one"  colspan="1">leave_id</td>

  </tr>
  <tr class="leave-duration">
    <td >Leave Duration</td>
    <td style="padding: 8px; border: 1px solid #ccc;">
        ${leave_days} day (${data.admission_date_en} to ${data.discharge_date_en})
      </td>
      <td style="padding: 8px; border: 1px solid #ccc;">
        يوم ${leave_days}  (${data.admission_date_ar} إلى ${data.discharge_date_ar})
      </td>

    <td >مدة الأجازة</td>
  </tr>
  <tr>
    <td class="one">addmition date</td>
    <td class="two" >${data.admission_date_en}</td>
    <td class="two" >${data.admission_date_ar}</td>
    <td class="one">تاريخ الدخول</td>
  </tr>
  <tr class="darkBg">
    <td class="one">discharege date</td>
    <td class="two">${data.discharge_date_en}</td>
    <td class="two">${data.discharge_date_ar}</td>
    <td class="one">تاريخ الخروج</td>
  </tr>

  <tr>
    <td class="one" colspan="1">assu_date</td>

    <td class="two"  colspan="2">${data.issue_date}</td>
    <td class="one" colspan="1">تاريخ إصدار التقرير</td>

  </tr>

  <tr class="darkBg">
    <td class="one">name</td>
    <td class="two">${data.name_en}</td>
    <td class="two">${data.name_ar}</td>
    <td class="one">الإسم</td>
  </tr>

  <tr>
    <td class="one" colspan="1">National ID/lqama </td>

    <td colspan="2">${data.national_id}</td>
    <td class="one" colspan="1">رقم الهوية/الإقامة</td>

  </tr>
  <tr class="darkBg">
    <td class="one">nationality</td>
    <td class="two">testt</td>
    <td class="two">تستت</td>
    <td class="one">الجنسية</td>
  </tr>
  <tr>
    <td class="one">empolyer</td>
    <td class="two" >${data.employer_en}</td>
    <td class="two" >${data.employer_ar}</td>
    <td class="one">جهة العمل</td>
  </tr>
  <tr class="darkBg">
    <td class="one">physician name</td>
    <td class="two">${data.physician_name_en}</td>
    <td class="two">${data.physician_name_ar}</td>
    <td class="one">إسم الطبيب المعالج</td>
  </tr>
  <tr>
    <td class="one">position</td>
    <td class="two" >${data.position_en}</td>
    <td class="two" >${data.position_ar}</td>
    <td class="one">المسمى الوظيفى</td>
  </tr>
</tbody>

      </table>
 <div class="footer-section">
    <!-- QR Code Section -->
    <div class="qr-section">
      <img src='${process.env.SERVER_HOST}/public/images/barcode.JPG' alt="QR Code">
      <p>للتحقق من بيانات التقرير الرجاء زيارة موقع منصة صحة الرسمي</p>
      <p>To check the report please visit Seha's official website</p>
      <a href=<img src='${process.env.SERVER_HOST}/public/images/barcode.JPG' alt="barcodelogo"/> target="_blank">www.seha.sa/#/inquiries/slenquiry</a>
     <!-- Timestamp -->
  <div class="timestamp">
    <p>${DateObj.currentTime}</p>
    <p>${DateObj.currentDate}</p>
  </div>
      </div>
    
    <!-- Logo Section -->
    <div class="logo-section">
      <div>
        <img src='${process.env.SERVER_HOST}/public/images/1.PNG' alt="Ministry of Health Logo">
      </div>
      <div>
        <img src='${process.env.SERVER_HOST}/public/images/national-center.PNG' alt="National Health Logo">
      </div>
    </div>
  </div>

 

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
  return `/public/leaves/leave_${data.id}_${data.leave_id}.pdf`;
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
    let path;
    const DateObj = getFormattedDateTime();
    let admission_date_ar = config.convertDates(admission_date_en);
    let discharge_date_ar = config.convertDates(discharge_date_en);
    let new_leave = await leaves.create({
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
      // new_leave = new_leave.dataValues.leave_days;
      console.log("leave days count ===> ", leave_days);
      // here create pdf to this leaves
      // config.generateInvoicePdf(new_leave.dataValues);

      path = await createPDF(new_leave.dataValues, leave_days, DateObj);
    }
    return res.status(200).json({
      status_code: 200,
      data: process.env.SERVER_HOST + path,
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
{
  /* <table>
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
</tbody> */
}
