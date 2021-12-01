import ProductsGrid from '../components/ProductsGrid';
import ProductsFilters from '../components/ProductsFilters';
import ProductsSorters from '../components/ProductsSorters';

import './Products.scss';

const Products = ({ category }: { category: string }) => {
  return (
    <div className="products">

      <ProductsFilters />
      <ProductsSorters />
      <ProductsGrid />

    </div>
  );
};

export default Products;
