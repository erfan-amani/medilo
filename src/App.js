import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Card from './features/Ui/Card';
import Signin from './features/auth/Signin/Signin';
import Signup from './features/auth/Signup/Signup';
import SigninWithEmail from './features/auth/Signin/SigninWithEmail';
import SignupWithEmail from './features/auth/Signup/SignupWithEmail';

function App() {
  return (
    <BrowserRouter>
      <div className="flex items-center justify-center w-screen h-screen bg-gray-200">
        <Switch>
          <Card>
            <Route path="/signup" exact>
              <Signup />
            </Route>
            <Route path="/signin" exact>
              <Signin />
            </Route>
            <Route path="/signin/email">
              <SigninWithEmail />
            </Route>
            <Route path="/signup/email">
              <SignupWithEmail />
            </Route>
          </Card>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
