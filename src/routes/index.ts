import { Product } from './product';
import { Category } from './category';

/**
 * List of all routes
 */
export const productRoutes = [{
  Component: Product,
  path: '/medicamento/:productId',
  category: 'Medicamentos',
}];

/**
 * List of all routes
 */
export const categoryRoutes = {
  drugs: {
    Component: Category,
    path: '/medicamentos',
    pathname: 'Medicamentos',
  },
};
