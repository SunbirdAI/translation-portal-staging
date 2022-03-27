import {PhraseList, PhraseListItem, SamplePhrasesAccordion} from "./SamplePhrases.styles";
import {Accordion, AccordionSummary, AccordionDetails} from '@mui/material';
import {Tabs, Tab} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useState} from "react";

const randomWords = [
    'During the coronavirus outbreak, people began making masks out of clothes',
    'What reasons do youths give for dropping out of school?',
    'Help the needy members in society',
    'What causes some children not to pass well in school?',
    'Workers can now choose to work from home or come to the office.',
    'Banks will be open for only six hours a day.',
    'Everyone needs the freedom to freely express their ideas.'
]

const greetings = [
    'Good morning, how are you doing?',
    'When can we meet and have a chat?',
    'I hope to see you again soon'
]


const WordList = ({sentences, setSamplePhrase}) => {

    const onClick = (index) => {
        setSamplePhrase(sentences[index]);
    };

    return (
        <PhraseList>
            {sentences.map((sentence, index) => (
                <PhraseListItem key={index} onClick={() => onClick(index)}>
                    {sentence}
                </PhraseListItem>
            ))}
        </PhraseList>
    );
};


const TabPanel = ({value, index, sentences, setSamplePhrase}) => (
    <div>
        {
            value === index && (
                <WordList sentences={sentences} setSamplePhrase={setSamplePhrase}/>
            )
        }
    </div>
);

const SamplePhrases = ({setSamplePhrase}) => {

    const [tab, setTab] = useState(0);

    const handleChange = (event, newTab) => {
        setTab(newTab);
    }

    return (
        <SamplePhrasesAccordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                >
                    <h2 className="font-bold text-xl">Sample Phrases</h2>
                </AccordionSummary>
                <AccordionDetails>
                    <Tabs value={tab} onChange={handleChange}>
                        <Tab label="Random"/>
                        <Tab label="Greetings & Socials"/>
                    </Tabs>
                    <TabPanel
                        value={tab}
                        index={0}
                        sentences={randomWords}
                        setSamplePhrase={setSamplePhrase}
                    />
                    <TabPanel
                        value={tab}
                        index={1}
                        sentences={greetings}
                        setSamplePhrase={setSamplePhrase}
                    />
                </AccordionDetails>
            </Accordion>
        </SamplePhrasesAccordion>
    )
};

export default SamplePhrases;
