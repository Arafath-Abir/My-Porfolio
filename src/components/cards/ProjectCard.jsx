import React, { useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

/* ===== Animations ===== */
const flow = keyframes`
  0% { background-position: 0% 50% }
  50%{ background-position: 100% 50% }
  100%{ background-position: 0% 50% }
`;
const pulse = keyframes`
  0%,100%{ transform: scale(1); box-shadow: 0 0 0 0 rgba(255,255,255,0.0) }
  50%    { transform: scale(1.02); box-shadow: 0 0 22px 0 rgba(255,255,255,0.12) }
`;
const floatTag = keyframes`
  0%,100%{ transform: translateY(0) }
  50%    { transform: translateY(-3px) }
`;

/* ===== Styled ===== */
const Card = styled(motion.div)`
  position: relative;
  width: 330px;
  height: 560px; /* একটু বড়, যাতে drawer আরামসে বসে */
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;

  background: rgba(17,25,40,0.78);
  border: 1px solid rgba(255,255,255,.10);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06), 0 12px 28px rgba(0,0,0,0.28);

  transition: filter .25s ease, box-shadow .25s ease, transform .25s ease;
  will-change: transform, filter;

  /* animated gradient border */
  &::before{
    content:"";
    position:absolute; inset:0;
    padding: 1px; border-radius: 16px;
    background: linear-gradient(120deg, #854ce6, #60a5fa, #34d399, #854ce6);
    background-size: 220% 220%;
    animation: ${flow} 10s linear infinite;
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
            mask-composite: exclude;
    pointer-events:none;
    opacity: .7;
  }

  /* pointer-following light */
  &::after{
    content:"";
    position:absolute; inset:-1px; border-radius: inherit;
    background: radial-gradient(260px 200px at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.18), transparent 60%);
    mix-blend-mode: screen; opacity: 0; transition: opacity .25s ease;
    pointer-events: none;
  }
  &:hover::after{ opacity: 1; }

  &:hover {
    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08), 0 18px 40px rgba(0,0,0,0.38);
    filter: brightness(1.03);
  }
`;

const Card3D = styled.div`
  height: 100%;
  display: flex; flex-direction: column; gap: 14px;
  padding: 20px 18px 16px;

  transform: perspective(900px)
             rotateX(var(--rx, 0deg))
             rotateY(var(--ry, 0deg))
             translateY(var(--ty, 0px));
  transform-style: preserve-3d;
  transition: transform .12s ease;
`;

const ImageWrap = styled.div`
  position: relative;
  width: 100%;
  height: 190px;
  border-radius: 12px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.white}15;
  box-shadow: 0 0 16px 2px rgba(0,0,0,0.25);
  transform: translateZ(20px);

  /* sweep shine */
  &::before{
    content:"";
    position:absolute; top:0; left:-140%;
    width: 60%; height: 100%;
    transform: skewX(-15deg);
    background: linear-gradient(75deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.10) 45%, rgba(255,255,255,0) 100%);
    opacity: 0; transition: left .6s ease, opacity .6s ease;
  }
  ${Card}:hover &::before{ left:115%; opacity:1; }

  /* image zoom/parallax */
  img{ transform: scale(1) translate(var(--ix,0), var(--iy,0)); transition: transform .45s ease; }
  ${Card}:hover & img{ transform: scale(1.06) translate(var(--ix,0), var(--iy,0)); }
`;

const LiveTag = styled.span`
  position: absolute;
  top: 10px; left: 10px;
  padding: 6px 10px;
  font-size: 12px; font-weight: 800; letter-spacing: .2px;
  color: white; background: ${({ theme }) => theme.primary};
  border: 1px solid rgba(255,255,255,0.18);
  border-radius: 999px;
  box-shadow: 0 8px 18px rgba(0,0,0,.2);
  animation: ${pulse} 2.6s ease-in-out infinite, ${floatTag} 4s ease-in-out infinite;
  transform: translateZ(30px);
`;

const Image = styled.img`
  width: 100%; height: 100%; object-fit: cover; display: block;
`;

const Tags = styled.div`
  width: 100%;
  display: flex; align-items: center; flex-wrap: wrap;
  gap: 8px; margin-top: 2px;
`;

const Tag = styled.span`
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 999px;
  color: ${({ theme }) => theme.text_primary};
  border: 1px solid rgba(255,255,255,.14);
  background: rgba(255,255,255,0.05);
  transition: transform .18s ease, background .18s ease, border-color .18s ease, color .18s ease;
  ${Card}:hover & { transform: translateY(-2px); }
`;

const Details = styled.div`
  width: 100%;
  display: flex; flex-direction: column; gap: 4px;
  padding: 0 2px;
`;

const Title = styled.h3`
  font-size: 20px; font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
  display: -webkit-box; max-width: 100%;
  -webkit-line-clamp: 2; -webkit-box-orient: vertical;
  overflow: hidden; text-overflow: ellipsis;
`;

const Meta = styled.div`
  display:flex; gap:10px; align-items:center; flex-wrap:wrap;
  font-size: 12px; font-weight: 600; color: ${({ theme }) => theme.text_secondary + 80};
`;

const BulletMeta = styled.span`
  display:inline-flex; align-items:center; gap:6px;
  &::before{
    content:"•"; opacity:.7; transform: translateY(-1px);
  }
  &:first-child::before{ content:""; margin:0; }
`;

const Description = styled.p`
  font-weight: 400; margin-top: 4px;
  color: ${({ theme }) => theme.text_secondary + 99};
  display: -webkit-box; max-width: 100%;
  -webkit-line-clamp: 3; -webkit-box-orient: vertical;
  overflow: hidden; text-overflow: ellipsis;
`;

const Members = styled.div`
  display: flex; align-items: center; padding-left: 10px;
`;

const Avatar = styled.img`
  width: 38px; height: 38px; border-radius: 50%;
  margin-left: -10px; background-color: ${({ theme }) => theme.white};
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
  border: 3px solid ${({ theme }) => theme.card};
  object-fit: cover;
`;

const Actions = styled.div`
  margin-top: auto;
  display: flex; gap: 10px;
  transform: translateY(6px); opacity: 0;
  transition: transform .25s ease, opacity .25s ease;
  ${Card}:hover & { transform: translateY(0); opacity: 1; }
`;

const Btn = styled.a`
  flex: 1; text-align: center; text-decoration: none;
  font-weight: 800; font-size: 14px; padding: 10px 14px;
  border-radius: 10px; transition: transform .18s ease, filter .18s ease, box-shadow .18s ease, background .18s ease, color .18s ease;
  &:active { transform: translateY(0); }
`;

const LiveBtn = styled(Btn)`
  color: #fff; background: ${({ theme }) => theme.primary};
  border: 1px solid rgba(255,255,255,0.16);
  box-shadow: 0 10px 20px rgba(133,76,230,0.28);
  &:hover { transform: translateY(-1px); box-shadow: 0 14px 28px rgba(133,76,230,0.36); filter: brightness(1.06); }
`;

const CodeBtn = styled(Btn)`
  color: ${({ theme }) => theme.text_primary};
  background: transparent;
  border: 1px solid rgba(255,255,255,0.16);
  &:hover { transform: translateY(-1px); background: rgba(255,255,255,0.06); color: ${({ theme }) => theme.primary}; }
`;

/* ===== Quick Drawer (extra details) ===== */
const Drawer = styled(motion.div)`
  position: absolute; left: 0; right: 0; bottom: 0;
  background: linear-gradient(180deg, rgba(9,12,20,0.0) 0%, rgba(9,12,20,0.55) 8%, rgba(9,12,20,0.85) 38%, rgba(9,12,20,0.96) 100%);
  border-top: 1px solid rgba(255,255,255,.10);
  padding: 16px 16px 14px;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  max-height: 62%;
  overflow: hidden;
`;

const DrawerBody = styled.div`
  height: 100%;
  overflow-y: auto;
  padding-right: 6px;
  /* scrollbar thin */
  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb { background: rgba(255,255,255,.18); border-radius: 4px; }
`;

const DrawerTitle = styled.div`
  font-size: 14px; font-weight: 800; letter-spacing:.2px;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 8px; opacity: .9;
`;

const LongDesc = styled.p`
  font-size: 13px; line-height: 1.6;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 10px;
`;

const HL = styled.ul`
  margin: 0; padding-left: 18px; display: grid; gap: 6px;
`;
const HLI = styled.li`
  font-size: 13px; color: ${({ theme }) => theme.text_primary};
  opacity: .9;
`;

const ToggleHint = styled.div`
  position: absolute; right: 10px; bottom: 10px;
  font-size: 11px; color: ${({ theme }) => theme.text_secondary};
  opacity: .8;
`;

/* ===== Component ===== */
const ProjectCard = ({ project, i = 0 }) => {
  const cardRef = useRef(null);
  const [expanded, setExpanded] = useState(false);

  // Accept multiple keys for live link
  const liveUrl =
    project?.live ||
    project?.demo ||
    project?.webapp ||
    project?.website ||
    project?.url ||
    project?.link ||
    "";

  // Optional extras (array) for drawer
  const extras =
    project?.highlights ||
    project?.features ||
    project?.points ||
    project?.bullets ||
    [];

  const onMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;

    const rx = (py - 0.5) * -10;
    const ry = (px - 0.5) * 10;

    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);

    const ix = (px - 0.5) * 8;
    const iy = (py - 0.5) * 8;
    el.style.setProperty("--ix", `${ix}px`);
    el.style.setProperty("--iy", `${iy}px`);
  };

  const onLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.removeProperty("--rx");
    el.style.removeProperty("--ry");
    el.style.removeProperty("--mx");
    el.style.removeProperty("--my");
    el.style.removeProperty("--ix");
    el.style.removeProperty("--iy");
    setExpanded(false);
  };

  return (
    <Card
      ref={cardRef}
      initial={{ opacity: 0, y: 22, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px 0px -60px 0px" }}
      transition={{ type: "spring", stiffness: 220, damping: 24, delay: i ? i * 0.04 : 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.995 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={() => setExpanded((s) => !s)} // mobile tap toggle
    >
      <Card3D>
        <ImageWrap>
          {liveUrl ? <LiveTag>LIVE</LiveTag> : null}
          <Image src={project.image} alt={project.title} loading="lazy" />
        </ImageWrap>

        {Array.isArray(project.tags) && project.tags.length > 0 && (
          <Tags>
            {project.tags.slice(0, 6).map((t, idx) => (
              <Tag key={`${project.title}-tag-${idx}`}>{t}</Tag>
            ))}
          </Tags>
        )}

        <Details>
          <Title title={project.title}>{project.title}</Title>

          <Meta>
            {project.date && <BulletMeta>{project.date}</BulletMeta>}
            {project.category && <BulletMeta>{project.category}</BulletMeta>}
            {Array.isArray(project.tags) && project.tags.length > 0 && (
              <BulletMeta>{project.tags.length} tags</BulletMeta>
            )}
          </Meta>

          <Description>{project.description}</Description>
        </Details>

        {Array.isArray(project.member) && project.member.length > 0 && (
          <Members>
            {project.member.map((m, idx) => (
              <Avatar key={`${project.title}-m-${idx}`} src={m.img} alt={m.name || `member-${idx}`} loading="lazy" />
            ))}
          </Members>
        )}

        {(liveUrl || project.github) && (
          <Actions>
            {liveUrl && (
              <LiveBtn href={liveUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                Live Demo
              </LiveBtn>
            )}
            {project.github && (
              <CodeBtn href={project.github} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                View Code
              </CodeBtn>
            )}
          </Actions>
        )}
      </Card3D>

      {/* Drawer: extra details */}
      <AnimatePresence>
        {expanded && (
          <Drawer
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 22 }}
          >
            <DrawerBody>
              <DrawerTitle>More details</DrawerTitle>
              {/* লম্বা ডিসক্রিপশন (না থাকলে সংক্ষিপ্তটাই দেখাবে) */}
              {(project.longDescription || project.long_desc || project.more || project.description) && (
                <LongDesc>
                  {project.longDescription || project.long_desc || project.more || project.description}
                </LongDesc>
              )}

              {/* Highlights / Features (array) */}
              {Array.isArray(extras) && extras.length > 0 && (
                <>
                  <DrawerTitle>Highlights</DrawerTitle>
                  <HL>
                    {extras.slice(0, 8).map((p, idx) => (
                      <HLI key={`hl-${idx}`}>{p}</HLI>
                    ))}
                  </HL>
                </>
              )}

              {/* ট্যাগগুলোও একবার দেখানো হলো */}
              {Array.isArray(project.tags) && project.tags.length > 0 && (
                <>
                  <DrawerTitle style={{ marginTop: 10 }}>Stack</DrawerTitle>
                  <Tags>
                    {project.tags.slice(0, 12).map((t, idx) => (
                      <Tag key={`drawer-tag-${idx}`}>{t}</Tag>
                    ))}
                  </Tags>
                </>
              )}
            </DrawerBody>

            <ToggleHint>{/* hint */}Tap/Click card to close</ToggleHint>
          </Drawer>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default ProjectCard;
