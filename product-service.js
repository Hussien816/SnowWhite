class ProductService {
    constructor() {
        this.apiUrl = 'http://localhost:5037/api/Products';
    }

    // Function to filter products by price
    filterProductsByPrice(products, minPrice) {
        return products.filter(product => product.price > minPrice);
    }

    // Function to filter products by size
    filterProductsBySize(products, selectedSizes) {
        return products.filter(product => 
            product.productSizes.some(size => selectedSizes.includes(size.size))
        );
    }

    // Function to get available sizes by category
    async getAvailableSizes(categoryId) {
        const products = await this.getProductsByCategory(categoryId);
        const sizes = new Set();
        products.forEach(product => {
            product.productSizes.forEach(size => sizes.add(size.size));
        });
        return Array.from(sizes).sort();
    }

    // Function to load products by category and sizes
    async loadPageProducts(selectedSizes = []) {
        const currentPage = window.location.pathname.split('/').pop();
        let categoryId;

        switch (currentPage) {
            case 'men.html':
                categoryId = 10;
                break;
            case 'women.html':
                categoryId = 7;
                break;
            case 'kids.html':
                categoryId = 8;
                break;
            default:
                return;
        }

        try {
            const products = await this.getProductsByCategory(categoryId);
            const filteredProducts = selectedSizes.length > 0 
                ? this.filterProductsBySize(products, selectedSizes)
                : products;
            this.displayProducts(filteredProducts);
        } catch (error) {
            console.error('Error loading products:', error);
        }
    }

    async getProducts() {
        try {
            const response = await fetch(this.apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.addBaseUrlToImagePath(data);
            return data;
        } catch (error) {
            console.error('Error getting products:', error);
            throw error;
        }
    }

    async getProduct(id) {
        try {
            const response = await fetch(`${this.apiUrl}/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            this.addBaseUrlToImagePath([result.product]);
            return result.product;
        } catch (error) {
            console.error('Error getting product:', error);
            throw error;
        }
    }

    async getProductsByCategory(categoryId) {
        try {
            const response = await fetch(`${this.apiUrl}/category/${categoryId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            this.addBaseUrlToImagePath(result);
            return result;
        } catch (error) {
            console.error('Error getting products by category:', error);
            throw error;
        }
    }

    addBaseUrlToImagePath(products) {
        const baseUrl = 'http://localhost:5037/';
        products.forEach(product => {
            if (product.imagePath && !product.imagePath.startsWith('http')) {
                product.imagePath = `${baseUrl}${product.imagePath}`;
            }
            if (product.imagePaths) {
                product.imagePaths = product.imagePaths.map(path => 
                    path.startsWith('http') ? path : `${baseUrl}${path}`
                );
            }
        });
    }

    displayProducts(products) {
        const container = document.querySelector('.pro-container');
        if (!container) return;

        if (products.length > 0) {
            container.innerHTML = products.map(product => `
                <div class="pro" onclick="window.location.href='product-detail.html?id=${product.productId}'">
                    <div class="image-container">
                        ${product.imagePath ? `<img src="${product.imagePath}" alt="${product.productName}">` : ''}
                        ${product.imagePaths && product.imagePaths.length > 0 
                            ? product.imagePaths.slice(0, 2).map(path => `<img src="${path}" alt="${product.productName}">`).join('') 
                            : ''}
                    </div>
                    <div class="des">
                        <h5>${product.productName}</h5>
                        <div class="star">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                        <h4>$${product.price.toFixed(2)}</h4>
                    </div>
                    <button class="normal" onclick="addToCart(${product.productId}); event.stopPropagation();">Add to Cart</button>
                </div>
            `).join('');
        } else {
            container.innerHTML = '<p>No products found.</p>';
        }
    }
}

// Create a global instance
const productService = new ProductService();

// Load products when page loads
document.addEventListener('DOMContentLoaded', function() {
    productService.loadPageProducts();
});
