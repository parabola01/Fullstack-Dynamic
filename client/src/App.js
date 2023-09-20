import './App.css';
import {BrowserRouter, Route, Routes, Link, useNavigate} from "react-router-dom";
import Home from "./pages/Home";
import CreateElement from "./pages/CreateElement";
import Element from "./pages/Element";
import Login from "./pages/Login";
import Registration from "./pages/Registation";
import {AuthContext} from "./functions/AuthContext";
import {useState, useEffect} from "react";
import axios from "axios";
import Profile from "./pages/Profile"
import EditElement from "./pages/EditElement"


function App() {
  const [authState, setAuthState] = useState({
    username: "", id:0, status:false});


  useEffect(() => {
    axios.get('http://localhost:3001/auth/valid', {
      headers:{
      accessToken: localStorage.getItem("accessToken")
      },
    }).then((response) => {
      if (response.data.error) {
        setAuthState({...authState, status: false});
      }else{
        setAuthState({
          username: response.data.username, id: response.data.id, status: true});
      }
    })

  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({username: "", id:0, status:false});
  }


  return (
  <div className="App">
    <AuthContext.Provider value={{authState, setAuthState}}>
      <BrowserRouter>
        <div className="navbar">
          {!authState.status ? (
              <>
                <Link className="link" to="/">Główna</Link>
                <Link className="link" to="/login">Zaloguj się</Link>
                <Link className="link" to="/registration">Zarejestruj się</Link>
              </>
          ): (
            <div className="link" className="logout">
              <Link className="link" to="/">Główna</Link>
              <Link className="link" to="/createelement">Stwórz element</Link>
              <Link onClick={logout} className="link" id="logout" to="/">Wyloguj się</Link>
              <Link id ="name" className="link" to={`/profile/${authState.id}`}>{authState.username}</Link>
            </div>
                )}

        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createelement" element={<CreateElement />} />
          <Route path="/element/:id" element={<Element />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route exact path="/edit/:id" element={<EditElement/>}/>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider >
  </div>
  );
}

export default App;
