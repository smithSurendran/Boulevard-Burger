"use client";
import { useState } from "react";

// ---- types (no undefined here)
const SUBJECTS = ["General", "Catering", "Careers"] as const;
type Subject = typeof SUBJECTS[number];

type Props = {
  subjectPreset?: Subject;
  buttonLabel?: string;
};

// change this to your inbox
const TO_EMAIL = "hello@boulevardburger.com";

export default function ContactForm({
  subjectPreset = "General",
  buttonLabel = "Send Message",
}: Props) {
  // state is explicitly typed to Subject
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState<Subject>(subjectPreset);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      "",
      message,
    ].join("\n");
    const mailto = `mailto:${TO_EMAIL}?subject=${encodeURIComponent(
      `${subject} Inquiry - ${name || "Boulevard Burger"}`
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-1">
        <label className="text-sm font-medium">Name</label>
        <input required value={name} onChange={(e) => setName(e.target.value)}
               className="border rounded-xl px-3 py-2 bg-white" placeholder="Your name" />
      </div>

      <div className="grid gap-1 md:grid-cols-2">
        <div className="grid gap-1">
          <label className="text-sm font-medium">Email</label>
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                 className="border rounded-xl px-3 py-2 bg-white" placeholder="you@example.com" />
        </div>
        <div className="grid gap-1">
          <label className="text-sm font-medium">Phone</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)}
                 className="border rounded-xl px-3 py-2 bg-white" placeholder="(000) 000-0000" />
        </div>
      </div>

      <div className="grid gap-1">
        <label className="text-sm font-medium">Subject</label>
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value as Subject)}
          className="border rounded-xl px-3 py-2 bg-white"
        >
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-1">
        <label className="text-sm font-medium">Message</label>
        <textarea required rows={6} value={message} onChange={(e) => setMessage(e.target.value)}
                  className="border rounded-xl px-3 py-2 bg-white" placeholder="Tell us about your request…" />
      </div>

      <div className="flex items-center gap-3">
        <button type="submit" className="bg-bb-fire text-white px-5 py-3 rounded-2xl shadow-card hover:opacity-90">
          {buttonLabel}
        </button>
        {sent && <span className="text-sm text-green-700">Opening your email app…</span>}
      </div>
      <p className="text-xs text-neutral-600">
        By submitting, an email draft opens to {TO_EMAIL}. Swap to Formspree/Resend later for server-side sending.
      </p>
    </form>
  );
}
