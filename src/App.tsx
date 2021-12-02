import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './routes';

// const Product = React.lazy(() => import(/* webpackChunkName: "product" */ './routes/product'));
const Products = React.lazy(() => import(/* webpackChunkName: "products" */ './routes/Products'));

const Home = () => <div>Home</div>;

export interface Category {
  name: string;
  remedies: string[];
}

export interface Constraints {
  pharmacies: {
    [slug: string]: { name: string };
  };
  sections: {
    remedies: {
      name: string;
      categories: {
        [slug: string]: Category;
      };
    };
  };
}

const App = () => {
  const [constraints, setConstraints]: [Constraints, Dispatch<SetStateAction<Constraints>>] = useState({
    pharmacies: {},
    sections: {
      remedies: { name: 'Remedios', categories: {} },
    },
  });

  // fetch global data on initial render
  useEffect(() => {
    const fetchConstraints = async () => {
      const response = await fetch('https://data.drgato.com/constraints.json');
      setConstraints(await response.json());
    };

    fetchConstraints();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout constraints={constraints} />}>

        <Route index element={<Home />} />

        <Route path="remedios" element={
          <React.Suspense fallback={<>...</>}>
            <Products section="remedies" constraints={constraints} />
          </React.Suspense>
        }/>

      </Route>
    </Routes>
  );
};

export default App;
