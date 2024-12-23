import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate 
} from 'react-router-dom';
import MainLayout from "./layouts/MainLayout";
import NotFoundPage from './pages/NotFoundPage';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Service from './components/Service';
import Booking from './components/Booking';
import Detail from'./components/Detail';
import Tripdetail from './components/Tripdetail';
import Gallery from './components/Gallery';
import Event from './components/Event';
import Blogs from './components/Blog'


const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route path='/home' element={<Home />} />
        <Route path='/' element={<Navigate to="/home" />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/service' element={<Service />} />
        <Route path='/event' element={<Event />} />
        <Route path='/About' element={<About />} />
        <Route path='/book' element={<Booking />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/Detail' element={<Detail />} />
        <Route path='/tripdetail/:id' element={<Tripdetail />} />
        <Route path='/*' element={<NotFoundPage />} />
       
      </Route>
      
    )
  );

  return <RouterProvider router={router} />;
}

export default App
