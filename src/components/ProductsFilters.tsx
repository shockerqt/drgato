import { Link, LinkProps, useSearchParams } from 'react-router-dom';
import { CheckIcon, MinusIcon } from '../utils/icons';
import { Category } from '../App';

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
    newSearchParams.delete('page');

    const categories = newSearchParams.getAll('cat');

    const indexOfCategory = categories.indexOf(category);
    indexOfCategory === -1 ? categories.push(category) : categories.splice(indexOfCategory, 1);

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

interface SelectCategoriesProps extends Omit<LinkProps, 'to'> {
  categories?: { [slug: string]: Category };
}

const SelectCategories = ({ categories, children }: SelectCategoriesProps) => {
  const [searchParams] = useSearchParams();

  const getNewSearchParams = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('page');
    newSearchParams.delete('cat');
    if (categories) Object.keys(categories).forEach((slug) => newSearchParams.append('cat', slug));
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

interface ProductsFiltersProps {
  categories: {
    [slug: string]: Category;
  }
}

const ProductsFilters = ({ categories }: ProductsFiltersProps) => {

  return (
    <aside className="products-filters">
      <div className="products-filters-action-buttons">
        <SelectCategories categories={categories}>Seleccionar todos</SelectCategories>
        <SelectCategories>Limpiar</SelectCategories>
      </div>
      {Object.entries(categories).map(([slug, { name, remedies }]) => (
        <CategoryLink key={slug} category={slug} number={remedies.length}>{name}</CategoryLink>
      ))}
    </aside>
  );
};

export default ProductsFilters;
