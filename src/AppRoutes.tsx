import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Auth from './Auth';
import CharSettingContent from './components/CharSettingContent/CharSettingContent';
import MainLayout from './components/Layout/MainLayout';
import MainContent from './components/MainContent/MainContent';
import RaidInfo from './components/RaidInfo/RaidInfo';
import ROUTE_PATH from './enum/route.enum';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/*'
          element={
            <Auth>
              <MainLayout />
            </Auth>
          }
        >
          <Route path={ROUTE_PATH.MAIN} element={<MainContent />} />
          <Route path={ROUTE_PATH.CHAR_SETTING} element={<CharSettingContent />} />
          <Route path={ROUTE_PATH.RAID_INFO} element={<RaidInfo />} />
          <Route path='*' element={<Navigate to={`/${ROUTE_PATH.MAIN}`} replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
