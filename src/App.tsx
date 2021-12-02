import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './routes';

import { DataContext } from './utils/context';

// const Product = React.lazy(() => import(/* webpackChunkName: "product" */ './routes/product'));
const Products = React.lazy(() => import(/* webpackChunkName: "products" */ './routes/Products'));

const Home = () => <div>Home</div>;

const App = () => {
  const [categories, setCategories] = useState({});

  // fetch global data on initial render
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('https://data.drgato.com/constraints.json');
      console.log(await response.json());
    };

    fetchCategories();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<Home />} />

        <Route path="remedios" element={
          <React.Suspense fallback={<>...</>}>
            <Products section="remedies" />
          </React.Suspense>
        }/>

      </Route>
    </Routes>
  );
};

export default App;
