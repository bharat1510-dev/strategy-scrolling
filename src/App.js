import logo from './logo.svg';
import Navbar from './components/Navbar';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

function App() {
  const progress = ()=>{}
  return (
    
    <div className="App" >
      <LoadingBar
        color='#f11946'
        progress={progress}
        
      />
      <Router>
       <Navbar title="Registation" home="Home" about="About" coustomer_service="Catagory"/>
       <News pageSize={5} page={1} />
       </Router>
    </div>
  );
}

export default App;