import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3024/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching products:', err);
                setError('Failed to load products');
                setLoading(false);
            });
    }, []);

    return (
        <div className="container mt-5">
            {loading ? (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            ) : error ? (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            ) : (
                <div className="row">
                    {products.map((product) => (
                        <div key={product.id} className="col-md-4 mb-4">
                            <div className="card h-100">
                                <img
                                    src={product.image || 'https://via.placeholder.com/150'}
                                    alt={product.name}
                                    className="card-img-top"
                                    style={{ height: '200px', objectFit: 'cover', borderRadius: '8px' }}
                                />
                                <div className="card-body text-center">
                                    <h3 className="card-title">{product.name}</h3>
                                    <p className="card-text" style={{ fontWeight: 'bold', fontSize: '18px' }}>
                                        {product.age} $
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;
