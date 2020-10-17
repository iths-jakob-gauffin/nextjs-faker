import {useEffect, useState} from "react";
import Head from "next/head";

import styles from "./App.module.scss";

import {ProductPage} from "./ProductPage/ProductPage";

const App = (props) => {
  console.log("OUTPUT ÄR: App -> props", props)
  // const [products, setProducts] = useState({categories: [], items: []})
  // console.log("OUTPUT ÄR: App -> products", products)
  
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const res = await fetch("/api/products");
  //       let allProducts = await res.json();
  //       const uniqueCategories = [...new Set(allProducts.map(x => x.category))];

  //       setProducts({items: allProducts, categories: uniqueCategories})
  //     } catch (err) {
  //       console.error(err)
  //     }
  //   })();  
  // }, [])

  return(
    <div className={styles["App"]}>
      <Head>
        <title>Next js fake shop</title>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap" rel="stylesheet" /> 
      </Head>
      <h1 className={styles["App__Title"]}>Welcome to homepage</h1>
    </div>
  )
}

export default App;