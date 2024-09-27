import Loginpage from "./components/Loginpage";
import { Route, Switch } from "wouter";
import Chatpage from "./components/Chatpage";

const App = () => {
  return (
    <>
      <Switch>
        <Route path="/" component={Loginpage} />
        <Route path="/chat" component={Chatpage} />
        {/* <Route path="/users/:name" component={UserPage} /> */}

        {/* Shows a 404 error if the path doesn't match anything */}
        {
          <Route>
            <p className="p-4">404: Page Not Found</p>
          </Route>
        }
      </Switch>
    </>
  );
};

export default App;
