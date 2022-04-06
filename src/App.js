import ReactGA from 'react-ga';
import './App.css';
import {Wrapper} from "./GlobalStyles";
import Header from "./components/Header";
import Translate from "./components/Translate";

const GA_TRACKING_ID = process.env.TRACKING_ID;
ReactGA.initialize(GA_TRACKING_ID);
ReactGA.pageview(window.location.pathname);

function App() {
    return (
        <div className="h-screen">
            <Header/>
            <Wrapper>
                <Translate/>
            </Wrapper>
        </div>
    );
}

export default App;
