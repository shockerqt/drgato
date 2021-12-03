import { Link, useSearchParams } from 'react-router-dom';

import { ChevronLeftIcon, ChevronRightIcon } from '.';
import { Product } from '../routes/Products';
import './ProductsGrid.scss';

const PAGE_SIZE = 12;

const ProductsGrid = ({ products }: { products: Product[] }) => {
  const [searchParams] = useSearchParams();
  const pages = Math.ceil(products.length / PAGE_SIZE);

  const page = parseInt(searchParams.get('page') || '1');
  const productsInPage = products.slice(PAGE_SIZE * (page - 1), PAGE_SIZE * page);

  const toPageSearchParams = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (page === 1) newSearchParams.delete('page');
    else newSearchParams.set('page', page.toString());
    return newSearchParams.toString();
  };

  const getPages = (): number[] => {
    const pageList = [1];
    if (pages < 5) {
      for (let i = 2; i <= pages; i++) pageList.push(i);
      return pageList;
    }

    if (page <= 4) {
      for (let i = 2; i <= 5; i++) pageList.push(i);
      pageList.push(0);
    } else if (page >= pages - 3) {
      pageList.push(0);
      for (let i = pages - 4; i <= pages - 1; i++) pageList.push(i);
    } else {
      pageList.push(0);
      pageList.push(page - 1);
      pageList.push(page);
      pageList.push(page + 1);
      pageList.push(0);
    }
    pageList.push(pages);

    return pageList;
  };

  const PageLink = ({ toPage }: { toPage: number }) => (
    <Link
      className={`white-button products-grid-pagination-page-number${page === toPage ? ' white-button-active' : ''}`}
      to={{ search: toPageSearchParams(toPage) }}>{toPage}</Link>
  );

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
      {/* {pages > 1} */}
      <div className="products-grid-pagination">
        {page > 1 ?
          <Link
            className="products-grid-pagination-arrow products-grid-pagination-arrow-left"
            to={{ search: toPageSearchParams(page - 1) }}>
            <ChevronLeftIcon className="products-grid-pagination-arrowicon" />
          </Link> : ''}
        <div className="products-grid-pagination-pages">
          {getPages().map(pageNumber => (
            pageNumber === 0 ?
              <div className="products-grid-pagination-ellipsis">...</div> :
              <PageLink toPage={pageNumber} />
          ))}
        </div>
        {page < pages ?
          <Link
            className="products-grid-pagination-arrow products-grid-pagination-arrow-right"
            to={{ search: toPageSearchParams(page + 1) }}>
            <ChevronRightIcon className="products-grid-pagination-arrowicon" />
          </Link> : ''}
        {/* <button onClick={() => setPage(currentPage => currentPage - 1 > 0 ? currentPage - 1 : 1)}>Prev</button>
        <button onClick={() => setPage(currentPage => currentPage + 1)}>Next</button> */}
      </div>
    </main>
  );
};

export default ProductsGrid;
