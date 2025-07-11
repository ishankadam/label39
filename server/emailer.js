const fs = require("fs");
const path = require("path");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_EMAIL_API_KEY);

const getDaysUntilExpiry = (expiresAt) => {
  const today = new Date();
  const expiryDate = new Date(expiresAt);
  const differenceInTime = expiryDate.getTime() - today.getTime();
  return Math.ceil(differenceInTime / (1000 * 3600 * 24));
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
      case "order_delivered":
      case "order_out_for_delivery":
        const currency = "₹";
        const cartItemsHtml = data.cartItems
          .map(
            (row) => `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${row.name}</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${row.quantity}</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${currency}${row.price}</td>
            </tr>`
          )
          .join("");

        htmlData = body
          .replace(
            `<span id="user_name"></span>`,
            `${data.checkoutData.shippingAddress.firstName} ${data.checkoutData.shippingAddress.lastName}`
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
            data.checkoutData.billingAddress.apartment ||
              data.checkoutData.shippingAddress.apartment
          )
          .replace(
            `<span id="billing_address"></span>`,
            data.checkoutData.billingAddress.address ||
              data.checkoutData.shippingAddress.address
          )
          .replace(
            `<span id="billing_city"></span>`,
            data.checkoutData.billingAddress.city ||
              data.checkoutData.shippingAddress.city
          )
          .replace(
            `<span id="billing_state"></span>`,
            data.checkoutData.billingAddress.state ||
              data.checkoutData.shippingAddress.state
          )
          .replace(
            `<span id="billing_pincode"></span>`,
            data.checkoutData.billingAddress.pincode ||
              data.checkoutData.shippingAddress.pincode
          )
          .replace(
            `<span id="country"></span>`,
            data.checkoutData.billingAddress.country ||
              data.checkoutData.shippingAddress.country
          )
          .replace(
            `<span id="billing_phone"></span>`,
            data.checkoutData.phone || data.checkoutData.shippingAddress.phone
          )
          .replace(`<tr id="cart_items_placeholder"></tr>`, cartItemsHtml)
          .replace(`<span id="currency"></span>`, currency);

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

    const response = await resend.emails.send({
      from: "thelabel39 <noreply@thelabel39.com>", // must be a verified sender domain
      to: [toEmail, "thelabel39@gmail.com"],
      subject,
      html: isHtml ? htmlData : undefined,
      text: isHtml ? undefined : body,
    });

    console.log("Resend Email Success:", response);
    return response;
  } catch (error) {
    console.error("Resend Email Error:", error);
    throw error;
  }
};

module.exports = sendEmail;
