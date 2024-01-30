import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { LogIn, LogOut } from '../../redux/slices/userSlice';
import Header from '../header'
import NotifyUser from '../notification';
import Footer from '../footer';

function OutletWrapper() {
  const navigate = useNavigate();
  const uiMessages = useSelector(state => state.ui);
  const shouldShow = Object.values(uiMessages).some(message => message !== null);

  const userData = useSelector(state => state.user);
  const dispatch = useDispatch();

  if (userData.auth === null) {
    const reauthorizeUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/api/auth`, {
          withCredentials: true,
          credentials: "include",
        });
        if (response.status === 200) {
          dispatch(LogIn(response.data))
        }
      } catch (error) {
        dispatch(LogOut());
      }
    };

    reauthorizeUser();
  }

  return (
    <>
      {shouldShow ? <NotifyUser messages={uiMessages} /> : null}
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default OutletWrapper