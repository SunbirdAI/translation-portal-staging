import {Brand, BrandWrapper, Nav, Title} from "./Header.styles";
import img from '../../images/logo.png';

const Header = () => (
    <Nav>
        <BrandWrapper>
            <img className="h-[40px]" alt="Logo" src={img}/>
            <Title>
                Translate
            </Title>
        </BrandWrapper>
    </Nav>
);

export default Header;
