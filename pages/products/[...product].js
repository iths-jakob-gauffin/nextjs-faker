import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./Product.module.scss";

import { useEffect, useState } from "react";

import { Breadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs";

const Product = ({singleProduct}) => {
    console.log("Product -> singleProduct", singleProduct)
    // console.log("Product -> props", props)
    const router = useRouter();
    // console.log("OUTPUT ÄR: Product -> router", router);
    // const { product } = router.query;

    const urlPath = router.asPath.split("/");

    // const [item, setItem] = useState({});

    // useEffect(() => {
    //     if (!product) {
    //         return;
    //     }
    //     (async () => {
    //         try {
    //             const res = await fetch("/api/products");

    //             const allProducts = await res.json();

    //             const selectedProduct = allProducts.filter(
    //                 (x) => x.id === product[1] * 1
    //             );

    //             setItem(...selectedProduct);
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     })();
    // }, [product]);

    return (
        <>
            {singleProduct && (
                <>
                    <Breadcrumbs url={urlPath} />
                    {/* <Link href={joined}><a className={styles["Copy"]}>Ta o kopiera och se!</a></Link> */}
                    <h1>{singleProduct.title}</h1>
                    <img src={singleProduct.image} alt="" />
                    <p>{singleProduct.description}</p>
                    {/* <h1>{item.title}</h1>
                    <img src={item.image} alt="" />
                    <p>{item.description}</p> */}
                </>
            )}
        </>
    );
};

export default Product;

// export async function getServerSideProps(){
//     const res = await fetch("http://localhost:4001/api/products");
// }

export async function getStaticPaths(){
    const res = await fetch("http://localhost:4001/api/products");
    const allProducts = await res.json();
    const allPaths = allProducts.map(product => product.title)
    
    const categories = [...new Set(allProducts.map((x) => x.category))];

    let sortedByCategories = {};

    let allSlugs = [];
    
    allProducts.map(p => {
        allSlugs = [...allSlugs, "/" +p.id + "/" + p.title]
    })
    
    const allIds = allProducts.map(p => p.id);

    const paths = allProducts.map((product) => ({
        params: { product: allSlugs},
    }));
    
    return { paths, fallback: true };
}

export async function getStaticProps({params}){
    const res = await fetch("http://localhost:4001/api/products");
    const allProducts = await res.json();
    
    let allSlugs = [];
    
    allProducts.map(p => {
        allSlugs = [...allSlugs, p.category + "/" + p.id]
    })
    
    let paramSlug = params.product.join("/");
    
    if(allSlugs.includes(paramSlug)){
        const singleProduct = allProducts.filter(x => x.id === parseInt(params.product[1]))
        
        return{
            props: { singleProduct: singleProduct[0] }
        }
    } else{
        return{
            props: { singleProduct: allProducts[0] }
        }
    }


}