import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './tailwind.css'
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './Root'
import { createTheme, ThemeProvider } from '@mui/material';
import Home from './pages/home/screens/Home';
import Blogs from './pages/blogs/screens/Blogs';
import AddBlog from './pages/add/screens/AddBlog';
import Error from './pages/error/Error';
import AuthDialog from './pages/auth/screens/AuthDialog';
import Provider from './provider';
import UserProfilePage from './pages/profile/screens/UserProfilePage';
import ChangePassword from './pages/profile/screens/ChangePassword';
import MyBlogs from './pages/blogs/screens/MyBlogs';
import BlogDetail from './pages/detail/screens/BlogDetail';
import Bookmark from './pages/bookmark/screens/Bookmark';
import AboutUs from './pages/aboutus/screens/AboutUs';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Itim',
      'cursive'
    ].join(',')
  },

  palette: {
    primary: {
      main: '#936464'
    },
    secondary: {
      main: '#474747'
    },
    text: {
      main: "#FFFFFF"
    },
    background: {
      main: "#F5F5F5"
    },
    button: {
      main: "#649393"
    }
  }
})

const currentUser = JSON.parse(localStorage.getItem('currentUser'))


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root user={currentUser}/>,
    children: [
      {
        path: '/',
        errorElement: <Error />,
        element: <Home user={currentUser}/>,
      },
      {
        path:'/blogs',
        element: <Blogs />,
        errorElement: <Error />,
      },
      {
        path:'/add/:id',
        element: <AddBlog user={currentUser}/>,
        errorElement: <Error />,
      },
      {
        path:'/profile',
        element: <UserProfilePage user={currentUser}/>,
        errorElement: <Error />,
      },
      {
        path:'/my-blogs',
        errorElement: <Error />,
        element: <MyBlogs user={currentUser}/>
      },
      {
        path:'/password',
        element: <ChangePassword user={currentUser}/>,
        errorElement: <Error />,
      },
      {
        path:'/blogs/:id',
        element: <BlogDetail user={currentUser}/>,
        errorElement: <Error />
      },
      {
        path:'/aboutus',
        element: <AboutUs />,
        errorElement: <Error />
      },
      {
        path:'/help',
        errorElement: <Error />
      },
      {
        path:'/privacy',
        errorElement: <Error />
      },
      {
        path:'/bookmark',
        element:<Bookmark user={currentUser}/>,
        errorElement: <Error />
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider>
        <RouterProvider router={router} />
        <AuthDialog />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
