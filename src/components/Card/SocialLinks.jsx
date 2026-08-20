import "./Card.css";

import {
  FaFacebookF,
  FaInstagram,
  FaGithub,
  FaDiscord,
  FaGlobe,
} from "react-icons/fa";

const socialLinks = [
  {
    href: "https://www.facebook.com/thatquang.ton.77",
    label: "Facebook",
    icon: FaFacebookF,
  },
  {
    href: "https://www.instagram.com/tonquang175/",
    label: "Instagram",
    icon: FaInstagram,
  },
  {
    href: "https://github.com/",
    label: "GitHub",
    icon: FaGithub,
  },
  {
    href: "https://discord.com/users/1201086421449056287",
    label: "Discord",
    icon: FaDiscord,
  },
  {
    href: "https://www.google.com/",
    label: "Website",
    icon: FaGlobe,
  },
];

function SocialLinks() {
  return (
    <div className="social-links">
      {socialLinks.map(({ href, label, icon: Icon }) => (
        <a
          key={label}
          href={href}
          className="social-item"
          aria-label={label}
          target="_blank"
          rel="noreferrer noopener"
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}

export default SocialLinks;