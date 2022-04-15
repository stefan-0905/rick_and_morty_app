import { createContext, ReactNode, useContext, useState } from 'react';
import { IFormFilter } from '../models/FormFilter';

interface IDashboardContext {
  setFilter: (
    property: string,
    value: string | number
  ) => void;
  filters: IFormFilter;
}

interface IDashboardProvider {
  children: ReactNode;
}

export const DashboardContext = createContext<IDashboardContext>({
  filters: {
    name: '',
    status: '',
    page: 1,
  },
  setFilter: (
    property: string,
    value: string | number
  ) => {},
});

export const useDashboardContext = () => useContext(DashboardContext);

const DashboardProvider = ({ children }: IDashboardProvider) => {
  const [filters, setFilters] = useState<IFormFilter>({
    name: '',
    status: '',
    page: 1,
  });

  const setFilter = (
    property: string,
    value: string | number
  ) => {
    setFilters((filts) => ({ ...filts, page: 1, [property]: value }));
  };

  return (
    <DashboardContext.Provider value={{ filters, setFilter }}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
