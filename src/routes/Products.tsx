import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';

import ProductsGrid from '../components/ProductsGrid';
import ProductsFilters from '../components/ProductsFilters';
import ProductsSorters from '../components/ProductsSorters';

import './Products.scss';
import { Constraints } from '../App';
import { useSearchParams } from 'react-router-dom';

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
  category: string;
  description: JSX.Element;
}

const Products = ({ section, constraints }: { section: keyof Constraints['sections'], constraints: Constraints }) => {
  const [searchParams] = useSearchParams();
  const [products, setProducts]: [Product[], Dispatch<SetStateAction<Product[]>>] = useState<Product[]>([]);

  const selectedCategories = searchParams.getAll('cat');
  const order = searchParams.get('order');

  const filteredProducts = useMemo(() => {
    console.log('FILTER', selectedCategories);
    if (selectedCategories.length) {
      return products.filter(product => selectedCategories.includes(product.category));
    } else {
      return [];
    }
  }, [JSON.stringify(selectedCategories), products]);

  const sortedProducts = useMemo(() => {
    console.log('SORT');
    return filteredProducts;
  }, [filteredProducts, order]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`https://data.drgato.com/${section}.json`);

      if (section === 'remedies') {
        const { remedies }: { [slug: string]: Remedy } = await response.json();
        console.log(remedies);
        setProducts(Object.entries(remedies).map(([slug, remedy]: [string, Remedy]) => ({
          title: remedy.name,
          slug,
          category: remedy.category,
          description: (
            <>
              <p>{remedy.activePrinciple}</p>
              {remedy.netContent && remedy.netContentUnit && <p>{`${remedy.netContent} ${remedy.netContentUnit}`}</p>}
              {remedy.dose && <p>{`${remedy.dose}`}</p>}
            </>
          ),
        })));
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="products">

      <ProductsFilters categories={constraints.sections[section].categories} />
      <ProductsSorters productsQuantity={sortedProducts.length} />
      <ProductsGrid products={sortedProducts} />

    </div>
  );
};

export default Products;
