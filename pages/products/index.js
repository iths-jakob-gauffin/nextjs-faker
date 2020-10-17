const Products = () => {
  return (
    <h1>Products</h1>
  )
}
export async function getStaticProps(content){
  const res = await fetch("http://localhost:4001/api/products");
  const data = await res.json();

  return {
    props: {}
  }
}

export default Products;
