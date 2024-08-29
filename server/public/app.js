document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');

    // Fetch products from the server
    const fetchProducts = () => {
        fetch('/products')
            .then(response => response.json())
            .then(data => {
                productList.innerHTML = ''; // Clear the existing product list
                data.products.forEach(product => {
                    const productCard = document.createElement('div');
                    productCard.className = 'card';

                    productCard.innerHTML = `
                        <img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>${product.price} $</p>
                        <button class="delete-btn" data-id="${product._id}">Delete</button>
                    `;

                    productList.appendChild(productCard);
                });

                // Attach event listeners to delete buttons
                const deleteButtons = document.querySelectorAll('.delete-btn');
                deleteButtons.forEach(button => {
                    button.addEventListener('click', handleDelete);
                });
            })
            .catch(error => console.error('Error fetching products:', error));
    };

    // Handle product deletion
    const handleDelete = (event) => {
        const productId = event.target.getAttribute('data-id');
        const confirmDelete = confirm("Are you sure you want to delete this product?");

        if (confirmDelete) {
            fetch(`/products/${productId}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (response.ok) {
                        fetchProducts(); // Refresh the product list after deletion
                    } else {
                        console.error('Error deleting product');
                    }
                })
                .catch(error => console.error('Error:', error));
        }
    };

    // Fetch products on page load
    fetchProducts();
});
