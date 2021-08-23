import Login from "./component/Login";
import Registration from "./component/Registration";
import { BrowserRouter, Route } from 'react-router-dom';
import "./App.css";


function App() {
  return (
    <BrowserRouter>
    <div>
     <Route exact path="/" component={Login} />
      <Route path="/Registration" component={Registration} />

    </div>
  </BrowserRouter>
   
  );
}

export default App;
