import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

const HomePage = () => <h1>Home Page</h1>;
const NewsPage = () => <h1>News Page</h1>;
const AboutUsPage = () => <h1>About Us Page</h1>;

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/news">News</Link>
          </li>
          <li>
            <Link to="/aboutus">About Us</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/home" component={HomePage} />
        <Route path="/news" component={NewsPage} />
        <Route path="/aboutus" component={AboutUsPage} />
      </Switch>
    </Router>
  );
};

export default App;
