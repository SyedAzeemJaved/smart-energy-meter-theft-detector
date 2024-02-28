import { AdminProps } from './data';

export interface UserContextProps {
  user: AdminProps;
  setUser: (patient: AdminProps) => void;
  logout: () => void;
  loading: boolean;
  setLoading: (prop: boolean) => void;
}
