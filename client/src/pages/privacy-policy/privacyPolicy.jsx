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

const items = [
  "Processing your orders and making deliveries.",
  "Verifying products purchased by you for processing any replacement or warranty claim.",
  "Billing you (unless you pay by another agreed method).",
  "Settling accounts with those who provide related services to us.",
  "Dealing with requests, enquiries or complaints and other customer care-related activities, and all other general administrative and business purposes.",
  "Carrying out market and product analysis and marketing our and our group companies’ products and services generally.",
  "Contacting you (including by post, email, SMS, WhatsApp, or telephone) about our and our group companies' products and services and the products and services of carefully selected third parties which we think may be of interest to you (unless you ask us in writing not to).",
  "Inclusion in any telephone or similar directory or directory enquiry service provided or operated by us or by a third party (subject to any objection or preference you may have indicated to us in writing).",
  "Carrying out any activity in connection with a legal, governmental, or regulatory requirement on us or in connection with legal proceedings, crime, or fraud prevention, detection, or prosecution.",
  "Carrying out activities connected with the running of our business such as personnel training, quality control, network monitoring, testing and maintenance of computer and other systems and in connection with the transfer of any part of our business in respect of which you are a customer or a potential customer.",
];

const doNotApply = [
  "Information collected by TheLabel39 through offline means (such as through a mail-in product registration card or on the phone by Customer Support), unless we clearly note otherwise at the place or time of data collection, or the offline-collected data is merged and used together with online-collected data",
  "Third-party websites operated by other companies and that are linked to our Online Services, or that provide links from their sites to ours. We are not responsible, and disclaim any and all responsibility, for the practices or content of such third-party websites",
  "Information given to us in a business capacity or for employment or work-related purposes, such as information about our business customers (retailers, distributors, etc.), personal information provided by artists or other professionals we hire to help create our products, or job applicant data submitted through the join us section of our website.",
];

const PrivacyPolicy = () => {
  return (
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

        <Typography paragraph sx={{ color: "#66544B", mb: 3 }}>
          We may hold information relating to you that you have provided to us
          while registering with us or while placing an order through us or that
          we may have obtained from another source (such as our distributors or
          from marketing organizations).This information may include, amongst
          other things, your name, address, telephone numbers, information on
          how you use our products, your experience with the product, and
          information on your browsing activity when visiting ours or our
          distributors websites, domain address, and any other information
          collected in relation to your use of our products and services
          ("information").
          <br />
          The information collected is regarding the Site’s visitors and
          registered users (i.e., individuals who purchase the Products and
          online services).
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
          used by us for several purposes connected with our business operations
          and functions, which include:
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
          All personal information shared and exchanged with TheLabel39 will not
          be shared, sold, disclosed, revealed to third parties in any form, for
          any purposes, at any time without your consent. All contacts and sales
          information including the information/queries from us will remain
          confidential.
          <br />
          <br />
          TheLabel39 guarantees that if you supply your postal address on-line
          you will only be sent the information for which you provided your
          address. However, if you do not wish to receive e-mails from us in the
          future, or if you wish to be removed from mailing lists, please let us
          know by sending an e-mail or writing to us.
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
          TheLabel39 takes reasonable steps to ensure that the personal
          information it collects, uses or discloses is stored in a secure
          environment protected from unauthorized access, modification or
          disclosure.
          <br />
          To unsubscribe from SMS, MMS, WhatsApp Messages or other mobile
          messaging, you may also follow the instructions in the messages you
          receive. Similarly, all e-mails you receive will provide you with
          information as to how to get off the e-mail mailing list if you so
          desire.
          <br />
          Alternatively, if you would like to have your name and contact
          information removed from receiving communications from TheLabel39,
          please contact the Customer Service by sending an email to
          info@thelabel39.com. It takes some time to put opt-outs in effect, so
          you may still receive electronic communications from for several weeks
          after your request is received.
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
          time, and the User agrees to be bound by such modifications. The User
          is responsible for regularly reviewing this Privacy Policy.
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;
