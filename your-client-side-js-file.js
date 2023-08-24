document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  const productContainer = document.querySelector('.product-list');

  searchInput.addEventListener('input', handleSearchInput);

  async function handleSearchInput(event) {
    const searchTerm = event.target.value;

    try {
      const response = await fetch(`/search?q=${searchTerm}`);
      const searchResults = await response.json();

      // Display search results in the product container
      displayProducts(searchResults);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  }

  function displayProducts(products) {
    productContainer.innerHTML = '';

    products.forEach(product => {
      const productItem = document.createElement('div');
      productItem.classList.add('product-item');
      productItem.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.description}</p>
      `;
      productContainer.appendChild(productItem);
    });
  }
});
