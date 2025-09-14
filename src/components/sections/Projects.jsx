import React, { useState } from "react";
import styled from "styled-components";
import { projects } from "../../data/constants";
import ProjectCard from "../cards/ProjectCard";
import { motion } from "framer-motion";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 50px;
  padding: 0 16px 10px;
  position: relative;
  z-index: 1;
  align-items: center;

  /* subtle radial glow behind grid */
  &::before{
    content:"";
    position:absolute; inset: 0;
    background:
      radial-gradient(600px 300px at 50% 0%,
        rgba(133,76,230,0.10), transparent 60%),
      radial-gradient(500px 260px at 90% 20%,
        rgba(96,165,250,0.08), transparent 70%),
      radial-gradient(460px 240px at 10% 25%,
        rgba(52,211,153,0.07), transparent 70%);
    pointer-events:none;
    z-index: -1;
  }
`;

const Wrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  position: relative;
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
  @media (max-width: 768px) { font-size: 40px; }
`;

const Desc = styled(motion.p)`
  font-size: 18px;
  text-align: center;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) { font-size: 16px; }
`;

const CardContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 28px;
  flex-wrap: wrap;
  margin-top: 14px;
`;

const page = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { when: "beforeChildren", staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  show:   { opacity: 1, y: 0,  filter: "blur(0px)", transition: { type: "spring", stiffness: 120, damping: 18 } },
};

const Projects = () => {
  const [toggle] = useState("all"); // ভবিষ্যতে ক্যাটাগরি লাগলে ব্যবহার করবেন
  const filtered = toggle === "all" ? projects : projects.filter((p) => p.category === toggle);

  return (
    <Container id="Projects">
      <Wrapper variants={page} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px 0px" }}>
        <Title variants={item}>Projects</Title>
        <Desc variants={item}>Here are some of my Projects, Experiments, and Implementations.</Desc>

        <CardContainer variants={page}>
          {filtered.map((project, idx) => (
            <motion.div key={project.id || project._id || project.title || idx} variants={item}>
              <ProjectCard project={project} i={idx} />
            </motion.div>
          ))}
        </CardContainer>
      </Wrapper>
    </Container>
  );
};

export default Projects;
