import React, { useState, useEffect, useRef } from "react";
import { Link as LinkR } from "react-router-dom";
import styled, { useTheme, keyframes } from "styled-components";
import { Bio } from "../data/constants";
import { MenuRounded } from "@mui/icons-material";

// Entrance animation
const slideIn = keyframes`
  from { transform: translateY(-100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

// Pulse animation for button
const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.2); }
  50% { transform: scale(1.02); box-shadow: 0 0 0 10px rgba(255, 255, 255, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
`;

// Staggered animation for mobile menu items
const stagger = keyframes`
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const Nav = styled.div`
  background: ${({ theme, hasScrolled }) =>
    hasScrolled
      ? `linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.6))`
      : theme.bg};
  backdrop-filter: ${({ hasScrolled }) => (hasScrolled ? "blur(8px)" : "none")};
  -webkit-backdrop-filter: ${({ hasScrolled }) =>
    hasScrolled ? "blur(8px)" : "none"};
  box-shadow: ${({ hasScrolled }) =>
    hasScrolled ? "0 8px 24px rgba(0,0,0,0.3)" : "none"};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  color: white;
  animation: ${slideIn} 0.6s ease-out;
  transition:
    background 0.3s ease,
    backdrop-filter 0.3s ease,
    -webkit-backdrop-filter 0.3s ease,
    box-shadow 0.3s ease;
`;

const NavbarContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
`;

const NavLogo = styled(LinkR)`
  width: 80%;
  padding: 0 6px;
  font-weight: 600;
  font-size: 20px;
  text-decoration: none;
  color: ${({ theme }) => theme.text_primary};
  transition: transform 0.3s ease, color 0.3s ease;
  &:hover {
    transform: scale(1.05);
    color: ${({ theme }) => theme.primary};
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
  }
`;

const NavItems = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 0 6px;
  list-style: none;
  position: relative;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const GlassHighlight = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 36px;
  border-radius: 14px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.05)
  );
  backdrop-filter: blur(3px) saturate(150%);
  -webkit-backdrop-filter: blur(3px) saturate(150%);
  box-shadow:
    inset 0 0 12px rgba(255, 255, 255, 0.1),
    0 4px 12px rgba(0, 0, 0, 0.2);
  pointer-events: none;
  z-index: 0;
  opacity: 0;
  transition:
    left 0.3s cubic-bezier(0.22, 0.61, 0.36, 1),
    width 0.3s cubic-bezier(0.22, 0.61, 0.36, 1),
    opacity 0.2s ease,
    background 0.3s ease;
  will-change: left, width, opacity;
`;

const NavLink = styled.a`
  position: relative;
  z-index: 1;
  color: ${({ theme, isActive }) => (isActive ? theme.primary : theme.text_primary)};
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  padding: 10px 16px;
  border-radius: 14px;
  transition: all 0.3s ease;
  transform: scale(1);
  &:hover {
    color: ${({ theme }) => theme.primary};
    transform: scale(1.05);
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
  }
  ${({ isActive, theme }) =>
    isActive &&
    `
    text-shadow: 0 0 8px ${theme.primary}80;
    font-weight: 600;
  `}
`;

const ButtonContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 6px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const GithubButton = styled.a`
  border: 1.5px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  justify-content: center;
  display: flex;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  animation: ${pulse} 2s infinite ease-in-out;
  &:hover {
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.1)
    );
    backdrop-filter: blur(14px) saturate(200%);
    -webkit-backdrop-filter: blur(14px) saturate(200%);
    box-shadow:
      inset 0 0 20px rgba(255, 255, 255, 0.2),
      0 6px 20px rgba(0, 0, 0, 0.3);
    color: ${({ theme }) => theme.text_primary};
    transform: scale(1.05);
  }
`;

const MobileIcon = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text_primary};
  display: none;
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
  list-style: none;
  padding: 12px 40px 24px 40px;
  background: ${({ theme }) =>
    `linear-gradient(to bottom, ${theme.card_light}e6, ${theme.card_light}cc)`};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  position: absolute;
  top: 80px;
  right: 0;
  transition: all 0.5s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? "translateY(0)" : "translateY(-100%)")};
  border-radius: 0 0 20px 20px;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.25);
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  z-index: ${({ isOpen }) => (isOpen ? "1000" : "-1000")};
  & > * {
    animation: ${stagger} 0.4s ease-out forwards;
    animation-delay: ${({ isOpen }) => (isOpen ? "calc(0.1s * var(--i))" : "0s")};
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [hl, setHl] = useState(null);
  const [activeSection, setActiveSection] = useState("");
  const itemsRef = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setHasScrolled(window.scrollY > 0);
      // Detect active section
      const sections = ["About", "Skills", "Projects", "Education", "Publication"];
      let currentSection = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 100) {
          currentSection = section;
        }
      }
      setActiveSection(currentSection);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const moveHighlight = (el) => {
    if (!itemsRef.current || !el) return;
    const parentRect = itemsRef.current.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    setHl({
      left: rect.left - parentRect.left,
      width: rect.width,
      height: rect.height,
    });
  };

  const clearHighlight = () => setHl(null);

  return (
    <Nav hasScrolled={hasScrolled}>
      <NavbarContainer>
        <NavLogo to="/">Arafath Abir</NavLogo>

        <MobileIcon onClick={() => setIsOpen(!isOpen)}>
          <MenuRounded style={{ color: "inherit" }} />
        </MobileIcon>

        <NavItems ref={itemsRef} onMouseLeave={clearHighlight}>
          <GlassHighlight
            style={{
              left: hl ? `${hl.left}px` : 0,
              width: hl ? `${hl.width}px` : 0,
              height: hl ? `${Math.max(36, (hl?.height ?? 36) - 8)}px` : 0,
              opacity: hl ? 1 : 0,
            }}
          />
          {["About", "Skills", "Projects", "Education", "Publication"].map((item, index) => (
            <NavLink
              key={item}
              href={`#${item}`}
              onMouseEnter={(e) => moveHighlight(e.currentTarget)}
              isActive={activeSection === item}
            >
              {item}
            </NavLink>
          ))}
        </NavItems>

        {isOpen && (
          <MobileMenu isOpen={isOpen}>
            {["About", "Skills", "Projects", "Education", "Publication"].map((item, index) => (
              <NavLink
                key={item}
                onClick={() => setIsOpen(false)}
                href={`#${item}`}
                style={{ "--i": index }}
                isActive={activeSection === item}
              >
                {item}
              </NavLink>
            ))}
            <GithubButton
              href={Bio.github}
              target="_blank"
              style={{
                background: theme.primary,
                color: theme.text_primary,
                "--i": 5,
              }}
            >
              Github Profile
            </GithubButton>
          </MobileMenu>
        )}

        <ButtonContainer>
          <GithubButton href={Bio.github} target="_blank">
            Github Profile
          </GithubButton>
        </ButtonContainer>
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;