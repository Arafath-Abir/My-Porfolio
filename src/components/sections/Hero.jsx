import React from "react";
import styled, { keyframes } from "styled-components";
import { Bio } from "../../data/constants";
import Typewriter from "typewriter-effect";
import HeroImg from "../../images/Abir.png";
import HeroBgAnimation from "../HeroBgAnimation";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import StarCanvas from "../canvas/Stars";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

/* ================== Color System ================== */
const COLORS = {
  neon: "rgba(0, 255, 140, 1)",
  mint: "rgba(146, 255, 210, 1)",
  teal: "rgba(0, 200, 160, 1)",
  glowSoft: "rgba(0, 255, 140, 0.25)",
  glowHard: "rgba(0, 255, 140, 0.85)",
};

/* ================== Page-load Orchestration ================== */
const page = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.09, delayChildren: 0.15 }
  },
};
const leftCol = {
  hidden: { y: 22, opacity: 0, filter: "blur(6px)" },
  show:   { y: 0,  opacity: 1, filter: "blur(0px)", transition: { type: "spring", stiffness: 90, damping: 18 } }
};
const titleV = {
  hidden: { y: 18, opacity: 0 },
  show:   { y: 0,  opacity: 1, transition: { type: "spring", stiffness: 95, damping: 14 } }
};
const lineV = {
  hidden: { y: 12, opacity: 0 },
  show:   { y: 0,  opacity: 1, transition: { duration: 0.45, ease: "easeOut" } }
};
const ctaV = {
  hidden: { scale: 0.96, opacity: 0 },
  show:   { scale: 1,    opacity: 1, transition: { type: "spring", stiffness: 110, damping: 12, delay: 0.05 } }
};
const rightCol = {
  hidden: { x: 18, opacity: 0, rotate: 1.5 },
  show:   { x: 0,  opacity: 1, rotate: 0, transition: { type: "spring", stiffness: 80, damping: 16, delay: 0.1 } }
};
const orbitV = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.98, filter: "blur(4px)" },
  show:   { opacity: 1, scale: 1,    filter: "blur(0px)", transition: { duration: 0.5, ease: "easeOut", delay } }
});

/* ------------ Layout ------------ */
const HeroSection = styled(motion.section)`
  display: flex;
  justify-content: center;
  position: relative;
  padding: 80px 30px;
  z-index: 1;

  @media (max-width: 960px) { padding: 66px 16px; }
  @media (max-width: 640px) { padding: 32px 16px; }

  clip-path: polygon(0 0, 100% 0, 100% 100%, 70% 95%, 0 100%);

  @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
`;

const HeroInnerContainer = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1100px;
  gap: 24px;

  @media (max-width: 960px) { flex-direction: column; }
`;

const HeroLeftContainer = styled(motion.div)`
  width: 100%;
  order: 1;
  @media (max-width: 960px) {
    order: 2; margin-bottom: 30px;
    display: flex; gap: 6px; flex-direction: column; align-items: center; text-align: center;
  }
`;

const HeroRightContainer = styled(motion.div)`
  width: 100%;
  order: 2; display: flex; justify-content: end;

  @media (max-width: 960px) {
    order: 1; display: flex; flex-direction: column; align-items: center;
    justify-content: center; margin-bottom: 80px;
  }
  @media (max-width: 640px) { margin-bottom: 30px; }
`;

/* ------------ Title & Text ------------ */
const Title = styled(motion.h1)`
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.3;
  margin-bottom: 14px;

  .hi {
    display: block; font-weight: 600; opacity: 0.9;
    font-size: clamp(20px, 4.5vw, 32px);
  }
  .name {
    display: block; font-weight: 700; letter-spacing: -0.01em;
    white-space: nowrap; hyphens: none;
    font-size: clamp(30px, 6.5vw, 44px);
  }
  @media (max-width: 960px) { text-align: center; }
`;

const TextLoop = styled(motion.div)`
  font-weight: 600;
  font-size: clamp(18px, 3vw, 22px);
  display: flex; gap: 10px; color: ${({ theme }) => theme.text_primary};
  line-height: 1.8; margin-bottom: 8px;

  @media (max-width: 960px) { justify-content: center; }
`;

const Span = styled.span` color: ${({ theme }) => theme.primary}; `;

const SubTitle = styled(motion.div)`
  font-size: clamp(15px, 2.2vw, 18px);
  line-height: 1.85;
  margin: 10px 0 36px;
  color: ${({ theme }) => theme.text_primary + 95};
  max-width: 720px;
`;

/* ----- Contact icons row (added) ----- */
const ContactRow = styled(motion.div)`
  display: flex;
  gap: 12px;
  margin: 8px 0 32px;
  @media (max-width: 960px) { justify-content: center; }
`;
const IconLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px; height: 42px;
  border-radius: 12px;
  color: ${({ theme }) => theme.text_primary};
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(2px) saturate(140%);
  -webkit-backdrop-filter: blur(2px) saturate(140%);
  border: 1px solid rgba(255,255,255,0.12);
  transition: transform .22s cubic-bezier(.16,1,.3,1), background .22s ease, border-color .22s ease, color .22s ease;
  &:hover {
    transform: translateY(-2px) scale(1.05);
    background: rgba(255,255,255,0.12);
    border-color: rgba(255,255,255,0.18);
    color: ${({ theme }) => theme.primary};
  }
  svg { width: 22px; height: 22px; display: block; }
`;

const ResumeButton = styled(motion.a)`
  appearance: button; text-decoration: none;
  width: 95%; max-width: 300px; text-align: center; padding: 16px 0;
  background: linear-gradient(225deg, #6c4dff 0%, #ff4df0 100%);
  box-shadow: 20px 20px 60px #1f2634, -20px -20px 60px #1f2634;
  border-radius: 50px; font-weight: 600; font-size: 20px; color: white;

  &:hover {
    transform: scale(1.05);
    transition: transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out;
  }
  @media (max-width: 640px) { padding: 12px 0; font-size: 18px; }
`;

/* ------------ Image + Orbits ------------ */
const ImgWrap = styled(motion.div)`
  position: relative; width: 100%; height: 100%;
  max-width: 440px; max-height: 440px; will-change: transform, opacity, filter;

  @media (max-width: 640px) { max-width: 320px; max-height: 320px; }
`;

const Img = styled.img`
  position: relative; z-index: 3; border-radius: 50%;
  width: 100%; height: 100%; max-width: 400px; max-height: 400px;
  border: 2px solid ${COLORS.teal}; box-shadow: 0 0 20px ${COLORS.glowSoft};

  @media (max-width: 640px) { max-width: 280px; max-height: 280px; }
`;

/* Keyframes */
const spin = keyframes`from{transform:rotate(0)}to{transform:rotate(360deg)}`;
const spinReverse = keyframes`from{transform:rotate(360deg)}to{transform:rotate(0)}`;
const pulse = keyframes`
  0%,100%{box-shadow:0 0 20px ${COLORS.glowSoft}, inset 0 0 20px ${COLORS.glowSoft}}
  50%{box-shadow:0 0 30px ${COLORS.glowHard}, inset 0 0 30px ${COLORS.glowSoft}}
`;

/* OUTER: dotted, soft glow, slow spin */
const OrbitOuter = styled(motion.div)`
  position: absolute; inset: -18px; border-radius: 50%;
  border: 2px dotted ${COLORS.mint}; box-shadow: 0 0 24px ${COLORS.glowSoft};
  animation: ${spin} 16s linear infinite;

  &::after {
    content: ""; position: absolute; top: -7px; left: 50%;
    transform: translateX(-50%); width: 11px; height: 11px; border-radius: 50%;
    background: ${COLORS.mint}; box-shadow: 0 0 10px ${COLORS.mint}, 0 0 20px ${COLORS.glowHard};
  }
  @media (max-width: 640px) { inset: -14px; }
`;

/* MIDDLE: conic gradient sweep, reverse spin */
const OrbitMiddle = styled(motion.div)`
  position: absolute; inset: -34px; border-radius: 50%;
  background: conic-gradient(from 0deg, rgba(255,255,255,0) 0deg, ${COLORS.neon} 35deg, rgba(255,255,255,0) 90deg);
  filter: blur(0.6px); opacity: 0.8; animation: ${spinReverse} 12s linear infinite;

  &::before{
    content:""; position:absolute; inset: 8px; border-radius:50%;
    border:1px solid ${COLORS.teal}; box-shadow: inset 0 0 12px ${COLORS.glowSoft};
    animation:${pulse} 4.5s ease-in-out infinite;
  }
  @media (max-width: 640px) { inset: -26px; }
`;

/* INNER: solid neon ring + two orbiting dots */
const OrbitInner = styled(motion.div)`
  position: absolute; inset: -6px; border-radius: 50%;
  border: 2px solid ${COLORS.teal};
  box-shadow: 0 0 18px ${COLORS.glowSoft}, inset 0 0 18px ${COLORS.glowSoft};
  animation: ${spin} 20s linear infinite;

  &::before{
    content:""; position:absolute; right: -5px; top: 50%; transform: translateY(-50%);
    width: 9px; height: 9px; border-radius:50%; background: ${COLORS.neon};
    box-shadow: 0 0 10px ${COLORS.glowHard};
  }
  &::after{
    content:""; position:absolute; left: 50%; top: -4px; transform: translateX(-50%);
    width: 7px; height: 7px; border-radius:50%; background: ${COLORS.teal};
    box-shadow: 0 0 8px ${COLORS.teal};
  }
`;

/* Background container */
const HeroBg = styled.div`
  position: absolute; display: flex; justify-content: end;
  top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%;
  max-width: 1360px; overflow: hidden; padding: 0 30px;
  top: 50%; left: 50%; transform: translate(-50%, -50%);

  @media (max-width: 960px) { justify-content: center; padding: 0 0px; }
`;

const Hero = () => {
  return (
    <div id="About">
      <HeroSection variants={page} initial="hidden" animate="show">
        <HeroBg>
          <StarCanvas />
          <HeroBgAnimation />
        </HeroBg>

        <HeroInnerContainer>
          {/* LEFT */}
          <HeroLeftContainer variants={leftCol}>
            <Title variants={titleV}>
              <span className="hi">Hi, I am</span>
              <span className="name">{Bio.name.replace(/ /g, "\u00A0")}</span>
            </Title>

            <TextLoop variants={lineV}>
              I am a <Span>
                <Typewriter options={{ strings: Bio.roles, autoStart: true, loop: true }} />
              </Span>
            </TextLoop>

            <SubTitle variants={lineV}>{Bio.description}</SubTitle>

            {/* ===== Contact icons row ===== */}
            <ContactRow variants={lineV}>
              <IconLink href={Bio.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn">
                <FaLinkedin />
              </IconLink>
              <IconLink href={Bio.github} target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub">
                <FaGithub />
              </IconLink>
              <IconLink href={`mailto:${Bio.email}`} aria-label="Email" title={Bio.email}>
                <FaEnvelope />
              </IconLink>
            </ContactRow>

            <ResumeButton variants={ctaV} href={Bio.resume} target="_blank" rel="noreferrer">
              Check Resume
            </ResumeButton>
          </HeroLeftContainer>

          {/* RIGHT */}
          <HeroRightContainer variants={rightCol}>
            <motion.div variants={rightCol}>
              <Tilt options={{ max: 12, scale: 1.02, speed: 800 }}>
                <ImgWrap variants={orbitV(0.05)}>
                  {/* Orbits appear smoothly, then rotate via CSS */}
                  <OrbitMiddle variants={orbitV(0.08)} />
                  <OrbitOuter variants={orbitV(0.12)} />
                  <OrbitInner variants={orbitV(0.16)} />
                  <Img src={HeroImg} alt="Arafath Abir" />
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
