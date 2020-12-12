import '../css/App.scss';
import Header from "./Header" 
import {useState} from 'react'
import Login from './Login';

function App() {
  const isLoggedIn = useState(false)

  return (
    <div className="App">
      <Header/>
      {isLoggedIn && <Login />}
      
    </div>
  );
}

export default App;
