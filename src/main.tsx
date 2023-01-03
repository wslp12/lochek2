import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AppRoutes from './AppRoutes';
import ModalContainer from './components/Modal/ModalContainer';
import './index.css';

/**
 * 48 시간
 */
const cacheTime = 1000 * 60 * 60 * 48;
const retry = 0;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime,
      retry,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <AppRoutes />
          <ModalContainer />
          <ToastContainer />
          <ReactQueryDevtools position="bottom-right" />
        </RecoilRoot>
      </QueryClientProvider>
    </LocalizationProvider>
  </React.StrictMode>,
);
