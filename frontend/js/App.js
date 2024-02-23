import * as Sentry from "@sentry/react";
import { Provider } from "react-redux";

import Home from "./pages/Home";
import configureStore from "./store";

const store = configureStore({});
const App = () => (
  <Provider store={store}>
    <Home />
  </Provider>
);

export default App;
