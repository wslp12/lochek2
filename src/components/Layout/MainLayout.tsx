import Lnb from './Lnb';
import Main from './Main';

function MainLayout() {
  return (
    <div
      className="w-full h-full"
      style={{
        background:
          'linear-gradient(to top, rgb(30, 30, 30) , rgb(50, 50, 50), rgb(50, 50, 50), rgb(70, 70, 70), rgb(70, 70, 70), rgb(50, 50, 50), rgb(30, 30, 30))',
      }}
    >
      <div
        className="grid gap-2 h-full w-full"
        style={{
          gridTemplateRows: '1fr 1fr',
          gridTemplateColumns: '5rem 1fr',
          gridTemplateAreas: `'lnb main main''lnb main main'`,
        }}
      >
        <Lnb />
        <Main />
      </div>
    </div>
  );
}

export default MainLayout;
