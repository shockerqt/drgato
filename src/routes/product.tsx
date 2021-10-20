import '../styles/product.scss';

import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router';

import {
  Navbar,
  Breadcrumb,
  Select,
  Dialog,
  FilterIcon,
  SortIcon,
} from '../common';

import LukanexImage from '../assets/images/lukanex.webp';
import CruzVerdeLogo from '../assets/images/cruz-verde.png';
import SalcobrandLogo from '../assets/images/salcobrand.png';
import FarmaciasAhumadaLogo from '../assets/images/farmacias-ahumada.png';

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
    format: '5 mg',
  });

  const [pharmacyList, setPharmacyList] = useState([
    {
      id: 0,
      name: 'Cruz Verde',
      logo: CruzVerdeLogo,
      stars: 1.7,
      products: [
        {
          laboratory: 'MINTLAB',
          format: 'Comprimidos 500mg',
          quantity: 20,
          price: 132952,
        },
        {
          laboratory: 'MINTLAB',
          format: 'Comprimidos 500mg',
          quantity: 10,
          price: 52952,
        },
        {
          laboratory: 'MINTLAB',
          format: 'Comprimidos 500mg',
          quantity: 5,
          price: 12952,
        },
      ],
    },
  ]);

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
            <p>{product.format}</p>
          </div>
        </div>
        <div className="product-selectors">
          <Select
            className="product-selector"
            label={'Laboratorio'}
            initSelected={{ label: 'Option 1', value: 'value1' }}
            options={[
              { label: 'Option 1', value: 'value1' },
              { label: 'Option 2', value: 'value2' },
              { label: 'Option 3', value: 'value3' },
            ]} />
          <Select
            className="product-selector"
            label={'Formato'}
            initSelected={{ label: 'Option 1', value: 'value1' }}
            options={[
              { label: 'Todos los formatos', value: 'all' },
              { label: 'Comprimidos 500mg', value: 'value1' },
              { label: 'Comprimidos 1000mg', value: 'value2' },
              { label: 'Gotas', value: 'value3' },
            ]} />
        </div>
      </header>
      <main>
        <div className="dialog-buttons">
          <Dialog className="dialog-root">
            <button>
              <FilterIcon />
              Filtrar
            </button>
            <div>window</div>
          </Dialog>
          <Dialog className="dialog-root">
            <button>
              <SortIcon />
              Ordenar
            </button>
            <div>window</div>
          </Dialog>
        </div>
      </main>
    </div>
  );
};
