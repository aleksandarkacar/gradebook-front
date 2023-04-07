import logo from "./logo.svg";
import "./App.css";
import { Page } from "./layout/Page";
import { Router } from "./Router";
import { Provider, useDispatch } from "react-redux";
import store from "./store";
import { performLogout } from "./store/auth/slice";

function App() {


  return (
    <Provider store={store}>
      <Page>
        <Router />
      </Page>
    </Provider>
  );
}

export default App;
