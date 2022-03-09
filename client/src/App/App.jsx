import { hot } from "react-hot-loader/root";
import React from "react";
import GlobalStyle from "../theme";
import { Application, Container } from "./styles";
// import { ReactComponent as Rocket } from "../assets/rocket.svg";
import DisplayConsole from "../components/DisplayConsole";
import ControlConsole from "../components/ControlConsole";
import { Provider } from "react-redux";
import store from "../redux";

const App = () => (
  <Provider store={store}>
    <Application>
      {/* <Rocket />
      <span>
        "Space isn't remote at all. It's only an hour's drive away, if your car
        could go straight upwards."
      </span> */}
      <Container>
        <DisplayConsole />
        <ControlConsole />
      </Container>
    </Application>
    <GlobalStyle />
  </Provider>
);

export default hot(App);
