import {useEffect, useState} from "react";

import styles from "./ProductPage.module.scss";
import classNames from "classnames";
import Link from "next/link";
// import { useRouter } from 'next/router'
// const { products }= router.query

const ProductCard = ({product}) => {
  let truncatedTitle = product.title.split("").slice(0, 30).join("").concat("...");

  return (
  <Link href={`/products/[category]/[...product]`} as={`/products/${product.category}/${product.id}?=${product.title}`}>
      <a className={styles["ProductCard"]} key={product.title}>
        <div className={styles["ProductCard__Wrapper"]}>
          <div className={styles["ProductCard__Outer"]}>
            <div className={styles["ProductCard__ImageWrapper"]}>
              <img src={product.image} alt="produktbild" className={styles["ProductCard__Image"]}/>
            </div>
          </div>
          <h4 className={styles["ProductCard__Title"]}>{truncatedTitle}</h4>
        </div>
      </a>
    </Link>
  )
}

export const ProductPage = ({category, products}) => {
  const [drop, setDrop] = useState(false);

  const slideIn = () => {
      setTimeout(() => {
        setDrop(true)
      }, 50);
    return;
  }

  useEffect(() => {
        setDrop(false);
        slideIn();
  }, [category])

  useEffect(() => {
    setDrop(false)
  }, [])

  return (
  <div className={styles["ProductPage"]}>
    <h2 className={["ProductPage__Title"]}>{category}</h2>
    <ul className={styles["ProductPage__List"]}>
      {products && products.length > 0 &&
      products.map(product => (
        <li className={classNames(styles["ProductPage__ListItem"], {[styles["ProductPage__ListItem--Drop"]]: !drop})} key={product.id}>
          <ProductCard product={product} />
        </li>
      ))
      }
    </ul>
  </div>
  )
}