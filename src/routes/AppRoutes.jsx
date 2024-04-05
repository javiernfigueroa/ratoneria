import { Routes, Route } from 'react-router';
import Home from '../views/Home';
import Local from '../views/Local';
import Login from '../views/Login';
import NotFound from '../views/NotFound';
import Post from '../views/Post';
import Profile from '../views/Profile';
import Register from '../views/Register';
import Layout from '../layout/Layout';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';

function AppRoutes() {
  const { isLoggedIn } = useContext(AppContext);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/post"
        element={
          isLoggedIn ? (
            <Layout>
              <Post />
            </Layout>
          ) : (
            <Login />
          )
        }
      />
      <Route
        path="/local/:id"
        element={
          <Layout>
            <Local />
          </Layout>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/post" element={<Post />} />
      <Route
        path="/profile"
        element={
          isLoggedIn ? (
            <Layout>
              <Profile />
            </Layout>
          ) : (
            <Login />
          )
        }
      />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
