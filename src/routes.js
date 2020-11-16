import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Header from './components/ui/Header/Header';

import Home from './components/Home/Home';
import Container from './components/container/Container';

const Routes = (props) => {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/tables/:tableId" component={Container} />
                <Route render={() => <div>PAGE NOT FOUND</div>} /> 
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;