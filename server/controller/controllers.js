const Product = require("../schema/product");
const get_all_data = async (req, res) => {
  try {
    const product = await Product.find({}); // Fetch all events
    console.log(product);
    res.status(200).json(product); // Send the result as JSON
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
};

const create_product = async (req, res) => {
  const newProductId = Math.floor(Math.random() * 9000000000) + 1;
  try {
    const newCreatedProduct = new Product({
      productId: newProductId,
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      sizes: req.body.sizes || [],
      garmentDetails: req.body.garmentDetails || [],
      deliveryIn: req.body.deliveryIn,
    });
    await newCreatedProduct.save();
    const allProduct = await Product.aggregate([{ $project: { _id: 0 } }]);
    res.send(allProduct);
    res.end();
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
    res.end();
  }
};

module.exports = {
  get_all_data,
  create_product,
};
