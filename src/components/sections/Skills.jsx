import React from "react";
import styled, { keyframes } from "styled-components";
import { skills } from "../../data/constants";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

/* ========= Animations ========= */
const flow = keyframes`
  0%   { background-position: 0% 50% }
  50%  { background-position: 100% 50% }
  100% { background-position: 0% 50% }
`;
const spin = keyframes`to { transform: rotate(1turn); }`;

const fadeUp = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  show:   { opacity: 1, y: 0,  filter: "blur(0px)", transition: { type: "spring", stiffness: 110, damping: 20 } }
};
const gridV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
};

/* ========= Layout ========= */
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
`;

const Wrapper = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
  @media (max-width: 960px) { flex-direction: column; }
`;

const Title = styled(motion.h2)`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) { margin-top: 12px; font-size: 32px; }
`;

const Desc = styled(motion.p)`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) { font-size: 16px; }
`;

const SkillsGrid = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  margin-top: 22px;
`;

/* ========= Card ========= */
const Card = styled(motion.div)`
  position: relative;
  border-radius: 16px;
  padding: 18px 16px;
  background: rgba(17, 25, 40, 0.78);
  border: 1px solid rgba(255,255,255,.10);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06), 0 10px 28px rgba(0,0,0,0.28);
  overflow: hidden;
  transition: transform .28s cubic-bezier(.16,1,.3,1), box-shadow .28s ease, filter .28s ease;
  will-change: transform, filter;

  /* animated gradient border */
  &::before {
    content: "";
    position: absolute; inset: 0;
    padding: 1px; border-radius: 16px;
    background: linear-gradient(120deg, #854ce6, #60a5fa, #34d399, #854ce6);
    background-size: 220% 220%;
    animation: ${flow} 8s linear infinite;
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
            mask-composite: exclude;
    pointer-events: none;
  }

  /* pointer-following spotlight */
  &::after{
    content:"";
    position:absolute; inset: -1px;
    border-radius: inherit;
    background:
      radial-gradient(240px 180px at var(--mx, 50%) var(--my, 50%),
        rgba(255,255,255,0.22), transparent 60%);
    mix-blend-mode: screen;
    opacity: 0;
    transition: opacity .25s ease;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08), 0 18px 40px rgba(0,0,0,0.38);
    filter: brightness(1.03);
  }
  &:hover::after { opacity: .9; }
`;

const CardHeader = styled.div`
  display: flex; align-items: center; justify-content: center;
  gap: 10px; margin-bottom: 14px;
`;

const SkillTitle = styled.h3`
  font-size: 22px; font-weight: 700;
  color: ${({ theme }) => theme.text_primary}; text-align: center;
`;

const SkillList = styled.div`
  display: flex; justify-content: center; flex-wrap: wrap;
  gap: 10px 12px; margin: 8px 0 6px;
  ${Card}:hover & > * { transform: translateY(-2px); }
`;

const SkillItem = styled.div`
  position: relative;
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 15px; font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  padding: 10px 12px; border-radius: 12px;
  border: 1px solid rgba(255,255,255,.12);
  background: rgba(255,255,255,0.05);
  transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease, color .18s ease, background .18s ease;
  will-change: transform;

  /* spinning conic glow ring */
  &::before{
    content:"";
    position:absolute; inset:-1px; border-radius: inherit; padding: 1px;
    background: conic-gradient(from 0deg,
      transparent 0%,
      ${({ theme }) => theme.primary}66 15%,
      transparent 30%,
      transparent 60%,
      ${({ theme }) => theme.primary}66 75%,
      transparent 90%);
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
            mask-composite: exclude;
    opacity: 0; pointer-events: none;
    transition: opacity .25s ease;
  }

  /* shine sweep */
  &::after {
    content: "";
    position: absolute; inset: -30% -50%;
    background: radial-gradient(120px 40px at 10% 50%, rgba(255,255,255,.18), transparent 60%);
    transform: translateX(-60%); opacity: 0;
    transition: transform .45s ease, opacity .45s ease;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-4px) scale(1.03);
    color: ${({ theme }) => theme.primary};
    border-color: ${({ theme }) => theme.primary}55;
    background: rgba(255,255,255,0.08);
    box-shadow: 0 8px 22px rgba(0,0,0,.25), 0 0 0 4px rgba(133,76,230,.10);
  }
  &:hover::before { opacity: 1; animation: ${spin} 1.2s linear infinite; }
  &:hover::after  { transform: translateX(60%); opacity: 1; }
`;

const SkillImage = styled.img`
  width: 22px; height: 22px; object-fit: contain; display: block;
  filter: drop-shadow(0 0 2px rgba(0,0,0,.25));
`;

/* ========= Component ========= */
const Skills = () => {
  const tiltOptions = {
    max: 8,
    scale: 1.01,
    speed: 800,
    glare: true,
    "max-glare": 0.18,
    glareEnable: true,
    glareMaxOpacity: 0.18,
    glareBorderRadius: "16px",
  };

  // spotlight position (CSS vars on each card)
  const handleMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
  };
  const handleLeave = (e) => {
    const el = e.currentTarget;
    el.style.removeProperty("--mx");
    el.style.removeProperty("--my");
  };

  return (
    <Container id="Skills">
      <Wrapper
        variants={gridV}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
      >
        <Title variants={fadeUp}>Skills</Title>
        <Desc variants={fadeUp} style={{ marginBottom: 24 }}>
          Here are some of the key skills I have been developing and working with.
        </Desc>

        <SkillsGrid variants={gridV}>
          {skills.map((skill, index) => (
            <Tilt key={`skill-${index}`} options={tiltOptions}>
              <Card
                variants={fadeUp}
                onMouseMove={handleMove}
                onMouseLeave={handleLeave}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
              >
                <CardHeader>
                  <SkillTitle>{skill.title}</SkillTitle>
                </CardHeader>

                <SkillList>
                  {(skill.skills || []).map((item, idx) => (
                    <SkillItem key={`skill-item-${index}-${idx}`}>
                      {item.image && (
                        <SkillImage src={item.image} alt={item.name} loading="lazy" />
                      )}
                      {item.name}
                    </SkillItem>
                  ))}
                </SkillList>
              </Card>
            </Tilt>
          ))}
        </SkillsGrid>
      </Wrapper>
    </Container>
  );
};

export default Skills;
