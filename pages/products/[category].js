import { useRouter } from 'next/router'
import {useEffect, useState} from "react";
import {ProductPage} from "../../components/ProductPage/ProductPage";

import styles from "./Category.module.scss";

const Category = (props) => {
  console.log("OUTPUT ÄR: Category -> props", props)
  const router = useRouter();
  const { category }= router.query
  const [products, setProducts] = useState({categories: [], allProducts: [], sortedByCategories: {}})
  
  useEffect(() => {

    if(products.categories.length === 0){
      console.log("FETCHAR!");
      (async () => {
        try {
          const res = await fetch("/api/products");
          
          const allProducts = await res.json();
          
          // Way to get all categories, one of each that is, in a oneliner
          const categories = [...new Set(allProducts.map(x => x.category))];
          
          let sortedByCategories = {};
          
          categories.map(unique => {
            let filtered = allProducts.filter(product => product.category === unique)
            
            sortedByCategories = {...sortedByCategories, [unique]: filtered};
          })

          setProducts(
            {allProducts, 
              categories, 
              sortedByCategories})

        } catch (err) {
          console.error(err)
        }
      })();  
    }
  }, [])

  return (
    <div className={styles["Category"]}>
      {products.sortedByCategories !== {} && 
        <ProductPage category={category} products={products.sortedByCategories[category]} />}
    </div>
  )
}

export async function getStaticPaths(){
  const res = await fetch("http://localhost:4001/api/products");
  const allProducts = await res.json();
  // console.log("OUTPUT ÄR: getStaticProps -> data", data)

  const categories = [...new Set(allProducts.map(x => x.category))];

  let sortedByCategories = {};

  categories.map(unique => {
    let filtered = allProducts.filter(product => product.category === unique)
    
    sortedByCategories = {...sortedByCategories, [unique]: filtered};
  })

  console.log("OUTPUT ÄR: getStaticPaths -> sortedByCategories", sortedByCategories)
  
    // {allProducts, 
    //   categories, 
    //   sortedByCategories})

  // return {
  //   props: { sortedByCategories }
  // }
  const paths = allProducts.map(product => ({params: {slug: product.title}}));
  console.log("OUTPUT ÄR: getStaticPaths -> paths", paths)

  return {paths}
};

export async function getStaticProps({ params }){
  console.log("OUTPUT ÄR: getStaticProps -> params", params)

  return {props: params.title}
}

// export async function getStaticProps(content){
//   const res = await fetch("api/products");
//   const data = await res.json();
//   console.log("OUTPUT ÄR: getStaticProps -> data", data)

//   return {
//     props: ""
//   }
// }

export default Category;