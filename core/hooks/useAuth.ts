import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, useAppSelector } from '@core/redux';
import { logout as logoutAction } from '@core/redux/reducers/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector((state:any) => state.auth);

  const logout = () => {
    dispatch(logoutAction());
    navigate('/hrlink/login');
  };

  return {
    ...auth,
    logout,
  };
};
