const { REACT_APP_API_URL } = process.env;
export const apiUrl = REACT_APP_API_URL;

export const getAllProducts = async (setProductsData) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(`${apiUrl}/getData`, requestOptions)
    .then(async function (response) {
      if (response.ok) {
        return await response.json();
      } else {
        if (response.status === 401) {
          console.log("error");
        }
      }
    })
    .then((data) => {
      setProductsData(data);
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createProduct = async (productDetails) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productDetails),
  };
  fetch(`${apiUrl}/createProduct`, requestOptions)
    .then(async (res) => {
      if (res.ok) {
        console.log(res);
      }
    })
    .catch((e) => {
      console.log(e);
    });
};
