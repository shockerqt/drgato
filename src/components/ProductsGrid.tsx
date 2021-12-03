import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '.';
import { Product } from '../routes/Products';
import './ProductsGrid.scss';

const PAGE_SIZE = 12;

const ProductsGrid = ({ products }: { products: Product[] }) => {
  const [searchParams] = useSearchParams();
  const pages = products.length / PAGE_SIZE;

  const page = parseInt(searchParams.get('page') || '1');
  const productsInPage = products.slice(PAGE_SIZE * (page - 1), PAGE_SIZE * page);

  const toPageSearchParams = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (page === 1) newSearchParams.delete('page');
    else newSearchParams.set('page', page.toString());
    return newSearchParams.toString();
  };


  return (
    <main className="products-grid-container">
      <div className="products-grid">
        {productsInPage.map(product => (
          <Link className="products-grid-item" to={product.slug} key={product.slug}>
            <div className="products-grid-item-image-container">
              {/* <img className="products-grid-item-image" src=""></img> */}
            </div>
            <h1>{product.title}</h1>
            {product.description}
          </Link>
        ))}
      </div>
      <div className="products-grid-pagination">
        {page > 1 ?
          <Link to={{ search: toPageSearchParams(page - 1) }}>
            <ChevronLeftIcon className="white-button products-grid-pagination-arrowicon" />
          </Link> : ''}
        <Link className="white-button" to={{ search: toPageSearchParams(4) }}>4</Link>
        <Link className="white-button" to={{ search: toPageSearchParams(5) }}>5</Link>
        {page < pages ?
          <Link to={{ search: toPageSearchParams(page + 1) }}>
            <ChevronRightIcon className="products-grid-pagination-arrowicon" />
          </Link> : ''}
        {/* <button onClick={() => setPage(currentPage => currentPage - 1 > 0 ? currentPage - 1 : 1)}>Prev</button>
        <button onClick={() => setPage(currentPage => currentPage + 1)}>Next</button> */}
      </div>
    </main>
  );
};

export default ProductsGrid;
