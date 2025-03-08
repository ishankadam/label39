import CircleIcon from "@mui/icons-material/Circle";
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemIcon,
  Typography,
} from "@mui/material";
import React from "react";
import Footer from "../homepage/footer";

const items = [
  "Processing orders and making deliveries.",
  "Ensuring the authenticity of products you have bought for processing any replacement or warranty claim.",
  "Unless you choose an alternative payment method, you will be billed for the service.",
  "Resolving financial matters with individuals who offer services connected to ours.",
  "Handling requests, inquiries, complaints, and other customer care-related tasks, as well as general administrative and business activities.",
  "Conducting market and product analysis and promoting our and our group companies' products and services.",
  "Contacting you (including by post, email, sms, whatsapp, or telephone) about our and our group companies' products and services and the products and services of carefully selected third parties which we think may be of interest to you (unless you ask us in writing not to).",
  "Your inclusion in any telephone or similar directory or directory enquiry service provided or operated by us or by a third party (subject to any objection or preference you may have indicated to us in writing).",
  "Engaging in any activity that is related to a legal, governmental, or regulatory obligation, or in connection with legal proceedings, crime prevention, detection, or prosecution.",
  "Carrying out activities connected with the running of our business such as personnel training, quality control, network monitoring, testing and maintenance of computer and other systems and in connection with the transfer of any part of our business in respect of which you are a customer or a potential customer.",
];

const doNotApply = [
  "Information collected by TheLabel39 through offline means (such as through a mail-in product registration card or on the phone by Customer Support), unless we clearly note otherwise at the place or time of data collection, or the offline-collected data is merged and used together with online-collected data",
  "Third-party websites operated by other companies and that are linked to our Online Services, or that provide links from their sites to ours. We are not responsible, and disclaim any and all responsibility, for the practices or content of such third-party websites",
  "Information given to us in a business capacity or for employment or work-related purposes, such as information about our business customers (retailers, distributors, etc.), personal information provided by artists or other professionals we hire to help create our products, or job applicant data submitted through the join us section of our website.",
];

const PrivacyPolicy = () => {
  return (
    <>
      <Container maxWidth="lg" sx={{ py: 4, mb: 5 }}>
        <Typography
          sx={{
            fontSize: { xs: "22px", sm: "28px", md: "32px", lg: "34px" },
            color: "#2f3e4e",
            textAlign: "center",
            mb: 4,
            fontFamily: "'Cinzel', serif",
            fontWeight: "600",
          }}
        >
          Privacy Policy
          <Box
            sx={{
              width: "70px",
              height: "3px",
              borderRadius: "100px",
              backgroundColor: "#2f3e4e",
              mx: "auto",
              mt: "8px",
            }}
          />
        </Typography>

        <Box>
          <Typography
            gutterBottom
            sx={{
              fontSize: { xs: "17px", sm: "18px", md: "19px", lg: "19px" },
              color: "#2f3e4e",
              textAlign: "left",
              fontFamily: "'Roboto Serif', serif",
              fontWeight: "600",
            }}
          >
            What personal information does TheLabel39 collect?
          </Typography>

          <Typography
            paragraph
            sx={{ color: "#66544B", mb: 3, textAlign: "justify" }}
          >
            We might have information about you that you gave us when you
            registered with us, when you placed an order with us, or that we
            might have gotten from another source (such our distributors or
            marketing agencies). Among other things, this information might
            contain your name, address, phone number, information about how you
            use our products, how you experience them, information about how you
            browse our or our distributors' websites, domain address, and any
            other data gathered about how you use our goods and services
            ("information").
            <br />
            Visitors to the website and registered users—those who buy products
            and use online services—are the subjects of the information
            gathered.
          </Typography>

          <Typography
            gutterBottom
            sx={{
              fontSize: { xs: "17px", sm: "18px", md: "19px", lg: "19px" },
              color: "#2f3e4e",
              textAlign: "left",
              fontFamily: "'Roboto Serif', serif",
              fontWeight: "600",
            }}
          >
            How does TheLabel39 use your Personal Information?
          </Typography>
          <Typography paragraph sx={{ color: "#66544B", mb: 3 }}>
            The information that TheLabel39 collects from you is held in
            accordance with applicable laws and regulations in India. It may be
            used by us for several purposes connected with our business
            operations and functions, which include:
          </Typography>
          <List>
            {items.map((item, index) => (
              <ListItem
                key={index}
                sx={{ display: "flex", alignItems: "center", gap: 0 }}
              >
                <ListItemIcon>
                  <CircleIcon sx={{ fontSize: 8, color: "#66544B" }} />
                </ListItemIcon>
                <Typography variant="body1" sx={{ color: "#66544B" }}>
                  {item}
                </Typography>
              </ListItem>
            ))}
          </List>
          <Typography paragraph sx={{ color: "#66544B", mb: 3 }}>
            Thelabel39 will not share, sell, disclose, reveal, or provide any
            personal information to third parties without your explicit
            permission. All personal and business information, including
            inquiries and sales data, will be kept confidential.
            <br />
            <br />
            The label39 ensures that by providing your postal address online,
            you will only receive the information you have shared. Nevertheless,
            if you do not want to receive future emails from us or if you want
            to be removed from our mailing lists, please inform us by sending an
            email or writing to us.
          </Typography>
          <Typography
            gutterBottom
            sx={{
              fontSize: { xs: "17px", sm: "18px", md: "19px", lg: "19px" },
              color: "#2f3e4e",
              textAlign: "left",
              fontFamily: "'Roboto Serif', serif",
              fontWeight: "600",
            }}
          >
            Sharing your information outside India.
          </Typography>
          <Typography paragraph sx={{ color: "#66544B", mb: 3 }}>
            We do not share any information outside India.
          </Typography>

          <Typography
            gutterBottom
            sx={{
              fontSize: { xs: "17px", sm: "18px", md: "19px", lg: "19px" },
              color: "#2f3e4e",
              textAlign: "left",
              fontFamily: "'Roboto Serif', serif",
              fontWeight: "600",
            }}
          >
            Protecting your personal information
          </Typography>
          <Typography paragraph sx={{ color: "#66544B", mb: 3 }}>
            Thelabel39 makes sure to take necessary precautions to safeguard the
            personal information it collects, uses, or discloses, storing it in
            a secure environment that is protected from unauthorized access,
            modification, or disclosure.
            <br />
            If you want to stop receiving sms, mms, whatsapp messages, or any
            other type of mobile messaging, you can also find the instructions
            in the messages you receive. Likewise, all emails you receive will
            offer guidance on how to remove yourself from the mailing list if
            you wish to do so.
            <br />
            Alternatively, if you wish to be removed from receiving
            communications from thelabel39, kindly reach out to the customer
            service by sending an email to info@thelabel39. Com. It may take a
            few weeks for opt-outs to take effect, so you might still receive
            electronic communications from for a while after you submit your
            request.
          </Typography>

          <Typography
            gutterBottom
            sx={{
              fontSize: { xs: "17px", sm: "18px", md: "19px", lg: "19px" },
              color: "#2f3e4e",
              textAlign: "left",
              fontFamily: "'Roboto Serif', serif",
              fontWeight: "600",
            }}
          >
            This Policy does not apply to any of the following:
          </Typography>
          {doNotApply.map((item, index) => (
            <ListItem
              key={index}
              sx={{ display: "flex", alignItems: "center", gap: 0 }}
            >
              <ListItemIcon>
                <CircleIcon sx={{ fontSize: 8, color: "#66544B" }} />
              </ListItemIcon>
              <Typography variant="body1" sx={{ color: "#66544B" }}>
                {item}
              </Typography>
            </ListItem>
          ))}

          <Typography
            gutterBottom
            sx={{
              fontSize: { xs: "17px", sm: "18px", md: "19px", lg: "19px" },
              color: "#2f3e4e",
              textAlign: "left",
              fontFamily: "'Roboto Serif', serif",
              fontWeight: "600",
            }}
          >
            Changes to this Policy
          </Typography>
          <Typography paragraph sx={{ color: "#66544B", mb: 3 }}>
            TheLabel39 reserves the right to modify this Privacy Policy at any
            time, and the User agrees to be bound by such modifications. The
            User is responsible for regularly reviewing this Privacy Policy.
          </Typography>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
