// src/components/sections/Publication.jsx
import React from "react";
import styled, { keyframes } from "styled-components";
import { publications } from "../../data/constants";

/* ===== Animations ===== */
const fadeUp = keyframes`
  from { transform: translateY(16px); opacity: 0; filter: blur(6px); }
  to   { transform: translateY(0);    opacity: 1; filter: blur(0); }
`;
const pulse = keyframes`
  0%   { transform: scale(1);   opacity: .55; }
  70%  { transform: scale(1.6); opacity: 0; }
  100% { transform: scale(1);   opacity: 0; }
`;
const shimmer = keyframes`
  from { background-position: -150% 0; }
  to   { background-position: 250% 0; }
`;

/* নতুন mesh/conic glow bg */
const bgSpin = keyframes`
  from { transform: translate(-15%, -18%) scale(1.4) rotate(0deg); }
  to   { transform: translate(-15%, -18%) scale(1.4) rotate(360deg); }
`;
const drift = keyframes`
  0%   { transform: translate(0px, 0px) scale(1); }
  50%  { transform: translate(8px, -6px) scale(1.04); }
  100% { transform: translate(-6px, 6px) scale(1); }
`;

/* ===== Layout ===== */
const Section = styled.section`
  position: relative;
  width: 100%;
  display: grid;
  place-items: center;
  padding: 64px 16px 32px;
  overflow: hidden;
`;

const Inner = styled.div`
  width: 100%;
  max-width: 1100px;
`;

const Heading = styled.h2`
  font-size: clamp(28px, 4.2vw, 44px);
  font-weight: 800;
  letter-spacing: 0.2px;
  line-height: 1.1;
  text-align: center;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.text_primary}; /* সাদা */
`;

const Sub = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  opacity: 0.9;
  margin-bottom: 28px;
`;

/* ===== Timeline ===== */
const Timeline = styled.div`
  position: relative;
  padding-left: 34px;

  /* vertical line */
  &::before {
    content: "";
    position: absolute;
    left: 14px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.08),
      rgba(255, 255, 255, 0.22),
      rgba(255, 255, 255, 0.08)
    );
    border-radius: 2px;
  }
`;

const Item = styled.div`
  position: relative;
  margin: 0 0 22px 0;
  animation: ${fadeUp} 0.5s ease both;
  will-change: transform, opacity, filter;
`;

const Node = styled.span`
  position: absolute;
  left: 7px;
  top: 16px;
  width: 16px;
  height: 16px;
  border-radius: 999px;
  background: radial-gradient(
    circle at 40% 40%,
    ${({ theme }) => theme.primary},
    rgba(0, 255, 200, 0.95) 60%,
    rgba(0, 255, 200, 0.2) 100%
  );
  box-shadow:
    0 0 12px rgba(0, 255, 200, 0.55),
    0 0 24px rgba(133, 76, 230, 0.35);

  &::after {
    content: "";
    position: absolute;
    inset: -6px;
    border-radius: 999px;
    background: radial-gradient(
      circle,
      rgba(0, 255, 200, 0.45),
      rgba(0, 255, 200, 0) 60%
    );
    animation: ${pulse} 1.8s ease-out infinite;
  }
`;

/* ===== Card (নতুন animated bg) ===== */
const Card = styled.a`
  position: relative;
  display: block;
  text-decoration: none;
  color: ${({ theme }) => theme.text_primary};
  margin-left: 6px;

  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background:
    linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))
      padding-box;
  backdrop-filter: blur(8px) saturate(140%);
  -webkit-backdrop-filter: blur(8px) saturate(140%);
  box-shadow:
    0 6px 22px rgba(0, 0, 0, 0.35),
    inset 0 0 0 1px rgba(255, 255, 255, 0.04);
  overflow: hidden;

  transform: perspective(1000px) translateZ(0);
  transition: transform 220ms ease, border-color 180ms ease, box-shadow 220ms ease;

  &:hover {
    transform: perspective(1000px) translateZ(0) translateY(-2px) rotateX(0.6deg);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow:
      0 10px 26px rgba(0, 0, 0, 0.45),
      inset 0 0 0 1px rgba(255, 255, 255, 0.05);
  }

  /* ===== Animated background layers ===== */
  /* Layer 1: spinning conic glow (খুব subtle) */
  &::before {
    content: "";
    position: absolute;
    width: 180%;
    height: 180%;
    top: -40%;
    left: -40%;
    z-index: 0;
    background:
      conic-gradient(
        from 0deg at 50% 50%,
        rgba(133,76,230,0.16),
        rgba(0,255,200,0.12),
        rgba(133,76,230,0.16),
        rgba(0,255,200,0.12),
        rgba(133,76,230,0.16)
      );
    filter: blur(28px);
    animation: ${bgSpin} 26s linear infinite;
    opacity: .35;
    pointer-events: none;
    mix-blend-mode: screen;
  }

  /* Layer 2: drifting mesh blobs */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
    background:
      radial-gradient(40% 60% at 20% 30%, rgba(0,255,200,0.18), transparent 55%),
      radial-gradient(45% 65% at 80% 70%, rgba(133,76,230,0.18), transparent 58%),
      radial-gradient(50% 70% at 60% 20%, rgba(255,255,255,0.08), transparent 60%);
    filter: blur(18px);
    opacity: .35;
    animation: ${drift} 12s ease-in-out infinite alternate;
    mix-blend-mode: screen;
    pointer-events: none;
  }

  /* keep content above backgrounds */
  & > * { position: relative; z-index: 1; }
`;

const CardTop = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px 8px 16px;
`;

const Badge = styled.span`
  font-size: 12px;
  font-weight: 600;
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: ${({ theme }) => theme.text_secondary};
  background: rgba(255, 255, 255, 0.05);
`;

const DateChip = styled(Badge)`
  color: ${({ theme }) => theme.text_primary};
  border-color: rgba(255, 255, 255, 0.22);
  background:
    linear-gradient(90deg, rgba(133,76,230,0.35), rgba(0,255,200,0.35));
`;

const TitleRow = styled.div`
  padding: 0 16px 10px 16px;
`;

const PubTitle = styled.h3`
  font-size: clamp(16px, 2.5vw, 20px);
  font-weight: 700;
  line-height: 1.4;
  color: ${({ theme }) => theme.text_primary};
`;

const Divider = styled.div`
  height: 1px;
  margin: 0 16px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.18),
    rgba(255, 255, 255, 0)
  );
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  padding: 10px 16px 14px 16px;
  color: ${({ theme }) => theme.text_secondary};
`;

const Kbd = styled.span`
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 12px;
  padding: 6px 8px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: ${({ theme }) => theme.text_primary};
`;

const Actions = styled.div`
  padding: 12px 16px 16px 16px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  background: linear-gradient(
    120deg,
    rgba(255,255,255,0.04),
    rgba(255,255,255,0.06),
    rgba(255,255,255,0.04)
  );
  background-size: 300% 100%;
  animation: ${shimmer} 4.5s linear infinite;
`;

const Btn = styled.button`
  all: unset;
  cursor: pointer;
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: ${({ theme }) => theme.text_primary};
  background: rgba(255, 255, 255, 0.05);
  transition: transform 0.18s ease, background 0.18s ease, border-color 0.18s ease;
  display: inline-flex; align-items: center; gap: 8px;

  &:hover {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.28);
  }
`;

const LinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M10 14a5 5 0 007.07 0l1.41-1.41a5 5 0 00-7.07-7.07L10 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 10a5 5 0 00-7.07 0L5.5 11.43a5 5 0 007.07 7.07L14 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <rect x="9" y="9" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="5" y="5" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" opacity=".8"/>
  </svg>
);

/* ===== Component ===== */
const Publication = () => {
  const copyDOI = async (doi) => {
    try {
      if (!doi) return;
      await navigator.clipboard?.writeText(doi);
    } catch (_) {}
  };

  if (!Array.isArray(publications) || publications.length === 0) {
    return (
      <Section id="Publication">
        <Inner>
          <Heading>Publications</Heading>
          <Sub>No publications added yet.</Sub>
        </Inner>
      </Section>
    );
  }

  return (
    <Section id="Publication">
      <Inner>
        <Heading>Publications</Heading>
        <Sub>Peer-reviewed work shown on a glowing, animated timeline.</Sub>

        <Timeline>
          {publications.map((p, i) => {
            const href = p.doi || p.link || "#";
            return (
              <Item key={i} style={{ animationDelay: `${i * 90}ms` }}>
                <Node />
                <Card href={href} target="_blank" rel="noreferrer">
                  <CardTop>
                    {p.type && <Badge>{p.type}</Badge>}
                    {p.status && <Badge>{p.status}</Badge>}
                    {p.date && <DateChip>{p.date}</DateChip>}
                  </CardTop>

                  <TitleRow>
                    <PubTitle>{p.title}</PubTitle>
                  </TitleRow>

                  {(p.doi || p.link) && (
                    <>
                      <Divider />
                      <MetaRow>
                        {p.doi && <Kbd>DOI</Kbd>}
                        {p.doi && <span>{p.doi}</span>}
                      </MetaRow>
                      <Actions>
                        {p.doi && (
                          <Btn as="a" href={p.doi} target="_blank" rel="noreferrer">
                            <LinkIcon /> Open DOI
                          </Btn>
                        )}
                        {p.doi && (
                          <Btn onClick={(e) => { e.preventDefault(); copyDOI(p.doi); }}>
                            <CopyIcon /> Copy DOI
                          </Btn>
                        )}
                      </Actions>
                    </>
                  )}
                </Card>
              </Item>
            );
          })}
        </Timeline>
      </Inner>
    </Section>
  );
};

export default Publication;
