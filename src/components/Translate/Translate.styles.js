import tw, { styled } from "twin.macro";

export const MainContainer = styled.div`
  ${tw`
    h-full
    grid
    grid-cols-1
    sm:grid-cols-1
    md:grid-cols-2
    lg:grid-cols-2
    xl:grid-cols-2
    gap-3
    rounded-md
    m-1
    p-1
    transition-all
    duration-300
    ease-in-out
  `}
  @media (min-width: 768px) {
    ${tw`p-6`}
  }
  @media (min-width: 1024px) {
    ${tw`p-8`}
  }
  @media (min-width: 1280px) {
    ${tw`p-8`}
  }
`;

export const Note = styled.div`
  ${tw`
    flex
    p-1
    w-full
    items-center
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
