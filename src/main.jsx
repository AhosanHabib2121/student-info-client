import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import myCreateRouter from './router/Routes.jsx'
import AuthProviders from './authProviders/AuthProviders'
import {QueryClient,QueryClientProvider,} from "@tanstack/react-query";

const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProviders>
        <RouterProvider router={myCreateRouter} />
      </AuthProviders>
    </QueryClientProvider>
  </React.StrictMode>
);
