import tw, { styled } from 'twin.macro';

export const TextArea = styled.textarea`
  ${tw`
    w-full
    h-full
    p-3
    text-2xl
    md:text-4xl
    text-gray-700
    rounded
    transition
    placeholder:text-4xl
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
    z-10
  `}
`;

export const LanguageDropdown = styled.select`
  ${tw`
    w-full
    px-3
    py-2
    mx-1.5
    my-2
    max-w-[250px]
    border border-gray-300
    rounded-lg
    bg-white
    text-gray-700
    transition
    duration-200
    ease-in-out
    outline-none
    focus:border-blue-600
    focus:ring-2
    focus:ring-blue-500
    focus:ring-opacity-50
    z-10
  `}
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  &:hover {
    border-color: #a0aec0;
  }
  &::placeholder {
    ${tw`
      text-gray-500
    `}
  }
`;

export const DropdownOption = styled.option`
  ${tw`
    text-base
    text-gray-700
    bg-white
    hover:bg-blue-100
  `}
`;

export const CharCount = styled.div`
  ${tw`
    text-right
    text-xs
    text-gray-500
    mt-1
    mr-3
    z-10
  `}
`;

export const ResponsiveContainer = styled.div`
  ${tw`
    p-4
    bg-white
    shadow-md
    rounded-lg
    relative
    z-0
    w-full
    flex
    flex-col
    justify-between
  `}
  ${props => props.disabled && tw`bg-gray-100`}
  height: 80vh; /* Example: Set the height to 80% of the viewport height */
  min-height: 600px; /* Example: Set a minimum height */
`;

export const ButtonContainer = styled.div`
  ${tw`
    mb-2
  `}
`;
