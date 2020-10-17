import { ProductPage } from "../../components/ProductPage/ProductPage";

const Category = ({params, sortedByCategories}) => {
    return (
        <>
        {params && params.category &&
            <ProductPage products={sortedByCategories[params.category]} />
        }
        </>
    )
};

export async function getStaticPaths() {
    const res = await fetch("http://localhost:4001/api/products");
    const allProducts = await res.json();

    const paths = allProducts.map((product) => ({
        params: { category: product.title},
    }));

    return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
    const res = await fetch("http://localhost:4001/api/products");
    const allProducts = await res.json();

    const categories = [...new Set(allProducts.map((x) => x.category))];

    let sortedByCategories = {};

    categories.map((unique) => {
        let filtered = allProducts.filter(
            (product) => product.category === unique
        );

        sortedByCategories = { ...sortedByCategories, [unique]: filtered };
    });

    return { props: {params, sortedByCategories} };
}

export default Category;
