import { createBrowserRouter, createHashRouter } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './AuthenticationRoutes';

// =========|| ROUTING RENDER for Web Browser ||========= //
// const router = createBrowserRouter([MainRoutes, LoginRoutes], {
//   // basename: import.meta.env.VITE_APP_BASE_NAME
//   // basename: '/free'
// });

// =========|| ROUTING RENDER for Electron App ||========= //
const router = createHashRouter([MainRoutes, LoginRoutes],{
  // basename: import.meta.env.VITE_APP_BASE_NAME
  // basename: '/free'
})

export default router;
