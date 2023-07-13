import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import fixedProducts from '../../constants';
import Input from '../../components/main/search';
import Card from '../../components/main/products/card/index';
import './styles.css';

function ProductList() {
    const [search, setSearch] = useState('');
    const [active, setActive] = useState(false);
    const [productFiltered, setProductFiltered] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedCategory = queryParams.get('category');
    const navigate = useNavigate();

    const products = fixedProducts;

    useEffect(() => {
        filterByCategory(selectedCategory);
    }, [selectedCategory]);

    const onShowDetails = (id) => {
        navigate(`/products/${id}`);
    };

    const filterBySearch = (query) => {
        let updatedProductList = [...products];

        updatedProductList = updatedProductList.filter(
            (item) =>
                item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
        );

        setProductFiltered(updatedProductList);
    };

    const filterByCategory = (category) => {
        if (category) {
            let updatedProductList = [...products];

            updatedProductList = updatedProductList.filter(
                (item) => item.category === category
            );

            setProductFiltered(updatedProductList);
        } else {
            setProductFiltered(products);
        }
    };

    const onChange = (event) => {
        const value = event.target.value;
        setSearch(value);
        filterBySearch(value);
    };

    const onFocus = () => {
        setActive(true);
    };

    const onBlur = () => {
        setActive(false);
    };

    return (
        <>
            <div className="inputContainer">
                <Input
                    placeholder="busca un producto"
                    id="task"
                    required={true}
                    name="Search"
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    active={active}
                />
            </div>
            <div className="cardContainer">
                {search.length > 0 && productFiltered.length === 0 && (
                    <h2>Product not found</h2>
                )}
                {productFiltered.map((product) => (
                    <Card
                        key={product.id}
                        {...product}
                        onShowDetails={onShowDetails}
                    />
                ))}
            </div>
        </>
    );
}

export default ProductList;
