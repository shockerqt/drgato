import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import ProductsGrid from '../components/ProductsGrid';
import ProductsFilters from '../components/ProductsFilters';
import ProductsSorters from '../components/ProductsSorters';

import './Products.scss';
import { Constraints } from '../App';

export interface Remedy {
  category: string;
  name: string
  dose?: string;
  activePrinciple: string;
  laboratory: string;
  netContent?: number;
  netContentUnit?: string;
  format?: string;
}

export interface Product {
  title: string;
  slug: string;
  description: string;
}

const Products = ({ section, constraints }: { section: keyof Constraints['sections'], constraints: Constraints }) => {
  const [products, setProducts]: [Product[], Dispatch<SetStateAction<Product[]>>] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`https://data.drgato.com/${section}.json`);

      if (section === 'remedies') {
        const { remedies }: { [slug: string]: Remedy } = await response.json();
        setProducts(Object.entries(remedies).map(([slug, remedy]: [string, Remedy]) => ({
          title: remedy.name,
          slug,
          description: `${remedy.activePrinciple}${remedy.netContent && remedy.netContentUnit ? `\n${remedy.netContent} ${remedy.netContentUnit}` : ''}`,
        })));
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="products">

      <ProductsFilters categories={constraints.sections[section].categories} />
      <ProductsSorters />
      <ProductsGrid products={products} />

    </div>
  );
};

export default Products;
