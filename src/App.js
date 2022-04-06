import ReactGA from "react-ga4";
import "./App.css";
import {Wrapper} from "./GlobalStyles";
import Header from "./components/Header";
import Translate from "./components/Translate";
import {useEffect} from "react";

const GA4_TRACKING_ID = process.env.GA4_TRACKING_ID;

function App() {
    useEffect(() => {
        ReactGA.initialize(GA4_TRACKING_ID);
        ReactGA.send("pageview");
    }, []);
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
