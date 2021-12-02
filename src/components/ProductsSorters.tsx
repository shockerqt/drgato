import { Link, LinkProps, useSearchParams } from 'react-router-dom';
import './ProductsSorters.scss';



interface SorterLinkProps extends Omit<LinkProps, 'to'> {
  order: string;
}

const SorterLink = ({ children, order }: SorterLinkProps) => {
  const [searchParams] = useSearchParams();

  const isActive = searchParams.get('order') === order;

  const getNewSearchParams = () => {
    const newSearchParams = new URLSearchParams(searchParams);
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

const ProductsSorters = () => {

  return (
    <header className="products-sorters">
      <div className="products-sorters-quantity">
        127 <span className="color-foreground-light">productos</span>
      </div>
      <SorterLink order="name-asc">A-Z</SorterLink>
      <SorterLink order="name-desc">Z-A</SorterLink>
      <SorterLink order="price-asc">Del más barato</SorterLink>
      <SorterLink order="price-desc">Del más caro</SorterLink>
    </header>
  );
};

export default ProductsSorters;
