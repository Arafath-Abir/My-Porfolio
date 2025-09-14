// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link as LinkR } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { MenuRounded } from "@mui/icons-material";

/* Animations */
const slideIn = keyframes`
  from { transform: translateY(-100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;
const stagger = keyframes`
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

/* Layout */
const Nav = styled.div`
  /* 0.4 at top, 0.5 after scroll + blur (glass) */
  background: ${({ hasScrolled }) =>
    hasScrolled ? "rgba(9, 9, 23, 0.50)" : "rgba(9, 9, 23, 0.40)"};
  backdrop-filter: ${({ hasScrolled }) =>
    hasScrolled ? "saturate(140%) blur(10px)" : "saturate(140%) blur(8px)"};
  -webkit-backdrop-filter: ${({ hasScrolled }) =>
    hasScrolled ? "saturate(140%) blur(10px)" : "saturate(140%) blur(8px)"};

  box-shadow: none;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 10;
  color: white;
  animation: ${slideIn} 0.6s ease-out;
  transition: background .2s ease, backdrop-filter .2s ease;
  -webkit-tap-highlight-color: transparent;
`;

const NavbarContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavLogo = styled(LinkR)`
  padding: 0 6px;
  font-weight: 600;
  font-size: 20px;
  text-decoration: none;
  color: ${({ theme }) => theme.text_primary};
  transition: transform 0.3s ease, color 0.3s ease;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    transform: scale(1.05);
    color: ${({ theme }) => theme.primary};
    text-shadow: 0 0 8px rgba(255,255,255,0.5);
  }
  &:focus, &:focus:not(:focus-visible) { outline: none; box-shadow: none; }
  &:active { text-shadow: none; transform: scale(1.02); }
`;

const NavItems = styled.ul`
  flex: 1;                     /* take remaining width */
  display: flex;
  align-items: center;
  justify-content: flex-end;   /* align RIGHT */
  gap: 12px;
  padding: 0 6px;
  list-style: none;
  position: relative;
  @media (max-width: 768px) { display: none; }
`;

const GlassHighlight = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 36px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  backdrop-filter: blur(3px) saturate(150%);
  -webkit-backdrop-filter: blur(3px) saturate(150%);
  box-shadow: inset 0 0 12px rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.2);
  pointer-events: none;
  z-index: 0;
  opacity: 0;
  transition: left .3s cubic-bezier(.22,.61,.36,1), width .3s cubic-bezier(.22,.61,.36,1), opacity .2s ease;
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
  -webkit-tap-highlight-color: transparent;

  &:hover {
    color: ${({ theme }) => theme.primary};
    transform: scale(1.05);
    text-shadow: 0 0 8px rgba(255,255,255,0.4);
  }
  &:active { text-shadow: none; }
  &:focus, &:focus:not(:focus-visible) { outline: none; box-shadow: none; }

  ${({ isActive, theme }) =>
    isActive &&
    `text-shadow: 0 0 8px ${theme.primary}80; font-weight: 600;`}
`;

const MobileIcon = styled.div`
  height: 100%;
  display: none;
  align-items: center;
  color: ${({ theme }) => theme.text_primary};
  cursor: pointer;
  transition: transform 0.3s ease;
  -webkit-tap-highlight-color: transparent;
  &:hover { transform: scale(1.1); }
  @media (max-width: 768px) { display: flex; }
`;

const MobileMenu = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
  list-style: none;
  padding: 12px 40px 24px 40px;

  /* keep glassy feel for mobile dropdown */
  background: ${({ theme }) =>
    `linear-gradient(to bottom, ${theme.card_light}e6, ${theme.card_light}cc)`};
  backdrop-filter: blur(10px) saturate(140%);
  -webkit-backdrop-filter: blur(10px) saturate(140%);

  position: absolute;
  top: 80px;
  right: 0;
  transition: all 0.5s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? "translateY(0)" : "translateY(-100%)")};
  border-radius: 0 0 20px 20px;
  box-shadow: 0 0 12px 0 rgba(0,0,0,0.25);
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

  useEffect(() => {
    const onScroll = () => {
      setHasScrolled(window.scrollY > 12);
      const sections = ["About", "Skills", "Projects", "Publication", "Education", "Contact"];
      let current = "";
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el && window.scrollY >= el.offsetTop - 100) current = s;
      }
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const moveHighlight = (el) => {
    if (!itemsRef.current || !el) return;
    const parentRect = itemsRef.current.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    setHl({ left: rect.left - parentRect.left, width: rect.width, height: rect.height });
  };

  const clearHighlight = () => setHl(null);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 72;
      window.scrollTo({ top: y < 0 ? 0 : y, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const MENU_ORDER = ["About", "Skills", "Projects", "Publication", "Education", "Contact"];

  return (
    <Nav hasScrolled={hasScrolled}>
      <NavbarContainer>
        <NavLogo
          to="/"
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(false);
            setActiveSection("About");
            clearHighlight();
            scrollToSection("About");
          }}
          aria-label="Go to top"
        >
          Arafath Abir
        </NavLogo>

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
          {MENU_ORDER.map((item, index) => (
            <NavLink
              key={item}
              href={`#${item}`}
              onMouseEnter={(e) => moveHighlight(e.currentTarget)}
              isActive={activeSection === item}
              style={{ "--i": index }}
              onClick={(e) => {
                e.preventDefault();
                clearHighlight();
                setIsOpen(false);
                scrollToSection(item);
              }}
            >
              {item}
            </NavLink>
          ))}
        </NavItems>
      </NavbarContainer>

      {isOpen && (
        <MobileMenu isOpen={isOpen}>
          {MENU_ORDER.map((item, index) => (
            <NavLink
              key={item}
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
                clearHighlight();
                scrollToSection(item);
              }}
              href={`#${item}`}
              style={{ "--i": index }}
              isActive={activeSection === item}
            >
              {item}
            </NavLink>
          ))}
        </MobileMenu>
      )}
    </Nav>
  );
};

export default Navbar;
