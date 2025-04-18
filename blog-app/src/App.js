import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navbar';
import EditPost from './components/EditPost';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import BlogDetails from './pages/BlogDetails';
import CreateBlog from './pages/CreateBlog';
import SearchResults from './components/SearchResults';
import { Container } from 'react-bootstrap';
import Profile from "./components/Profile";
import AuthPage from "./components/AuthPage"; // Adjust the path if needed

function App() {
  return (
      <>
        <Navigation />
        <Container className="mt-4">
          <Routes>
            {/* Redirect / to /home */}
            <Route path="/" element={<Navigate to="/home" />} />
              {/*<Route path="/login" element={<AuthPage />} />*/}
              {/*<Route path="/register" element={<AuthPage />} />*/}
              {/*<Route path="*" element={<Navigate to="/login" replace />} />*/}
            {/* New Home route */}
            <Route path="/home" element={<Home />} />
            <Route path="/posts/:id" element={<BlogDetails />} />
            <Route path="/create" element={<CreateBlog />} />
            <Route path="/edit-post/:id" element={<EditPost />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Container>
      </>
  );
}

export default App;
