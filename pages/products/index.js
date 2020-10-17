import {ProductPage} from "../../components/ProductPage/ProductPage";

const Products = ({ data }) => {
    console.log("Products -> data", data);
    const {allProducts, sortedByCategories, categories} = data;
    return (
        <ProductPage products={allProducts} />
    )
};

export async function getStaticProps(content) {
    const res = await fetch("http://localhost:4001/api/products");

    const allProducts = await res.json();

    // Way to get all categories, one of each that is, in a oneliner
    const categories = [...new Set(allProducts.map((x) => x.category))];

    let sortedByCategories = {};

    categories.map((unique) => {
        let filtered = allProducts.filter(
            (product) => product.category === unique
        );

        sortedByCategories = {
            ...sortedByCategories,
            [unique]: filtered,
        };
    });
    
    return {
        props: {
            data: {
                allProducts,
                categories,
                sortedByCategories,
            },
        },
    };
}

export default Products;
