import styled from "styled-components";

const HeaderContainer = styled.header `
    padding: 0 100px;
    & h1{
        margin: 0;
        line-height: 70px;
        font-size: 28px;
    }
`;

const Header = () => {
    return (
        <HeaderContainer>
          <h1>LOGO</h1>
        </HeaderContainer>
    );
}

export default Header;