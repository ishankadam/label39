const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Replace with your Access Key ID
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Replace with your Secret Access Key
  region: "ap-south-1", // Replace with your SES region
});

const ses = new AWS.SES();

const getDaysUntilExpiry = (expiresAt) => {
  const today = new Date(); // Current date
  const expiryDate = new Date(expiresAt); // Convert expiresAt to Date object

  // Calculate difference in milliseconds
  const differenceInTime = expiryDate.getTime() - today.getTime();

  // Convert milliseconds to days
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

  return differenceInDays;
};

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
    let htmlData;
    switch (type) {
      case "giftcard":
        htmlData = body
          .replace(`<span id="recipient-name"></span>`, data.name)
          .replace(`<span id="amount"></span>`, `${data.balance}`)
          .replace(`<span id="gc-code"></span>`, data.code)
          .replace(
            `<span id="expiry-date"></span>`,
            new Date(data.expiryDate).toLocaleDateString("en-GB")
          );
        break;
      case "resetPassword":
        htmlData = body.replace("confirmation_link", data);
        break;
      case "order_confirm":
        const currency = "₹";
        let cartItemsHtml = data.cartItems
          .map(
            (row) => `
      <tr>
          <td
            style="
                        padding: 10px;
                        border-bottom: 1px solid #eee;
                        font-size: 14px;
                        color: #666;
                      "
          >
            ${row.name}
            <br />
          </td>
          <td
            style="
                        padding: 10px;
                        border-bottom: 1px solid #eee;
                        font-size: 14px;
                        color: #666;
                      "
          >
            ${row.quantity}
          </td>
          <td
            style="
                        padding: 10px;
                        border-bottom: 1px solid #eee;
                        font-size: 14px;
                        color: #666;
                      "
          >
            <span id="currency"></span>
            ${row.price}
          </td>
        </tr>`
          )
          .join("");
        htmlData = body
          .replace(
            `<span id="user_name"></span>`,
            data.checkoutData.shippingAddress.firstName +
              " " +
              data.checkoutData.shippingAddress.lastName
          )
          .replace(`<span id="order_id"></span>`, data.orderId)
          .replace(`<span id="created_at"></span>`, data.createdAt)
          .replace(
            `<span id="shipping_apartment_address"></span>`,
            data.checkoutData.shippingAddress.apartment
          )
          .replace(
            `<span id="shipping_address"></span>`,
            data.checkoutData.shippingAddress.address
          )
          .replace(
            `<span id="shipping_city"></span>`,
            data.checkoutData.shippingAddress.city
          )
          .replace(
            `<span id="shipping_state"></span>`,
            data.checkoutData.shippingAddress.state
          )
          .replace(
            `<span id="shipping_pincode"></span>`,
            data.checkoutData.shippingAddress.pincode
          )
          .replace(`<span id="country"></span>`, data.checkoutData.country)
          .replace(
            `<span id="shipping_phone"></span>`,
            data.checkoutData.shippingAddress.phone
          )
          .replace(
            `<span id="billing_apartment_address"></span>`,
            data.checkoutData.billingAddress.apartment
              ? data.checkoutData.billingAddress.apartment
              : data.checkoutData.shippingAddress.apartment
          )
          .replace(
            `<span id="billing_address"></span>`,
            data.checkoutData.billingAddress.address
              ? data.checkoutData.billingAddress.address
              : data.checkoutData.shippingAddress.address
          )
          .replace(
            `<span id="billing_city"></span>`,
            data.checkoutData.billingAddress.city
              ? data.checkoutData.billingAddress.city
              : data.checkoutData.shippingAddress.city
          )
          .replace(
            `<span id="billing_state"></span>`,
            data.checkoutData.billingAddress.state
              ? data.checkoutData.billingAddress.state
              : data.checkoutData.shippingAddress.state
          )
          .replace(
            `<span id="billing_pincode"></span>`,
            data.checkoutData.billingAddress.pincode
              ? data.checkoutData.billingAddress.pincode
              : data.checkoutData.shippingAddress.pincode
          )
          .replace(
            `<span id="country"></span>`,
            data.checkoutData.billingAddress.country
              ? data.checkoutData.billingAddress.country
              : data.checkoutData.shippingAddress.country
          )
          .replace(`<span id="billing_phone"></span>`, data.checkoutData.phone)
          .replace(`<tr id="cart_items_placeholder"></tr>`, cartItemsHtml)
          .replace(`<span id="currency"></span>`, currency);
        break;
      case "order_delivered":
        const deliveredCurrency = "₹";
        let deliveredCartItemsHtml = data.cartItems
          .map(
            (row) => `
      <tr>
          <td
            style="
                        padding: 10px;
                        border-bottom: 1px solid #eee;
                        font-size: 14px;
                        color: #666;
                      "
          >
            ${row.name}
            <br />
          </td>
          <td
            style="
                        padding: 10px;
                        border-bottom: 1px solid #eee;
                        font-size: 14px;
                        color: #666;
                      "
          >
            ${row.quantity}
          </td>
          <td
            style="
                        padding: 10px;
                        border-bottom: 1px solid #eee;
                        font-size: 14px;
                        color: #666;
                      "
          >
            <span id="currency"></span>
            ${row.price}
          </td>
        </tr>`
          )
          .join("");
        htmlData = body
          .replace(
            `<span id="user_name"></span>`,
            data.checkoutData.shippingAddress.firstName +
              " " +
              data.checkoutData.shippingAddress.lastName
          )
          .replace(`<span id="order_id"></span>`, data.orderId)
          .replace(`<span id="created_at"></span>`, data.createdAt)
          .replace(
            `<span id="shipping_apartment_address"></span>`,
            data.checkoutData.shippingAddress.apartment
          )
          .replace(
            `<span id="shipping_address"></span>`,
            data.checkoutData.shippingAddress.address
          )
          .replace(
            `<span id="shipping_city"></span>`,
            data.checkoutData.shippingAddress.city
          )
          .replace(
            `<span id="shipping_state"></span>`,
            data.checkoutData.shippingAddress.state
          )
          .replace(
            `<span id="shipping_pincode"></span>`,
            data.checkoutData.shippingAddress.pincode
          )
          .replace(`<span id="country"></span>`, data.checkoutData.country)
          .replace(
            `<span id="shipping_phone"></span>`,
            data.checkoutData.shippingAddress.phone
          )
          .replace(
            `<span id="billing_apartment_address"></span>`,
            data.checkoutData.billingAddress.apartment
              ? data.checkoutData.billingAddress.apartment
              : data.checkoutData.shippingAddress.apartment
          )
          .replace(
            `<span id="billing_address"></span>`,
            data.checkoutData.billingAddress.address.length > 0
              ? data.checkoutData.billingAddress.address
              : data.checkoutData.shippingAddress.address
          )
          .replace(
            `<span id="billing_city"></span>`,
            data.checkoutData.billingAddress.city
              ? data.checkoutData.billingAddress.city
              : data.checkoutData.shippingAddress.city
          )
          .replace(
            `<span id="billing_state"></span>`,
            data.checkoutData.billingAddress.state
              ? data.checkoutData.billingAddress.state
              : data.checkoutData.shippingAddress.state
          )
          .replace(
            `<span id="billing_pincode"></span>`,
            data.checkoutData.billingAddress.pincode
              ? data.checkoutData.billingAddress.pincode
              : data.checkoutData.shippingAddress.pincode
          )
          .replace(
            `<span id="country"></span>`,
            data.checkoutData.billingAddress.country
              ? data.checkoutData.billingAddress.country
              : data.checkoutData.shippingAddress.country
          )
          .replace(
            `<span id="billing_phone"></span>`,
            data.checkoutData.phone
              ? data.checkoutData.phone
              : data.checkoutData.shippingAddress.phone
          )
          .replace(
            `<tr id="cart_items_placeholder"></tr>`,
            deliveredCartItemsHtml
          )
          .replace(`<span id="currency"></span>`, deliveredCurrency);
        break;
      case "sale":
        htmlData = body
          .replace(`<span id="sale_discount_value"></span>`, data.discountValue)
          .replace(
            `<span id="sale_type"></span>`,
            data.discountType === "Amount" ? "₹" : "%"
          );
        break;
      case "discount":
        htmlData = body
          .replace(`<span id="discount_coupon_code"></span>`, data.code)
          .replace(`<span id="sale_discount_value"></span>`, data.value)
          .replace(
            `<span id="sale_type"></span>`,
            data.discountType === "Amount" ? "₹" : "%"
          )
          .replace(
            `<span id="days_for_expiry"></span>`,
            getDaysUntilExpiry(data.expiresAt)
          );
        break;
      default:
        htmlData = body;
        break;
    }

    const params = {
      Source: "thelabel39@gmail.com", // Replace with your verified email
      Destination: {
        ToAddresses: [toEmail, "thelabel39@gmail.com"],
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
