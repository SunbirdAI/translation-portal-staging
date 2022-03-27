import tw, {styled} from "twin.macro";

export const TextArea = styled.textarea`
  ${tw`
    w-full
    px-3
    py-1.5
    font-normal
    text-4xl
    text-gray-700
    rounded
    transition
    placeholder:text-4xl
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
   `}
`;

export const LanguageDropdown = styled.select`
  ${tw`
    px-3
    py-1.5
    mx-3
    my-1.5
    border border-solid border-gray-300
    rounded
    ease-in-out
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
    `}
`;
