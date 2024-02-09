import { Outlet, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated, ...rest }) => {
  const navigate = useNavigate();
  return isAuthenticated ? <Outlet/> : navigate('/');
};

export default PrivateRoute;
