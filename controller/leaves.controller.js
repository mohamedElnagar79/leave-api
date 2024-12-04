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

async function createPDF(data, leave_days, DateObj, coutry) {
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
            <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@200..1000&display=swap" rel="stylesheet">
<style>
      body {
font-family: "Cairo", sans-serif;
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
        font-size: 24px ;
      }
        .custom-table {
          width: 90%;
          margin:  auto;
          margin-right: 51px;
           margin-top: 40px;
    
                border-collapse: separate; /* Ensures border-radius works */
      border-spacing: 0; /* Removes spacing between cells for a cohesive look */
          border: 1px solid rgb(221, 221, 221);
          border-radius: 10px; /* Add rounded corners */
          overflow: hidden;
        }
        .custom-table td {
          padding: 5px;
          font-size: 12px;
          text-align: center;
          border: 1px solid rgb(221, 221, 221);
        }
          .vertical-line{
          width:1px;
          height:100px ;
          background-color:rgb(221, 221, 221) ;
          }



      /* Optional: Style the first row to stand out */
      .custom-table tr:first-child td {
        background-color: #f2f2f2;
        font-weight: bold;
      }

      .custom-table .one {
        width: 97px !important;
                                color: #3773b9 !important;


        
      }
      .custom-table .two {
        color: red !important;
        color: #59699D !important;


        
      }
      .darkBg {
        background-color: #f5f5f5 !important;
      }
      .leave-duration {
        background-color: #283c78;
        color: white;
      }
      .custom-table tbody tr .one {
        
        font-weight: 400 ;
      }
      .custom-table tbody tr td:last-child {
        
        font-weight: 400 ;
      }
      .transparnt-bg td {
        background-color: transparent !important;
      }
      .header-logos {

        display: flex;
        justify-content: space-between;
        align-items: center;
    
        background-color: #fff;
      }


         .footer-section {
      display: flex;
      justify-content: space-between;
 
    }
    .qr-section {
      text-align: center;
      position: relative;
      margin-top: 20px;
 
    }
          .qr-section a {
position: absolute;
bottom: 10;
right:28% ;

      
    }


    .logo-section {
      display: flex;
      flex-direction: column;
      margin-top : 50px !important ;
 
      }

    .logo-section .text {
      font-size: 12px;
      text-align: right;
     
    }
    .timestamp {
      font-size: 12px;
      color: #555;

    }
      .leave-report{
      font-size:26px
      }

      .vertical-line{
      margin-top: 50px !important ;
      }
    </style>
    
    </head>
    <body>
   <div class="Top-head">
      <div class="header-logos">
        <div class="logo-seha">
          <img style="height: 60px !important; width: 120px !important; margin-right:-60px !important" src='${process.env.SERVER_HOST}/public/images/seha.PNG' alt="seha logo"/>
        </div>
        <div class="logo-ksa">
          <img style="height: 60px !important; width: 140px !important; margin-right:-125px !important" src='${process.env.SERVER_HOST}/public/images/saudia.PNG' alt="KSA Logo" />
        </div>
        <div class="logo-design">
          <img style="height: 120px !important; width: 200px !important;" src='${process.env.SERVER_HOST}/public/images/3.PNG' alt="design Logo" />
        </div>
      </div>
      <div style="text-align: center; margin-top:50px">
            <h3 class='leave-report ' style="margin:0px ; padding:0px">تقرير إجازة مرضية</h3>
      <span class="dark-head" style="margin:0px ; padding:0px ; font-weight:bold">Sick Leave Report</span>
      </div>

    </div>
   <table class="custom-table">
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
    <td class="two">${coutry.country_name_en}</td>
    <td class="two">${coutry.country_name_ar}</td>
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

<div class="footer-section" >
    <!-- QR Code Section -->
    <div class="qr-section"  ">
    <div style="margin-left: 20px !important; margin-left: 20px !important;
">
          <img style="width: 100px; height: 100px;margin:0px " src='${process.env.SERVER_HOST}/public/images/barcode.jpg' alt="QR Code">
      <p style='margin:0px ;margin-top : -10px !important ; font-size:8px !important' > للتحقق من بيانات التقرير يرجي التحقق من زيارة موقع منصه صحه الرسمي        </p>
      <p style='margin:0px ; font-size:8px !important'' >To check the report please visit Seha's official website</p>
 

<a style='margin:0px ; font-size:8px !important ;'  href="www.seha.sa/#/inquiries/slenquiry" target="_blank">
 <span style=" margin-bottom: 40px !important'">   www.seha.sa/#/inquiries/slenquiry</span>
</a>    </div>




     <!-- Timestamp -->
  <div class="timestamp">
  <div style="margin-top: 80px !important; text-align:left !important ;  margin-left: 20px !important;">
      <p style='margin:0px'>${DateObj.currentTime}</p>
    <p style='margin:0px'>${DateObj.currentDate}</p></div>

  </div>
      </div>
    <div class="vertical-line"></div>
    <!-- Logo Section -->
    <div class="logo-section" >
      <div >
        <img style="width: 150px; height: 130px ;margin-right: 130px;" src='${process.env.SERVER_HOST}/public/images/1.PNG' alt="Ministry of Health Logo">
      </div>
      <div>
        <img style="width: 130px; height: 80px ;margin-left: 90px !important;" src='${process.env.SERVER_HOST}/public/images/national-center.PNG' alt="National Health Logo">
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
      const coutry = await Country.findOne({
        where: {
          id: new_leave.dataValues.countryId,
        },
      });
      console.log("coutry ", coutry.dataValues);
      // new_leave = new_leave.dataValues.leave_days;
      console.log("leave days count ===> ", leave_days);
      // here create pdf to this leaves
      // config.generateInvoicePdf(new_leave.dataValues);

      path = await createPDF(new_leave.dataValues, leave_days, DateObj, coutry);
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
      let leave_days = config.calcDays(
        leave.dataValues.admission_date_en,
        leave.dataValues.discharge_date_en
      );
      leave.dataValues.leave_days = leave_days;
      return res.status(200).json({
        status_code: 200,
        data: leave,
        message: "request success",
      });
    } else {
      return res.status(400).json({
        status_code: 400,
        data: null,
        message: "خطأ فى رمز الخدمة او رقم الهوية / البطاقة",
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
