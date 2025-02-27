import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Button } from "@mui/material";
import { messageUrl } from "../../api";

const ShareViaWhatsApp = ({ product }) => {
  const handleShare = () => {
    const productUrl = `${messageUrl}/products/${product.productId}`;
    const message = encodeURIComponent(`Check out this product: ${productUrl}`);
    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Button
      variant="outlined"
      startIcon={<WhatsAppIcon />}
      onClick={handleShare}
      color="custom"
      sx={{
        width: "50%",
      }}
    >
      Share
    </Button>
  );
};

export default ShareViaWhatsApp;
