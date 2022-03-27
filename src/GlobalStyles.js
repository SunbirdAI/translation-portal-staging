import tw, {styled} from 'twin.macro';

export const Wrapper = styled.div`
  ${tw`
    grid
    grid-cols-1
    place-items-center
    h-full
    mx-5
    my-3
    md:mx-16
    md:my-5
    lg:mx-20
    lg:my-10
   `}
`;

export const MainContainer = styled.div`
  ${tw`
    grid
    grid-cols-1
    md:grid-cols-2
    border
    rounded-md
    shadow
   `}
`;
