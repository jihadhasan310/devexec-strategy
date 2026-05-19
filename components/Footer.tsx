import { Globe, Code2, ExternalLink } from "lucide-react";

const footerLinks = {
  Services: [
    { label: "AI & Machine Learning", href: "#services" },
    { label: "Cloud Infrastructure", href: "#services" },
    { label: "Blockchain & Web3", href: "#services" },
    { label: "Automation & RPA", href: "#services" },
    { label: "SaaS Development", href: "#services" },
  ],
  Company: [
    { label: "About Us", href: "#why-us" },
    { label: "Our Process", href: "#process" },
    { label: "Case Studies", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

const socialLinks = [
  {
    label: "Twitter / X",
    href: "https://twitter.com",
    icon: Globe,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: ExternalLink,
  },
  {
    label: "GitHub",
    href: "https://github.com",
    icon: Code2,
  },
];

export default function Footer() {
  return (
    <footer
      className="bg-[#0F1117] border-t border-[#1E2230]"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <a
              href="#"
              className="inline-flex items-center gap-0.5 mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF] rounded"
              aria-label="Devexec Strategy — home"
            >
              <span
                className="text-xl font-bold gradient-text"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Devexec
              </span>
              <span
                className="text-xl font-bold text-[#F0F4FF]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Strategy
              </span>
            </a>
            <p className="text-[#8892A4] text-sm leading-relaxed max-w-xs mb-6">
              Engineering the Future. Executing at Scale. We build AI systems,
              cloud architectures, blockchain protocols, and SaaS platforms for
              ambitious teams worldwide.
            </p>

            {/* Social links */}
            <div className="flex gap-3" aria-label="Social media links">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${social.label}`}
                    className="w-9 h-9 rounded-lg border border-[#1E2230] flex items-center justify-center text-[#8892A4] hover:text-[#00D4FF] hover:border-[#00D4FF]/40 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF]"
                  >
                    <Icon size={16} aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3
                className="text-[#F0F4FF] text-sm font-semibold mb-4"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {category}
              </h3>
              <ul className="space-y-3" role="list">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[#8892A4] text-sm hover:text-[#F0F4FF] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF] rounded"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[#1E2230] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#8892A4] text-xs font-mono">
            © 2025 Devexec Strategy. All rights reserved.
          </p>
          <p className="text-[#8892A4] text-xs font-mono">
            Engineering the Future. Executing at Scale.
          </p>
        </div>
      </div>
    </footer>
  );
}
