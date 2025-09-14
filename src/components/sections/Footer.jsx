import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  width: 100%;
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: center;
  padding: 28px 0 32px;
  color: ${({ theme }) => theme.text_primary};
`;

const TopBorder = styled.div`
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    ${({ theme }) => theme.primary}33 15%,
    ${({ theme }) => theme.primary}99 50%,
    ${({ theme }) => theme.primary}33 85%,
    transparent 100%
  );
  filter: blur(.2px);
  opacity: .8;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr auto 1fr; /* ডান দিকটা এখন ফাঁকা থাকবে */
  align-items: center;
  gap: 18px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
    text-align: center;
  }
`;

const Brand = styled.a`
  justify-self: start;
  text-decoration: none;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 600;
  font-size: 18px;
  letter-spacing: .2px;
  transition: color .2s ease, transform .2s ease;

  &:hover {
    color: ${({ theme }) => theme.primary};
    transform: translateY(-1px);
  }

  @media (max-width: 768px) { justify-self: center; }
`;

const Nav = styled.nav`
  justify-self: center;
`;

const NavList = styled.ul`
  display: flex;
  gap: 16px;
  list-style: none;
  padding: 0; margin: 0;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 10px 14px;
    justify-content: center;
  }
`;

const NavLink = styled.a`
  position: relative;
  text-decoration: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
  padding: 6px 8px;
  transition: color .18s ease;

  &:hover { color: ${({ theme }) => theme.primary}; }

  &::after{
    content:"";
    position:absolute; left: 8px; right: 8px; bottom: 2px;
    height: 2px; border-radius: 2px;
    background: ${({ theme }) => theme.primary};
    transform: scaleX(0);
    transform-origin: center;
    transition: transform .22s ease;
    opacity: .85;
  }
  &:hover::after{ transform: scaleX(1); }
`;

const Copy = styled.div`
  grid-column: 1 / -1;
  margin-top: 8px;
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
  opacity: .9;
  text-align: center; /* কেন্দ্র */
`;

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <FooterContainer>
      <TopBorder />
      <Wrapper>
        <Brand href="#About" aria-label="Go to top">Arafath Abir</Brand>

        <Nav>
          <NavList>
            <li><NavLink href="#About">About</NavLink></li>
            <li><NavLink href="#Skills">Skills</NavLink></li>
            <li><NavLink href="#Projects">Projects</NavLink></li>
            <li><NavLink href="#Publication">Publication</NavLink></li>
            <li><NavLink href="#Education">Education</NavLink></li>
          </NavList>
        </Nav>


        <Copy>© {year} Arafath Abir. All rights reserved.</Copy>
      </Wrapper>
    </FooterContainer>
  );
};

export default Footer;
