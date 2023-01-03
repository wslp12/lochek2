import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Auth from './Auth';
import CharacterSettingContent from './components/CharSettingContent/CharSettingContent';
import GroupItem from './components/GroupItem/GroupItem';
import MainLayout from './components/Layout/MainLayout';
import MainContent from './components/MainContent/MainContent';
import RaidInfo from './components/RaidInfo/RaidInfo';
import Schedule from './components/Schedule/Schedule';
import { ROUTE_PATH } from './enum/route.enum';
import Login from './pages/Login/Login';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Auth>
              <MainLayout />
            </Auth>
          }
        >
          <Route path={ROUTE_PATH.MAIN} element={<MainContent />} />
          <Route path={ROUTE_PATH.CHAR_SETTING} element={<CharacterSettingContent />} />
          <Route path={ROUTE_PATH.RAID_INFO} element={<RaidInfo />} />
          <Route path={ROUTE_PATH.SCHEDULE} element={<Schedule />} />
          <Route path={`${ROUTE_PATH.USERS}/:userId`} element={<GroupItem />} />
          <Route path="*" element={<Navigate to={ROUTE_PATH.MAIN} />} />
        </Route>
        <Route path={ROUTE_PATH.LOGIN} element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
