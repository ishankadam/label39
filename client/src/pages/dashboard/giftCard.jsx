import { useEffect, useState } from "react";
import CustomTable from "../../components/custom-table/customTable";

const GiftCardPage = (props) => {
  const [giftCards, setGiftCards] = useState([]);

  useEffect(() => {
    setGiftCards(props.giftCards);
  }, [props.giftCards]);

  const colDef = [
    {
      id: "phone",
      label: "Phone",
      key: "phone",
      type: "text",
      align: "left",
    },
    {
      id: "email",
      label: "Email",
      key: "email",
      type: "text",
      align: "left",
    },
    {
      id: "code",
      label: "Code",
      key: "code",
      type: "text",
      align: "left",
    },
    {
      id: "balance",
      label: "Balance",
      key: "balance",
      type: "text",
      align: "left",
    },
    {
      id: "expiryDate",
      label: "Expiry Date",
      key: "expiryDate",
      type: "date",
      align: "left",
    },
  ];

  return (
    <div>
      <CustomTable
        colDef={colDef}
        rowData={giftCards}
        loading={props.loading}
        pagination={true}
        page="GiftCardPage"
      ></CustomTable>
    </div>
  );
};

export default GiftCardPage;
