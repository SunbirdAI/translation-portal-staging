import {PhraseList, PhraseListItem, SamplePhrasesAccordion} from "./SamplePhrases.styles";
import {Accordion, AccordionSummary, AccordionDetails} from '@mui/material';
import {Tabs, Tab} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useState} from "react";


const WordList = () => {
    return (
        <PhraseList>
            <PhraseListItem>
                First
            </PhraseListItem>
            <PhraseListItem>
                Second
            </PhraseListItem>
            <PhraseListItem>
                Third
            </PhraseListItem>
        </PhraseList>
    );
};


const TabPanel = ({value, index}) => (
    <div>
        {
            value === index && (
                <WordList/>
            )
        }
    </div>
);

const SamplePhrases = () => {

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
                    <TabPanel value={tab} index={0}/>
                    <TabPanel value={tab} index={1}/>
                </AccordionDetails>
            </Accordion>
        </SamplePhrasesAccordion>
    )
};

export default SamplePhrases;