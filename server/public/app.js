document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const addProductForm = document.getElementById('addProductForm');
    const editProductForm = document.getElementById('editProductForm');
    const editProductModal = document.getElementById('editProductModal');
    const closeModalBtn = document.querySelector('.close');
    let editProductId = null;
    let products = [];

    // Fetch products from the server
    const fetchProducts = () => {
        fetch('/products')
            .then(response => response.json())
            .then(data => {
                products = data.products;
                productList.innerHTML = ''; // Clear the existing product list
                products.forEach(product => {
                    const productCard = document.createElement('div');
                    productCard.className = 'card ml-2 mr-2';

                    productCard.innerHTML = `
                        <img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>${product.price} $</p>
                        <button class="edit-btn btn btn-warning" data-id="${product._id}">Edit</button>
                        <button class="delete-btn btn btn-danger" data-id="${product._id}">Delete</button>
                    `;

                    productList.appendChild(productCard);
                });

                // Attach event listeners to delete buttons
                const deleteButtons = document.querySelectorAll('.delete-btn');
                deleteButtons.forEach(button => {
                    button.addEventListener('click', handleDelete);
                });

                // Attach event listeners to edit buttons
                const editButtons = document.querySelectorAll('.edit-btn');
                editButtons.forEach(button => {
                    button.addEventListener('click', handleEdit);
                });
            })
            .catch(error => console.error('Error fetching products:', error));
    };

    addProductForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const newProduct = {
            name: document.getElementById('productName').value,
            price: document.getElementById('productPrice').value,
            image: document.getElementById('productImage').value || 'https://via.placeholder.com/150'
        };

        fetch('/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
            .then(response => {
                if (response.ok) {
                    fetchProducts(); // Refresh the product list after adding a new product
                    addProductForm.reset(); // Clear the form
                } else {
                    console.error('Error adding product');
                }
            })
            .catch(error => console.error('Error:', error));
    });

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

    // Handle product edit
    const handleEdit = (event) => {
        const productId = event.target.getAttribute('data-id');
        editProductId = productId;
        const product = products.find(p => p._id === productId);

        if (product) {
            document.getElementById('editProductName').value = product.name;
            document.getElementById('editProductPrice').value = product.price;
            document.getElementById('editProductImage').value = product.image;
        }

        // Show the modal
        editProductModal.style.display = 'block';
    };

    // Handle product update
    const handleUpdate = (event) => {
        event.preventDefault();

        const updatedProduct = {
            name: document.getElementById('editProductName').value,
            price: document.getElementById('editProductPrice').value,
            image: document.getElementById('editProductImage').value
        };

        fetch(`/products/${editProductId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
        })
            .then(response => {
                if (response.ok) {
                    fetchProducts(); // Refresh the product list after updating a product
                    editProductModal.style.display = 'none'; // Hide the modal
                } else {
                    console.error('Error updating product');
                }
            })
            .catch(error => console.error('Error:', error));
    };

    // Close the modal when the user clicks outside of it
    window.addEventListener('click', (event) => {
        if (event.target === editProductModal) {
            editProductModal.style.display = 'none';
        }
    });

    // Close the modal
    closeModalBtn.addEventListener('click', () => {
        editProductModal.style.display = 'none';
    });

    // Fetch products on page load
    fetchProducts();

    // Attach event listener to the edit form
    editProductForm.addEventListener('submit', handleUpdate);
});
