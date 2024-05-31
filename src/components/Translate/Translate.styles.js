import tw, { styled } from "twin.macro";

export const MainContainer = styled.div`
  ${tw`
    grid
    grid-cols-1
    md:grid-cols-2
    gap-4
    rounded-md
    m-3
    p-3
  `}
  @media (min-width: 768px) {
    ${tw`p-6`}
  }
  @media (min-width: 1024px) {
    ${tw`p-8`}
  }
`;

export const Note = styled.div`
  ${tw`
    flex
    w-full
    items-center
    p-6
    bg-gray-100 shadow
    text-gray-700
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

