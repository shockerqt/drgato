import { Link, LinkProps, useSearchParams } from 'react-router-dom';
import './ProductsSorters.scss';

export type Order = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc'

interface SorterLinkProps extends Omit<LinkProps, 'to'> {
  order: Order;
}

const SorterLink = ({ children, order }: SorterLinkProps) => {
  const [searchParams] = useSearchParams();

  const isActive = searchParams.get('order') === order;

  const getNewSearchParams = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('page');
    newSearchParams.set('order', order);
    return newSearchParams.toString();
  };

  return (
    <Link
      className={`white-button ${isActive ? 'white-button-active' : ''}`}
      to={{ search: getNewSearchParams() }}
      replace>
      {children}
    </Link>
  );
};

const ProductsSorters = ({ productsQuantity }: { productsQuantity: number }) => {

  return (
    <header className="products-sorters">
      <div className="products-sorters-quantity">
        {productsQuantity} <span className="color-foreground-light">{productsQuantity === 1 ? 'producto' : 'productos'}</span>
      </div>
      <SorterLink order="name-asc">A-Z</SorterLink>
      <SorterLink order="name-desc">Z-A</SorterLink>
      <SorterLink order="price-asc">Del más barato</SorterLink>
      <SorterLink order="price-desc">Del más caro</SorterLink>
    </header>
  );
};

export default ProductsSorters;
