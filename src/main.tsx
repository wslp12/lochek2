import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import AppRoutes from './AppRoutes';
import ModalContainer from './components/Modal/ModalContainer';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <AppRoutes />
      <ModalContainer />
    </RecoilRoot>
  </React.StrictMode>,
);
