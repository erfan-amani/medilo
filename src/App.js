import { BrowserRouter, Route } from 'react-router-dom';

import Signin from './features/auth/Signin';
import Signup from './features/auth/Signup';
import Card from './features/Ui/Card';

function App() {
  return (
    <BrowserRouter>
      <div className="flex items-center justify-center w-screen h-screen bg-gray-200">
        <Card>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/signin">
            <Signin />
          </Route>
        </Card>
      </div>
    </BrowserRouter>
  );
}

export default App;
