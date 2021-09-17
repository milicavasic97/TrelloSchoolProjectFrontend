import './App.css';
import './global/styles/Fonts.css';
import { Login } from './pages/Login/Login';
import { Route, Switch } from 'react-router-dom';
import React from 'react';
import { LoginLayout } from './global/components/layouts/LoginLayout';
import { Layout } from './global/components/layouts/Layout';
import { Home } from './pages/Home/Home';
import { Board } from './pages/Board/Board';

function App() {
  return (
    <Switch>
      <Route path={["/login"]}>
        <LoginLayout>
          <Switch>
            <Route exact path="/login" component={Login} />
          </Switch>
        </LoginLayout>
      </Route>
      {/* Layout 1 is last because it is used for the root "/" and will be greedy */}
      <Route path={["/"]}>
        <Layout>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path="/board/:id" render={(props) => (
              <Board id={props.match.params.id} />
            )} />
          </Switch>
        </Layout>
      </Route>
    </Switch>
  );
}

export default App;
