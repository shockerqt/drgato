import { Link, LinkProps, useParams, useSearchParams } from 'react-router-dom';
import { CheckIcon, MinusIcon } from '.';

import './ProductsFilters.scss';

interface CategoryLinkProps extends Omit<LinkProps, 'to'> {
  category: string;
  number: number;
}

const CategoryLink = ({ category, number, children }: CategoryLinkProps) => {
  const [searchParams] = useSearchParams();

  const isActive = searchParams.getAll('cat').includes(category);

  const getNewSearchParams = () => {
    const newSearchParams = new URLSearchParams(searchParams);

    const categories = newSearchParams.getAll('cat');

    const indexOfSubcategory = categories.indexOf(category);
    indexOfSubcategory === -1 ? categories.push(category) : categories.splice(indexOfSubcategory, 1);

    newSearchParams.delete('cat');

    categories.sort();
    categories.forEach((category) => newSearchParams.append('cat', category));

    newSearchParams.sort();

    return newSearchParams.toString();
  };

  return (
    <Link
      className={`products-category-link ${isActive ? 'products-category-link-active' : ''}`}
      to={{ search: getNewSearchParams() }}
      replace>
      {isActive
        ? <CheckIcon className="products-category-link-checkicon" />
        : <MinusIcon className="products-category-link-checkicon" />}
      {children}
      <span>{number}</span>
    </Link>
  );
};

type SubCategories = {
  [key: string]: string;
}

interface AllLinkProps extends Omit<LinkProps, 'to'> {
  categories: SubCategories;
}

const AllLink = ({ categories, children }: AllLinkProps) => {
  const [searchParams] = useSearchParams();

  const getNewSearchParams = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('cat');
    Object.keys(categories).forEach((category) => newSearchParams.append('cat', category));
    return newSearchParams.toString();
  };

  return (
    <Link
      className="white-button"
      to={{ search: getNewSearchParams() }}
      replace>
      {children}
    </Link>
  );
};

type ClearLinkProps = Omit<LinkProps, 'to'>

const ClearLink = ({ children }: ClearLinkProps) => {
  const [searchParams] = useSearchParams();

  const getNewSearchParams = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('cat');
    return newSearchParams.toString();
  };

  return (
    <Link
      className="white-button"
      to={{ search: getNewSearchParams() }}
      replace>
      {children}
    </Link>
  );
};


const ProductsFilters = () => {

  const categories = {
    'anticonceptivos-y-hormonas': 'Anticonceptivos y hormonas',
    'sistema-respiratorio-y-alergias': 'Sistema respiratorio y alergias',
    'dolor-fiebre-y-antiinflamatorios': 'Dolor, Fiebre y Antiinflamatorios',
  };

  return (
    <aside className="products-filters">
      <div className="products-filters-action-buttons">
        <AllLink categories={categories}>Seleccionar todos</AllLink>
        <ClearLink>Limpiar</ClearLink>
      </div>
      {Object.entries(categories).map(([uri, name]) => (
        <CategoryLink key={uri} category={uri} number={43}>{name}</CategoryLink>
      ))}
    </aside>
  );
};

export default ProductsFilters;
