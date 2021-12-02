import { Link } from 'react-router-dom';
import { Product } from '../routes/Products';
import './ProductsGrid.scss';

const ProductsGrid = ({ products }: { products: Product[] }) => {

  return (
    <main className="products-grid-container">
      <div className="products-grid">
        {products.map(product => (
          <Link className="products-grid-item" to={product.slug}>
            <div className="products-grid-item-image-container">
              {/* <img className="products-grid-item-image" src=""></img> */}
            </div>
            <h1>{product.title}</h1>
            {product.description}
          </Link>
        ))}
      </div>
      <div className="products-grid-pagination"></div>
    </main>
  );
};

export default ProductsGrid;
