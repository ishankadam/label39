import React, { useState, useEffect } from "react";
import CustomLoader from "../components/customLoader";

const LoaderTestPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay of 3 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
        <CustomLoader />
      ) : (
        <h2 style={{ textAlign: "center" }}>GIF Loader Test Successful ✅</h2>
      )}
    </div>
  );
};

export default LoaderTestPage;
