import React from "react";
import styled, { keyframes } from "styled-components";
import { Bio } from "../../data/constants";
import Typewriter from "typewriter-effect";
import HeroBgAnimation from "../HeroBgAnimation";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import StarCanvas from "../canvas/Stars";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
const HERO_IMG =
  "https://res.cloudinary.com/dt94ywdob/image/upload/v1757948381/j_compressed_xz8ncy.jpg";
const COLORS = {
  neon: "rgba(0, 255, 140, 1)",
  mint: "rgba(146, 255, 210, 1)",
  teal: "rgba(0, 200, 160, 1)",
  glowSoft: "rgba(0, 255, 140, 0.25)",
  glowHard: "rgba(0, 255, 140, 0.85)",
};

const page = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.1, delayChildren: 0.2 },
  },
};
const leftCol = {
  hidden: { y: 30, opacity: 0, filter: "blur(8px)" },
  show: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 20, duration: 0.6 },
  },
};
const titleV = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 110, damping: 16, duration: 0.5 },
  },
};
const lineV = {
  hidden: { y: 15, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};
const rightCol = {
  hidden: { x: 20, opacity: 0, rotate: 2 },
  show: {
    x: 0,
    opacity: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 90, damping: 18, duration: 0.6 },
  },
};
const orbitV = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.95, filter: "blur(5px)" },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut", delay },
  },
});

const HeroSection = styled(motion.section)`
  display: flex;
  justify-content: center;
  position: relative;
  padding: 80px 30px;
  z-index: 1;

  @media (max-width: 960px) {
    padding: 66px 16px;
  }
  @media (max-width: 640px) {
    padding: 32px 16px;
  }

  clip-path: polygon(0 0, 100% 0, 100% 100%, 70% 95%, 0 100%);

  @media (prefers-reduced-motion: reduce) {
    * {
      animation: none !important;
    }
  }
`;

const HeroInnerContainer = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1100px;
  gap: 24px;

  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const HeroLeftContainer = styled(motion.div)`
  width: 100%;
  order: 1;
  @media (max-width: 960px) {
    order: 2;
    margin-bottom: 30px;
    display: flex;
    gap: 6px;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const HeroRightContainer = styled(motion.div)`
  width: 100%;
  order: 2;
  display: flex;
  justify-content: end;

  @media (max-width: 960px) {
    order: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 80px;
  }
  @media (max-width: 640px) {
    margin-bottom: 30px;
  }
`;

/* Title & Text */
const Title = styled(motion.h1)`
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.3;
  margin-bottom: 14px;

  .hi {
    display: block;
    font-weight: 600;
    opacity: 0.9;
    font-size: clamp(20px, 4.5vw, 32px);
  }
  .name {
    display: block;
    font-weight: 700;
    letter-spacing: -0.01em;
    white-space: nowrap;
    hyphens: none;
    font-size: clamp(30px, 6.5vw, 44px);
  }
  @media (max-width: 960px) {
    text-align: center;
  }
`;

const TextLoop = styled(motion.div)`
  font-weight: 600;
  font-size: clamp(18px, 3vw, 22px);
  display: flex;
  gap: 10px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.8;
  margin-bottom: 8px;
  @media (max-width: 960px) {
    justify-content: center;
  }
`;

const Span = styled.span`
  color: ${({ theme }) => theme.primary};
`;

const SubTitle = styled(motion.div)`
  font-size: clamp(15px, 2.2vw, 18px);
  line-height: 1.85;
  margin: 10px 0 18px;
  color: ${({ theme }) => theme.text_primary + 95};
  max-width: 720px;
`;

/* Resume + Icons (same row) */
const ActionsRow = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 8px 0 32px;
  flex-wrap: wrap;
  @media (max-width: 960px) {
    justify-content: center;
  }
`;

const ResumeButton = styled(motion.a)`
  text-decoration: none;
  padding: 12px 18px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 0.2px;
  color: #ffffff;
  background: ${({ theme }) => theme.primary};
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow: 0 10px 20px rgba(133, 76, 230, 0.28);
  transition: transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease,
    background 0.18s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 14px 28px rgba(133, 76, 230, 0.36);
    filter: brightness(1.06);
  }
  &:active {
    transform: translateY(0);
  }
`;

const ContactRow = styled.div`
  display: flex;
  gap: 10px;
`;

const IconLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  color: ${({ theme }) => theme.text_primary};
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1),
    background 0.22s ease, border-color 0.22s ease, color 0.22s ease;
  &:hover {
    transform: translateY(-2px) scale(1.05);
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.18);
    color: ${({ theme }) => theme.primary};
  }
  svg {
    width: 22px;
    height: 22px;
    display: block;
  }
`;

/* Image + Orbits */
const ImgWrap = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 440px;
  max-height: 440px;
  will-change: transform, opacity, filter;
  @media (max-width: 640px) {
    max-width: 320px;
    max-height: 320px;
  }
`;
const Img = styled.img`
  position: relative;
  z-index: 3;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  max-width: 400px;
  max-height: 400px;
  border: 2px solid ${COLORS.teal};
  box-shadow: 0 0 20px ${COLORS.glowSoft};
  @media (max-width: 640px) {
    max-width: 280px;
    max-height: 280px;
  }
`;

/* Keyframes */
const spin = keyframes`from{transform:rotate(0)}to{transform:rotate(360deg)}`;
const spinReverse = keyframes`from{transform:rotate(360deg)}to{transform:rotate(0)}`;
const pulse = keyframes`
  0%,100%{box-shadow:0 0 20px ${COLORS.glowSoft}, inset 0 0 20px ${COLORS.glowSoft}}
  50%{box-shadow:0 0 30px ${COLORS.glowHard}, inset 0 0 30px ${COLORS.glowSoft}}
`;

const OrbitOuter = styled(motion.div)`
  position: absolute;
  inset: -18px;
  border-radius: 50%;
  border: 2px dotted ${COLORS.mint};
  box-shadow: 0 0 24px ${COLORS.glowSoft};
  animation: ${spin} 16s linear infinite;
  &::after {
    content: "";
    position: absolute;
    top: -7px;
    left: 50%;
    transform: translateX(-50%);
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: ${COLORS.mint};
    box-shadow: 0 0 10px ${COLORS.mint}, 0 0 20px ${COLORS.glowHard};
  }
  @media (max-width: 640px) {
    inset: -14px;
  }
`;

const OrbitMiddle = styled(motion.div)`
  position: absolute;
  inset: -34px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    rgba(255, 255, 255, 0) 0deg,
    ${COLORS.neon} 35deg,
    rgba(255, 255, 255, 0) 90deg
  );
  filter: blur(0.6px);
  opacity: 0.8;
  animation: ${spinReverse} 12s linear infinite;
  &::before {
    content: "";
    position: absolute;
    inset: 8px;
    border-radius: 50%;
    border: 1px solid ${COLORS.teal};
    box-shadow: inset 0 0 12px ${COLORS.glowSoft};
    animation: ${pulse} 4.5s ease-in-out infinite;
  }
  @media (max-width: 640px) {
    inset: -26px;
  }
`;

const OrbitInner = styled(motion.div)`
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 2px solid ${COLORS.teal};
  box-shadow: 0 0 18px ${COLORS.glowSoft}, inset 0 0 18px ${COLORS.glowSoft};
  animation: ${spin} 20s linear infinite;
  &::before {
    content: "";
    position: absolute;
    right: -5px;
    top: 50%;
    transform: translateY(-50%);
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: ${COLORS.neon};
    box-shadow: 0 0 10px ${COLORS.glowHard};
  }
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    top: -4px;
    transform: translateX(-50%);
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${COLORS.teal};
    box-shadow: 0 0 8px ${COLORS.teal};
  }
`;

/* Background container */
const HeroBg = styled.div`
  position: absolute;
  display: flex;
  justify-content: end;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: 1360px;
  overflow: hidden;
  padding: 0 30px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media (max-width: 960px) {
    justify-content: center;
    padding: 0 0px;
  }
`;

const Hero = () => {
  return (
    <div id="About">
      <HeroSection
        variants={page}
        initial="hidden"
        animate="show"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
      >
        <HeroBg>
          <StarCanvas />
          <HeroBgAnimation />
        </HeroBg>

        <HeroInnerContainer
          variants={page}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
        >
          {/* LEFT */}
          <HeroLeftContainer
            variants={leftCol}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.4 }}
          >
            <Title variants={titleV}>
              <span className="hi">Hi, I am</span>
              <span className="name">{Bio.name.replace(/ /g, "\u00A0")}</span>
            </Title>

            <TextLoop variants={lineV}>
              I am a{" "}
              <Span>
                <Typewriter
                  options={{ strings: Bio.roles, autoStart: true, loop: true }}
                />
              </Span>
            </TextLoop>

            <SubTitle variants={lineV}>{Bio.description}</SubTitle>

            <ActionsRow variants={lineV}>
              <ResumeButton
                href={Bio.resume}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Check Resume
              </ResumeButton>

              <ContactRow>
                <IconLink
                  href={Bio.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <FaLinkedin />
                </IconLink>
                <IconLink
                  href={Bio.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  title="GitHub"
                >
                  <FaGithub />
                </IconLink>
                <IconLink
                  href={`mailto:${Bio.email}`}
                  aria-label="Email"
                  title={Bio.email}
                >
                  <FaEnvelope />
                </IconLink>
              </ContactRow>
            </ActionsRow>
          </HeroLeftContainer>

          {/* RIGHT */}
          <HeroRightContainer
            variants={rightCol}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.4 }}
          >
            <motion.div variants={rightCol}>
              <Tilt options={{ max: 12, scale: 1.02, speed: 800 }}>
                <ImgWrap variants={orbitV(0.05)}>
                  <OrbitMiddle variants={orbitV(0.08)} />
                  <OrbitOuter variants={orbitV(0.12)} />
                  <OrbitInner variants={orbitV(0.16)} />
                  {/* ✅ Use string URL instead of import */}
                  <Img
                    src={HERO_IMG}
                    alt="Arafath Abir"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = "/fallback-avatar.png";
                    }}
                  />
                </ImgWrap>
              </Tilt>
            </motion.div>
          </HeroRightContainer>
        </HeroInnerContainer>
      </HeroSection>
    </div>
  );
};

export default Hero;
