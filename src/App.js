import './App.css';
import {MainContainer, Wrapper} from "./GlobalStyles";
import Translate from "./components/Translate";
import SamplePhrases from "./components/SamplePhrases";

function App() {
    return (
        <div className="h-screen">
            <Wrapper>
                <MainContainer>
                    <Translate placeholder="Enter text"/>
                    <Translate placeholder="Translation" disabled={true}/>
                    <SamplePhrases/>
                </MainContainer>
            </Wrapper>
        </div>
    );
}

export default App;
