import { Product } from '../routes/Products';
import './ProductsGrid.scss';

const ProductsGrid = ({ products }: { products: Product[] }) => {

  return (
    <main className="products-grid-container">
      <div className="products-grid">
        {products.map(product => (
          <div className="products-grid-item">
            <h3>{product.title}</h3>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
      <div className="products-grid-pagination"></div>
    </main>
  );
};

export default ProductsGrid;
