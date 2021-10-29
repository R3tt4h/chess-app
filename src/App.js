import "./App.css";
import Home from "./components/Home";
import Game from "./components/Game";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


function App() {

  return (
    <div className="root">
    <Router>
        <Switch>
          <Route path = "/" exact component = {Home}/>
          <Route path = "/:name" exact component = {Game}/>
        </Switch>
    </Router>
    </div>
  );
}

export default App;

