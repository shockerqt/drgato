import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './routes';

// const Product = React.lazy(() => import(/* webpackChunkName: "product" */ './routes/product'));
const Products = React.lazy(() => import(/* webpackChunkName: "products" */ './routes/Products'));

const Home = () => <div>Home</div>;

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>

      <Route index element={<Home />} />

      <Route path="remedios" element={
        <React.Suspense fallback={<>...</>}>
          <Products category="remedios" />
        </React.Suspense>
      }/>

    </Route>
  </Routes>
);

export default App;

