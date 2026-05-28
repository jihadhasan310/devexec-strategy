import Image from "next/image";
import { XIcon, LinkedInIcon, GithubIcon } from "@/components/icons/SocialIcons";

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
  { label: "X", href: "https://x.com/devexecstrategy", icon: XIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/devexec-strategy", icon: LinkedInIcon },
  { label: "GitHub", href: "https://github.com/jihadhasan310/devexec-strategy", icon: GithubIcon },
];

export default function Footer() {
  return (
    <footer className="bg-[#0F1117] border-t border-[#1E2230]" role="contentinfo" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="col-span-2 sm:col-span-2 lg:col-span-2">
            <a
              href="#"
              className="inline-flex items-center mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF] rounded"
              aria-label="Devexec Strategy — home"
            >
              <Image
                src="/logo.png"
                alt="Devexec Strategy"
                width={220}
                height={40}
                className="h-7 sm:h-8 w-auto"
              />
            </a>
            <p className="text-[#8892A4] text-sm leading-relaxed max-w-xs mb-6">
              Engineering the Future. Executing at Scale. We build AI systems,
              cloud architectures, blockchain protocols, and SaaS platforms for
              ambitious teams worldwide.
            </p>
            <div className="flex gap-3" aria-label="Social media links">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${label}`}
                  className="w-9 h-9 rounded-lg border border-[#1E2230] flex items-center justify-center text-[#8892A4] hover:text-[#00D4FF] hover:border-[#00D4FF]/40 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF]"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-[#F0F4FF] text-sm font-semibold mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                {category}
              </h3>
              <ul className="space-y-2.5" role="list">
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

        <div className="mt-10 pt-8 border-t border-[#1E2230] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-[#8892A4] text-xs font-mono">© 2026 Devexec Strategy. All rights reserved.</p>
          <p className="text-[#8892A4] text-xs font-mono">Engineering the Future. Executing at Scale.</p>
        </div>
      </div>
    </footer>
  );
}
