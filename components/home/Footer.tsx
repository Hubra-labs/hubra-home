"use client";
import NextLink from "next/link";
import NextImage from "next/image";

const FOOTER_LINKS = {
  Product: [
    { label: "Earn", href: "/defi" },
    { label: "Swap", href: "/link" },
    { label: "Horus", href: "/blog/horus" },
    { label: "Vaults", href: "/defi" },
    { label: "Roadmap", href: "https://docs.hubra.app" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
  ],
  Resources: [
    { label: "Documentation", href: "https://docs.hubra.app" },
    { label: "Community", href: "https://discord.gg/62NFPhpHtH" },
    { label: "Support", href: "https://discord.gg/62NFPhpHtH" },
    { label: "Status", href: "https://status.hubra.app" },
  ],
};

export const Footer = () => {
  return (
    <footer className="w-full border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
          {/* Brand column - spans 2 */}
          <div className="col-span-2">
            <NextLink className="flex items-center gap-2 mb-4" href="/">
              <NextImage alt="Hubra" className="rounded-none" height={28} src="/logo.png" width={28} />
              <span className="text-lg font-semibold text-white">Hubra</span>
            </NextLink>
            <p className="text-sm text-white/40 max-w-xs leading-relaxed">Financial superpowers for everyone.</p>
            {/* Social links */}
            <div className="flex items-center gap-4 mt-6">
              <NextLink className="text-white/30 hover:text-white/60 transition-colors" href="https://x.com/HubraApp" target="_blank">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </NextLink>
              <NextLink
                className="text-white/30 hover:text-white/60 transition-colors"
                href="https://discord.gg/62NFPhpHtH"
                target="_blank">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z" />
                </svg>
              </NextLink>
              <NextLink
                className="text-white/30 hover:text-white/60 transition-colors"
                href="https://github.com/block-sync-one"
                target="_blank">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </NextLink>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <NextLink className="text-sm text-white/40 hover:text-white/70 transition-colors" href={link.href}>
                      {link.label}
                    </NextLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-white/30">&copy; {new Date().getFullYear()} Hubra.</span>
          <div className="flex items-center gap-6">
            <NextLink className="text-xs text-white/30 hover:text-white/50 transition-colors" href="/privacy">
              Privacy
            </NextLink>
            <NextLink className="text-xs text-white/30 hover:text-white/50 transition-colors" href="/terms">
              Terms
            </NextLink>
            <NextLink className="text-xs text-white/30 hover:text-white/50 transition-colors" href="/cookies">
              Cookies
            </NextLink>
          </div>
        </div>
      </div>
    </footer>
  );
};
