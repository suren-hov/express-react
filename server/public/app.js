document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');

    // Fetch products from the server
    fetch('/products')
        .then(response => response.json())
        .then(data => {
            data.products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'card';

                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.price} $</p>
                `;

                productList.appendChild(productCard);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
});
