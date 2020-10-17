import '../styles/globals.css'
import {Nav} from "../components/Nav/Nav";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Nav categories={["men clothing", "jewelery", "electronics", "women clothing"]}/>
      <Component {...pageProps} />
    </div>
  )
}

// export async function getStaticProps(content){
//   const res = await fetch("/api/products");
          
//   const allProducts = await res.json();

//   // Way to get all categories, one of each that is, in a oneliner
//   const categories = [...new Set(allProducts.map(x => x.category))];
//   console.log("OUTPUT ÄR: getStaticProps -> categories", categories)

//   return {
//     props: categories
//   }
// }

export default MyApp
