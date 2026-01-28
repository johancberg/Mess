import { createRoot } from 'react-dom/client';
import * as serviceWorker from './serviceWorker';
import { createBrowserRouter, RouterProvider } from 'react-router';

import { routeData } from './App';

const router = createBrowserRouter(routeData);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <RouterProvider router={router} />
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
