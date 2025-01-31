const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Replace with your Access Key ID
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Replace with your Secret Access Key
  region: "ap-south-1", // Replace with your SES region
});

const ses = new AWS.SES();

const sendEmail = async ({
  to: toEmail,
  subject,
  emailBody,
  isHtml,
  data,
  type,
}) => {
  try {
    // Read the HTML file content
    const body = isHtml
      ? fs.readFileSync(path.resolve(emailBody), "utf-8")
      : emailBody;

    console.log(data);
    let htmlData;
    switch (type) {
      case "giftcard":
        htmlData = body
          .replace(`<span id="recipient-name"></span>`, data.name)
          .replace(`<span id="amount"></span>`, `${data.balance}`)
          .replace(`<span id="gc-code"></span>`, data.code)
          .replace(`<span id="expiry-date"></span>`, data.expiryDate);
        break;
      default:
        htmlData = body;
        break;
    }

    const params = {
      Source: "ishan.kadam_19@sakec.ac.in", // Replace with your verified email
      Destination: {
        ToAddresses: [toEmail],
      },
      Message: {
        Body: isHtml
          ? { Html: { Charset: "UTF-8", Data: htmlData } }
          : { Text: { Charset: "UTF-8", Data: body } },
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
