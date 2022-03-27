import tw, {styled} from "twin.macro";

export const Nav = styled.div`
  ${tw`
    items-center
    bg-sunbird-navy-blue
    p-6
    sticky
    top-0
    z-50
  `}
`;

export const BrandWrapper = styled.div`
  ${tw`
    flex
    items-center
    text-white
    mr-6
    w-full
  `}
`;

export const Brand = styled.div`
  ${tw`
    font-semibold
    text-2xl
    tracking-tight
    `}
`;

export const Title = styled.h1`
  ${tw`
    font-semibold
    text-white
    text-2xl
    text-center
    w-full
    `}
`;

