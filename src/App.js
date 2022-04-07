import ReactGA from "react-ga4";
import "./App.css";
import {Wrapper} from "./GlobalStyles";
import Header from "./components/Header";
import Translate from "./components/Translate";
import {useEffect} from "react";

const tracking_id = process.env.REACT_APP_GA4_TRACKING_ID;

function App() {
    useEffect(() => {
        ReactGA.initialize(tracking_id);
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
