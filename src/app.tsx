import {
  Switch,
  Route,
} from 'react-router-dom';


import { productRoutes, categoryRoutes } from './routes';


export const App = () => (
  <>
    <Switch>
      {productRoutes.map(({ Component, path, category }, index) => (
        <Route path={path} key={index}>
          <Component category={category} />
        </Route>
      ))}
    </Switch>
  </>
);

