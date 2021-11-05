import { Link, LinkProps, useParams, useSearchParams } from 'react-router-dom';
import { CheckIcon, MinusIcon } from '.';

import './ProductsFilters.scss';

interface SubCategoryLinkProps extends Omit<LinkProps, 'to'> {
  subcategory: string;
  number: number;
}

const SubCategoryLink = ({ subcategory, number, children }: SubCategoryLinkProps) => {
  const [searchParams] = useSearchParams();

  const isActive = searchParams.getAll('cat').includes(subcategory);

  const getNewSearchParams = () => {
    const newSearchParams = new URLSearchParams(searchParams);

    const subcategories = newSearchParams.getAll('cat');

    const indexOfSubcategory = subcategories.indexOf(subcategory);
    indexOfSubcategory === -1 ? subcategories.push(subcategory) : subcategories.splice(indexOfSubcategory, 1);

    newSearchParams.delete('cat');

    subcategories.sort();
    subcategories.forEach((subcat) => newSearchParams.append('cat', subcat));

    newSearchParams.sort();

    return newSearchParams.toString();
  };

  return (
    <Link
      className={`products-subcategory-link ${isActive ? 'products-subcategory-link-active' : ''}`}
      to={{ search: getNewSearchParams() }}
      replace>
      {isActive
        ? <CheckIcon className="products-subcategory-link-checkicon" />
        : <MinusIcon className="products-subcategory-link-checkicon" />}
      {children}
      <span>{number}</span>
    </Link>
  );
};

type SubCategories = {
  [key: string]: string;
}

interface AllLinkProps extends Omit<LinkProps, 'to'> {
  subcategories: SubCategories;
}

const AllLink = ({ subcategories, children }: AllLinkProps) => {
  const [searchParams] = useSearchParams();

  const getNewSearchParams = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('cat');
    Object.keys(subcategories).forEach((subcat) => newSearchParams.append('cat', subcat));
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

  const subcategories = {
    'anticonceptivos-y-hormonas': 'Anticonceptivos y hormonas',
    'sistema-respiratorio-y-alergias': 'Sistema respiratorio y alergias',
    'dolor-fiebre-y-antiinflamatorios': 'Dolor, Fiebre y Antiinflamatorios',
  };

  return (
    <aside className="products-filters">
      <div className="products-filters-action-buttons">
        <AllLink subcategories={subcategories}>Seleccionar todos</AllLink>
        <ClearLink>Limpiar</ClearLink>
      </div>
      {Object.entries(subcategories).map(([uri, name]) => (
        <SubCategoryLink subcategory={uri} number={43}>{name}</SubCategoryLink>
      ))}
    </aside>
  );
};

export default ProductsFilters;
