import tw, { styled } from "twin.macro";

export const MainContainer = styled.div`
  ${tw`
    grid
    grid-cols-1
    md:grid-cols-2
    rounded-md
    m-3
  `}
`;

export const Note = styled.div`
  ${tw`
    flex
    w-full
    items-center
    p-6
    bg-yellow-200
    text-yellow-800
    rounded-md
    mb-4
    justify-between
    relative
  `}
`;

export const CloseButton = styled.button`
  ${tw`
    absolute
    top-2
    right-2
    bg-transparent
    border-none
    text-yellow-800
    cursor-pointer
    text-lg
  `}
`;
