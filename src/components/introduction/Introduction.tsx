import './Introduction.css';
import TextHighlighter from "@/components/ui/text-highlighter";
import { Instagram, Linkedin } from "lucide-react";

function XIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.259 5.686L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/caramurphyxx/",
    Icon: Instagram,
  },
  {
    label: "X",
    href: "https://x.com/caleemu",
    Icon: XIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/murphycara/",
    Icon: Linkedin,
  },
] as const;

function Introduction() {
  return (
    <div className="flex flex-col">
      <div className="name-text p-5">
        hello! <br/>
        my name is <TextHighlighter type="wavy" highlightColor="#EC573F" strokeWidth={3} animationDuration={1.5}>
          <span>cara</span>
        </TextHighlighter>
      </div>
      <div className="body-text p-5 pb-3">
          I'm a software engineer based in NYC who has always loved creating art. here is where i keep a collection of my paintings, merch I've designed for companies and orgs, and other design endeavors. always open to requests, message me! :)
      </div>
      <div className="flex justify-center px-5 pb-5">
        <div className="flex items-center gap-5 rounded-full bg-[#053937] px-6 py-3">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="!text-white opacity-90 transition-opacity hover:opacity-100"
            >
              <Icon size={22} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Introduction;
