import { useRouter } from 'next/router';
import Link from "next/link";
import styles from "./Product.module.scss";

import {useEffect, useState} from "react";

import {Breadcrumbs} from "../../components/Breadcrumbs/Breadcrumbs";

const Product = () => {
  const router = useRouter();
  console.log("OUTPUT ÄR: Product -> router", router)
  const { product } = router.query;

  const urlPath = router.asPath.split("/");
  // let joined = stuff.join("/");

  

  const [item, setItem] = useState({});

  useEffect(() => {
    if(!product){
      return;
    } 
    (async () => {
      try {
        const res = await fetch("/api/products");
        
      const allProducts = await res.json();  
      
      const selectedProduct = allProducts.filter(x => x.id === product[1] * 1)
      
      setItem(...selectedProduct);
      
    } catch (err) {
      console.error(err)
    }
  })();    
  }, [product])


  return (
    <>
    {item && 
      <>
      <Breadcrumbs url={urlPath} />
      {/* <Link href={joined}><a className={styles["Copy"]}>Ta o kopiera och se!</a></Link> */}
      <h1>{item.title}</h1>
      <img src={item.image} alt=""/>
      <p>{item.description}</p>
      </>
    }
    </>
  )
}

export default Product;