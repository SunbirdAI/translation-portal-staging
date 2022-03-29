import tw, {styled} from "twin.macro";

export const TextArea = styled.textarea`
  ${tw`
    w-full
    px-3
    py-1.5
    font-normal
    text-2xl md:text-4xl
    text-gray-700
    rounded
    h-40 md:h-60
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
    max-w-[250px]
    overflow-hidden
    break-normal
    border border-solid border-gray-300
    rounded
    ease-in-out
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
    `}
`;
