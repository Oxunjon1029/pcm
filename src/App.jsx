import React, { useMemo, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Admin from './pages/Admin';
import NonAdminUser from './pages/NonAdminUser';
import Comments from './pages/Comments';
import CollectionItems from './pages/CollectionItems';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import { asyncToggleTheme } from './features/theme/themeModeSlice';
import { asyncToggleLang } from './features/lang/langSlice';
import { ToastContainer } from 'react-toastify';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';
import { Box } from '@mui/material';
import { io } from 'socket.io-client';
import { REACT_APP_BASE_URL } from './utils/host';
import { selectUser } from './features/user/userSlice';
const languages = [
  {
    value: 'en',
    text: 'English',
  },
  {
    value: 'uz',
    text: 'Uzbek',
  },
];
const socket = io(`${REACT_APP_BASE_URL}`);
function App() {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const [lang, setLang] = useState('en');
  const currLang = useSelector((state) => state.lang.lang);
  const onChangeLang = (e) => {
    dispatch(asyncToggleLang());
  };
  const [mode, setMode] = useState('light');
  const darkMode = useSelector((state) => state.theme.darkMode);
  const changeMode = () => {
    dispatch(asyncToggleTheme());
  };
  useMemo(() => {
    if (darkMode) {
      setMode('dark');
    } else {
      setMode('light');
    }
  }, [darkMode]);

  useMemo(() => {
    if (currLang) {
      setLang('uz');
    } else {
      setLang('en');
    }
  }, [currLang]);
  const darkTheme = createTheme({
    palette: {
      mode: mode === 'light' ? 'light' : 'dark',
    },
  });

  // useEffect(() => {
  //   const token = getCookie(TOKEN);
  //   isTokenExpired(token, navigator);
  // }, []);
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ToastContainer />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <Header
          changeMode={changeMode}
          checked={darkMode}
          lang={lang}
          languages={languages}
          handleChange={onChangeLang}
        />
        <Box>
          <Routes>
            <Route index path='/' element={<Home lang={lang} />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route
              path='/admin-user'
              element={
                <ProtectedRoute user={user}>
                  <Admin lang={lang} />
                </ProtectedRoute>
              }
            />
            <Route
              path='/user-profile/:id'
              element={
                <ProtectedRoute user={user}>
                  <NonAdminUser lang={lang} />
                </ProtectedRoute>
              }
            />
            <Route
              path='/user-profile'
              element={
                <ProtectedRoute user={user}>
                  <NonAdminUser lang={lang} />
                </ProtectedRoute>
              }
            />
            <Route
              path='/comments'
              element={<Comments socket={socket} lang={lang} />}
            />
            <Route
              path='/collection/items'
              element={<CollectionItems lang={lang} />}
            />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
