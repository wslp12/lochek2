import { Outlet } from 'react-router-dom';

const Main = () => {
  return (
    <div
      className="p-2"
      style={{
        gridArea: 'main',
      }}
    >
      <div
        className="bg-[#0b1130] rounded-md h-full text-[white] bg-opacity-5 overflow-auto"
        style={{
          boxShadow: '0px 0px 10px 0px rgba(255,255,255,0.2)',
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};
export default Main;
