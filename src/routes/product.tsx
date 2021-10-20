import '../styles/product.scss';

import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router';

import { Navbar, Breadcrumb, Select } from '../common';
import LukanexImage from '../assets/images/lukanex.webp';

export const Product = ({ category }: { category: string }) => {
  const { productId } = useParams<{ productId: string }>();
  const location = useLocation();

  console.log('PARAMS', location);

  const [page, setPage] = useState({
    category,
    subCategory: '',
  });

  const [product, setProduct] = useState({
    productId,
    name: 'Lukanex',
    laboratory: 'Montelukast',
    dose: '5 mg',
  });

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <div className="product-container">
      <header>
        <Navbar />
        <Breadcrumb
          crumbs={[
            { path: '/', pathname: 'Inicio' },
            { path: '/medicamentos', pathname: 'Medicamentos' },
          ]} />
        <div className="product-info">
          <img src={LukanexImage} />
          <div className="product-details">
            <h1>{product.name}</h1>
            <p>{product.laboratory}</p>
            <p>{product.dose}</p>
          </div>
        </div>
        <Select
          label={'Laboratorio'}
          initSelected={{ label: 'Option 1', value: 'value1' }}
          options={[
            { label: 'Option 1', value: 'value1' },
            { label: 'Option 2', value: 'value2' },
            { label: 'Option 3', value: 'value3' },
          ]} />
        <Select
          label={'Laboratorio'}
          initSelected={{ label: 'Option 1', value: 'value1' }}
          options={[
            { label: 'Option 1', value: 'value1' },
            { label: 'Option 2', value: 'value2' },
            { label: 'Option 3', value: 'value3' },
          ]} />
      </header>
      <main>
      </main>
    </div>
  );
};
