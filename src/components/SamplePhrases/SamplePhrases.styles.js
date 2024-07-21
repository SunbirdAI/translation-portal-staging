import tw, {styled} from "twin.macro";

export const SamplePhrasesAccordion = styled.div`
  ${tw`
    w-full
    p-3
    md:col-span-2
   `}
`;

export const PhraseList = styled.ul`
  ${tw`
    divide-y
    divide-gray-100
   `}
`;

export const PhraseListItem = styled.li`
  ${tw`
    p-3
    hover:bg-gray-100
   `}
`;
