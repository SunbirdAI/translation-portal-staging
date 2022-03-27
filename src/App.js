import './App.css';
import {MainContainer, Wrapper} from "./GlobalStyles";
import Translate from "./components/Translate";

function App() {
    return (
        <div className="h-screen">
            <Wrapper>
                <MainContainer>
                    <Translate placeholder="Enter text"/>
                    <Translate placeholder="Translation" disabled={true}/>
                </MainContainer>
            </Wrapper>
        </div>
    );
}

export default App;
