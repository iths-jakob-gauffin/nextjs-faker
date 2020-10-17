import products from "../../public/data/products.json"

export default (req,res) => {
  res.status(200).json(products)
}