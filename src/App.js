import "./App.css";
import "./global/styles/Fonts.css";
import { Login } from "./pages/Login/Login";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import React, { useEffect } from "react";
import { Layout } from "./global/components/layouts/Layout";
import { Home } from "./pages/Home/Home";
import { Board } from "./pages/Board/Board";
import initializeI18N from "./i8n/init";
import { useDispatch, useSelector } from "react-redux";
import { authState } from "./redux/slices/memberSlice";
import { Loading } from "./global/components/Loading";
import { Invitations } from "./pages/Invitations/Invitations";

// initializeI18N();

function App() {
  const { member, role, authenticated, loading, authenticationFailed } =
    useSelector((state) => state.members);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authState());
  }, []);

  if (loading && !authenticationFailed) {
    return <Loading />;
  }
  if (!authenticated) {
    return <Login />;
  }
  return (
    <BrowserRouter>
      <Layout member={member}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/invitations" component={Invitations} />
          <Route
            exact
            path="/board/:id"
            render={(props) => <Board boardId={props.match.params.id} />}
          />
          <Route>
            <Redirect to={"/"} />
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

{
  /* <Switch>
      <Route path={["/login"]}>
        <LoginLayout>
          <Switch>
            <Route exact path="/login" component={Login} />
          </Switch>
        </LoginLayout>
      </Route> */
}
{
  /* Layout 1 is last because it is used for the root "/" and will be greedy */
}
//   <Route path={["/"]}>
//     <Layout>
//       <Switch>
//         <Route exact path='/' component={Home} />
//         <Route exact path="/board/:id" render={(props) => (
//           <Board id={props.match.params.id} />
//         )} />
//       </Switch>
//     </Layout>
//   </Route>
// </Switch>
