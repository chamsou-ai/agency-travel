import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Admin/Layout";
import Login from "./Admin/Login";
import PrivateRoute from "./PrivateRoute";
import Home from "./Home";
import Profile from "./Admin/Profile";
import Reservations from "./Admin/ReservationA";
import Reservation from "./Reservation";

function App() {
  const isAuthenticated = () => {
    const token = localStorage.getItem("jwtToken"); // Retrieve the token from storage
    return !!token; // Return true if the token exists, otherwise false
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route exact path='/admin/reservations' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
            <Route exact path='/admin/reservations' element={<Layout><Reservations/></Layout>}/>
          </Route>
          <Route exact path='/admin' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
            <Route exact path='/admin' element={<Layout><Reservations/></Layout>}/>
          </Route>
          <Route exact path='/admin/profile' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
            <Route exact path='/admin/profile' element={<Layout><Profile/></Layout>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
