import Header from '../../components/Header/Header';
import CharacterList from '../../components/CharacterList/CharacterList';
import DashboardProvider from '../../contexts/DashboardProvider';

const Dashboard = () => {
  return (
    <DashboardProvider>
      <div className={`min-vh-100 bg-light`}>
        <Header />
        <CharacterList />
      </div>
    </DashboardProvider>
  );
};

export default Dashboard;
