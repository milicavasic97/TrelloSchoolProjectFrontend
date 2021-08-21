import './App.css';
import './global/styles/Fonts.css';
import { Login } from './pages/Login/Login';
import { Route, Switch } from 'react-router-dom';
import React from 'react';
import { LoginLayout } from './global/components/layouts/LoginLayout';
import { Layout } from './global/components/layouts/Layout';
import { Home } from './pages/Home/Home';

function App() {
  return (
    <Switch>
    <Route path={["/login"]}>
      <LoginLayout>
        <Switch>
          <Route path="/login" component={Login} />
        </Switch>
      </LoginLayout>
    </Route>
    {/* Layout 1 is last because it is used for the root "/" and will be greedy */}
    <Route path={["/"]}>
      <Layout>
        <Switch>
          <Route path='/' component={Home} />
        </Switch>
      </Layout>
    </Route>
  </Switch>
  );
}

export default App;
