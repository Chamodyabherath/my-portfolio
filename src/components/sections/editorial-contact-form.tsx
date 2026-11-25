"use client";

import { ArrowUpRight, Check, Copy } from "lucide-react";
import {
  type FormEvent,
  useActionState,
  useState,
  useSyncExternalStore,
} from "react";
import { sendPortfolioMessage } from "@/app/contact/actions";

const fields = [
  {
    key: "company",
    label: "Company",
    placeholder: "Organization (optional)",
    type: "text",
    autoComplete: "organization",
    max: 100,
  },
  {
    key: "name",
    label: "Name",
    placeholder: "Your name",
    type: "text",
    autoComplete: "name",
    max: 80,
  },
  {
    key: "email",
    label: "Email",
    placeholder: "you@example.com",
    type: "email",
    autoComplete: "email",
    max: 120,
  },
  {
    key: "subject",
    label: "Subject",
    placeholder: "Project, role, or collaboration",
    type: "text",
    autoComplete: "off",
    max: 100,
  },
] as const;

const noopSubscribe = () => () => {};

function useBrowserReady() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

export function CopyEmail({ email }: { email: string }) {
  const [feedback, setFeedback] = useState<"idle" | "copied" | "error">("idle");

  const ready = useBrowserReady();

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setFeedback("copied");
    } catch {
      setFeedback("error");
    }
  }

  if (!ready) return null;

  return (
    <div className="email-copy">
      <button
        className="editorial-copy-button"
        type="button"
        aria-label="Copy email address"
        onClick={copy}
      >
        {feedback === "copied" ? (
          <Check size={15} aria-hidden="true" />
        ) : (
          <Copy size={15} aria-hidden="true" />
        )}
        {feedback === "copied" ? "Copied" : "Copy"}
      </button>
      <span
        role="status"
        className={feedback === "error" ? "copy-error" : "sr-only"}
      >
        {feedback === "copied"
          ? "Email address copied."
          : feedback === "error"
            ? "Copy is unavailable here. You can select the email address."
            : ""}
      </span>
    </div>
  );
}

export function ContactForm({
  email,
  configured,
}: {
  email: string;
  configured: boolean;
}) {
  const [status, action, pending] = useActionState(sendPortfolioMessage, {
    state: "idle" as const,
    message: "",
  });
  const [values, setValues] = useState({
    company: "",
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [draftReady, setDraftReady] = useState(false);
  const ready = useBrowserReady();

  function compose(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      values.company && `Company: ${values.company}`,
      "",
      values.message,
    ].join("\n");
    const draft = `mailto:${email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`;
    setDraftReady(true);
    window.location.assign(draft);
  }

  if (!configured && !ready) {
    return (
      <p className="form-note">
        Use the email address above to compose your message.
      </p>
    );
  }

  return (
    <form
      className="editorial-form"
      action={configured ? action : undefined}
      onSubmit={configured ? undefined : compose}
    >
      {!configured && (
        <p className="form-note" id="contact-form-mode">
          Online sending hasn’t been configured. This form opens a draft in your
          email app.
        </p>
      )}
      <div className="editorial-form-fields">
        {fields.map(({ key, label, placeholder, type, autoComplete, max }) => (
          <label key={key}>
            {label}
            <input
              name={key}
              type={type}
              placeholder={placeholder}
              autoComplete={autoComplete}
              required={key !== "company"}
              maxLength={max}
              value={values[key]}
              onChange={(event) =>
                setValues({ ...values, [key]: event.target.value })
              }
            />
          </label>
        ))}
        <label className="message-field">
          Message
          <textarea
            name="message"
            placeholder="Tell me a little about what you have in mind."
            required
            rows={4}
            maxLength={1500}
            value={values.message}
            onChange={(event) =>
              setValues({ ...values, message: event.target.value })
            }
          />
        </label>
        <label className="contact-trap" aria-hidden="true">
          Website
          <input name="website" autoComplete="off" tabIndex={-1} />
        </label>
        <button
          type="submit"
          className="editorial-button solid contact-submit"
          disabled={pending}
          aria-describedby={configured ? undefined : "contact-form-mode"}
        >
          {pending
            ? "Sending…"
            : configured
              ? "Send message"
              : "Open email draft"}{" "}
          <ArrowUpRight size={17} aria-hidden="true" />
        </button>
      </div>
      <p
        role={status.state === "error" ? "alert" : "status"}
        className="contact-status"
      >
        {configured
          ? status.message
          : draftReady
            ? "If a draft did not open, use the email address above."
            : ""}
      </p>
    </form>
  );
}
