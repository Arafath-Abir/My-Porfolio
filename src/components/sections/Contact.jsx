// src/components/sections/Contact.jsx
import React, { useRef, useState } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { Bio } from "../../data/constants";

/* ===== Layout ===== */
const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
  padding: 40px 20px 80px;
`;

const Max = styled.div`
  width: 100%;
  max-width: 1100px;
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 40px;
  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 28px;
  }
`;

const Title = styled.h2`
  font-size: 42px;
  font-weight: 700;
  margin: 10px 0 26px;
  text-align: center;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) { font-size: 30px; }
`;

/* ===== Left column ===== */
const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  align-self: center;
`;
const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;
const InfoItem = styled.a`
  display: flex;
  align-items: center;
  gap: 14px;
  text-decoration: none;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  font-size: 16px;
  opacity: 0.95;
  transition: transform .2s ease, color .2s ease, opacity .2s ease;
  &:hover { transform: translateX(4px); color: ${({ theme }) => theme.primary}; opacity: 1; }
`;
const Bullet = styled.span`
  width: 36px;
  height: 36px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  svg { width: 18px; height: 18px; }
`;
const Label = styled.span`
  overflow-wrap: anywhere;
  line-height: 1.4;
`;

/* ===== Right column ===== */
const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;
const Blurb = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.7;
  margin-bottom: 6px;
`;
const Form = styled.form`
  display: grid;
  gap: 14px;
`;
const Input = styled.input`
  width: 100%;
  border-radius: 10px;
  padding: 12px 14px;
  font-size: 16px;
  border: 1px solid #dfe3eb;
  background: #edf1f7;
  color: #0b0b0b;
  outline: none;
  transition: box-shadow .15s ease, border-color .15s ease, background .15s ease;
  &::placeholder { color: #6b7280; }
  &:focus { border-color: ${({ theme }) => theme.primary}; box-shadow: 0 0 0 3px rgba(133,76,230,.22); background: #f4f7fb; }
`;
const Textarea = styled.textarea`
  width: 100%;
  min-height: 110px;
  border-radius: 10px;
  padding: 12px 14px;
  font-size: 16px;
  border: 1px solid #dfe3eb;
  background: #edf1f7;
  color: #0b0b0b;
  outline: none;
  resize: vertical;
  transition: box-shadow .15s ease, border-color .15s ease, background .15s ease;
  &::placeholder { color: #6b7280; }
  &:focus { border-color: ${({ theme }) => theme.primary}; box-shadow: 0 0 0 3px rgba(133,76,230,.22); background: #f4f7fb; }
`;
const Submit = styled.button`
  justify-self: start;
  padding: 12px 18px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.16);
  background: ${({ theme }) => theme.primary};
  color: #fff;
  font-weight: 700;
  font-size: 15.5px;
  letter-spacing: .2px;
  cursor: pointer;
  transition: transform .15s ease, box-shadow .15s ease, filter .15s ease;
  box-shadow: 0 10px 20px rgba(133,76,230,.28);
  &:hover { transform: translateY(-1px); box-shadow: 0 14px 28px rgba(133,76,230,.36); filter: brightness(1.06); }
  &:active { transform: translateY(0); }
  &:disabled { opacity: .6; cursor: not-allowed; }
`;
const Note = styled.div`
  font-size: 13px;
  color: ${({ ok, theme }) => (ok ? "#1a9e61" : theme.text_secondary)};
  margin-top: 2px;
`;

/* Helper */
const prettyUrl = (raw) => {
  try {
    const u = new URL(raw);
    const path = u.pathname.replace(/\/+$/, "");
    return `${u.hostname.replace(/^www\./, "")}${path}`;
  } catch {
    return raw;
  }
};

const Contact = () => {
  const formRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState(null);

  // === EmailJS credentials ===
  const SERVICE_ID = "service_apl4e4i";      // তোমার Service ID
  const TEMPLATE_ID = "template_830qpc4";    // তোমার Template ID
  const PUBLIC_KEY  = "aoIPyJ9693284lyT6";   // তোমার Public Key

  const onSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;

    // honeypot (optional)
    if (formRef.current?.bot_field?.value) return;

    try {
      setSending(true);
      setOk(null);

      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      });

      setOk(true);
      formRef.current?.reset();
    } catch (err) {
      console.error(err);
      setOk(false);
    } finally {
      setSending(false);
    }
  };

  return (
    <Section id="Contact">
      <Title>Let’s talk.</Title>

      <Max>
        {/* Left: contact details */}
        <Left>
          <InfoList>
            <InfoItem href={Bio.github} target="_blank" rel="noreferrer">
              <Bullet><FaGithub /></Bullet>
              <Label>{prettyUrl(Bio.github)}</Label>
            </InfoItem>
            <InfoItem href={Bio.linkedin} target="_blank" rel="noreferrer">
              <Bullet><FaLinkedin /></Bullet>
              <Label>{prettyUrl(Bio.linkedin)}</Label>
            </InfoItem>
            <InfoItem href={`mailto:${Bio.email}`}>
              <Bullet><FiMail /></Bullet>
              <Label>{Bio.email}</Label>
            </InfoItem>
          </InfoList>
        </Left>

        {/* Right: refined form */}
        <Right>
          <Blurb>
            Whether you’re looking to build a new website, improve your existing
            platform, or bring a unique project to life — I’m here to help.
          </Blurb>

          <Form ref={formRef} onSubmit={onSubmit}>
            {/* receiver (optional) */}
            <input type="hidden" name="to_name" value="Arafath Abir" />
            <input type="hidden" name="to_email" value="arafathabir07@gmail.com" />
            <input type="hidden" name="subject" value="Portfolio Contact" />

            {/* honeypot */}
            <input type="text" name="bot_field" style={{ display: "none" }} tabIndex="-1" autoComplete="off" />

            {/* these names must match the EmailJS template */}
            <Input name="from_name" placeholder="Full Name" required />
            <Input name="from_email" type="email" placeholder="Email Address" required />
            <Textarea name="message" placeholder="Your Message" rows={5} required />

            <Submit type="submit" disabled={sending}>
              {sending ? "Sending..." : "Send Message"}
            </Submit>

            {ok === true && <Note ok>Thanks! Your message has been sent to my inbox.</Note>}
            {ok === false && <Note>Oops—something went wrong. Please try again.</Note>}
          </Form>
        </Right>
      </Max>
    </Section>
  );
};

export default Contact;
