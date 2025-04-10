import tw, { styled } from "twin.macro";

export const Nav = styled.div`
  ${tw`
    flex
    w-screen
    items-center
    bg-sunbird-navy-blue
    py-4
    px-4
    sticky
    top-0
    z-50
  `}
`;

export const Title = styled.h1`
  ${tw`
    font-semibold
    text-white
    sm:text-3xl
    mb-1
    text-2xl
    w-full
    right-0
    text-center
    `}
`;
