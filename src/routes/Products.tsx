import { useEffect, useState } from 'react';

import ProductsGrid from '../components/ProductsGrid';
import ProductsFilters from '../components/ProductsFilters';
import ProductsSorters from '../components/ProductsSorters';

import './Products.scss';

const Products = ({ section }: { section: string }) => {
  const [products, setProducts] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`https://data.drgato.com/${section}.json`);
      console.log(await response.json());
    };

    fetchProducts();
  }, []);

  return (
    <div className="products">

      <ProductsFilters />
      <ProductsSorters />
      <ProductsGrid />

    </div>
  );
};

export default Products;
