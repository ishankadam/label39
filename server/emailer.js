const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Replace with your Access Key ID
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Replace with your Secret Access Key
  region: "ap-south-1", // Replace with your SES region
});

const ses = new AWS.SES();

const sendEmail = async (toEmail, subject, htmlFilePath) => {
  try {
    // Read the HTML file content
    const htmlContent = fs.readFileSync(path.resolve(htmlFilePath), "utf-8");

    const params = {
      Source: "ishan.kadam_19@sakec.ac.in", // Replace with your verified email
      Destination: {
        ToAddresses: [toEmail],
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: htmlContent,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: subject,
        },
      },
    };

    const result = await ses.sendEmail(params).promise();
    console.log("Email sent successfully:", result);
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = sendEmail;
