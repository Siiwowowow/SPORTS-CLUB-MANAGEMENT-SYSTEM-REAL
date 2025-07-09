import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router";
import { router } from './Routes/Routes.jsx';
import AuthProvider from './Context/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <Toaster position="top-center" reverseOrder={false} />
    <RouterProvider router={router} />
    </AuthProvider>
    </QueryClientProvider>
    </div>
  </StrictMode>,
)
