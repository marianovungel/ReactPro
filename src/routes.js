import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import App from "./Pages/Home/App";
import Post from "./Pages/Post/index";

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" component={App} exact />
                <Route path="/post/:id" component={Post} exact />
            </Switch>
        </Router>
    )
}

export default Routes;