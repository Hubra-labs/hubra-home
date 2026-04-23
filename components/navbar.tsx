"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
  Button,
  Link,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import NextLink from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";
import { track } from "@vercel/analytics";

import { siteConfig } from "@/config/site";

type NavbarProps = {
  stakeButton?: React.ReactNode;
};

export const Navbar = ({ stakeButton }: NavbarProps) => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Ensure component is mounted on client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  /**
   * Check if a path is currently active
   * @param href - The path to check
   * @returns true if the path matches the current pathname
   */
  const isActive = (href: string): boolean => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  /**
   * Check if a dropdown menu has any active child items
   * @param navItems - Array of navigation items
   * @returns true if any child item is active
   */
  const hasActiveChild = (navItems?: Array<{ href: string; label: string; icon?: string }>): boolean => {
    return navItems?.some((child) => isActive(child.href)) ?? false;
  };

  /**
   * Track navigation click events
   */
  const trackNavClick = (label: string, href: string, location: "desktop" | "mobile" | "cta") => {
    track("nav_click", { label, href, location });
  };

  // Filter navigation items (exclude Home for desktop, Stats will be separate)
  const navItems = siteConfig.navItems.filter((item) => item.label !== "Home" && item.label !== "Stats");

  return (
    <HeroUINavbar
      className="backdrop-blur-xl bg-[#0a0a14]/70 border-b border-white/[0.06] supports-[backdrop-filter]:bg-[#0a0a14]/55"
      classNames={{
        base: "z-[60] relative",
        wrapper: "max-w-7xl mx-auto px-4 md:px-6",
        menuItem: "text-white",
        menu: "text-white bg-[#0a0a14]/95 backdrop-blur-xl z-[60]",
        item: "text-white",
      }}
      isMenuOpen={isMenuOpen}
      maxWidth="xl"
      position="sticky"
      onMenuOpenChange={setIsMenuOpen}>
      {/* Brand/Logo */}
      <NavbarBrand as="li" className="gap-3 max-w-fit md:mr-16">
        <NextLink className="flex justify-start items-center gap-2" href="/">
          {/* <NextImage priority alt="Hubra" className="rounded-none" height={24} src="/image/logo.svg" width={24} /> */}
          <p className="font-bold text-white text-lg">Hubra</p>
        </NextLink>
      </NavbarBrand>

      {/* Desktop Navigation */}
      <NavbarContent className="hidden lg:flex gap-1" justify="center">
        {navItems.map(
          (item) =>
            item.show && (
              <NavbarItem key={item.label}>
                {item.navItems ? (
                  <Dropdown
                    classNames={{
                      base: "relative z-[55]",
                      content: "z-[55]",
                    }}
                    shouldBlockScroll={false}>
                    <DropdownTrigger>
                      <Button
                        className={`font-medium text-sm rounded-full px-4 transition-all duration-200 ${
                          hasActiveChild(item.navItems)
                            ? "!text-primary !bg-primary/[0.12] data-[hover=true]:!bg-primary/[0.20]"
                            : "!text-white/60 data-[hover=true]:!text-white data-[hover=true]:!bg-white/[0.06]"
                        }`}
                        endContent={<ChevronDown size={16} />}
                        variant="light">
                        {item.label}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label={`${item.label} menu`}
                      className="bg-[#0a0a14]/95 backdrop-blur-xl border border-white/[0.08] rounded-xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] p-1"
                      style={{ zIndex: 55 }}>
                      {item.navItems.map((child) => (
                        <DropdownItem
                          key={child.href}
                          as={NextLink}
                          className={`rounded-lg transition-all duration-200 ${
                            isActive(child.href)
                              ? "text-primary bg-primary/[0.12] font-semibold data-[hover=true]:bg-primary/[0.18] data-[hover=true]:text-primary"
                              : "text-white/70 data-[hover=true]:bg-white/[0.06] data-[hover=true]:text-white"
                          }`}
                          href={child.href}
                          startContent={null}>
                          {child.label}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                ) : (
                  item.href && (
                    <Button
                      as={NextLink}
                      className={`font-medium text-sm rounded-full px-4 transition-all duration-200 ${
                        isActive(item.href)
                          ? "!text-primary !bg-primary/[0.12] data-[hover=true]:!bg-primary/[0.20]"
                          : "!text-white/60 data-[hover=true]:!text-white data-[hover=true]:!bg-white/[0.06]"
                      }`}
                      href={item.href}
                      variant="light">
                      {item.label}
                    </Button>
                  )
                )}
              </NavbarItem>
            )
        )}
      </NavbarContent>

      {/* Right side content */}
      <NavbarContent justify="end">
        {/* Stats Button - Desktop only */}
        {/*        <NavbarItem className="hidden lg:flex">
          <NextLink href="/stats">
            <Button className="text-gray-300 hover:text-white transition-colors duration-200" variant="light">
              Stats
            </Button>
          </NextLink>
        </NavbarItem>*/}
        {/* Stake SOL Button - Desktop only (server-rendered with APY) */}
        <NavbarItem className="hidden lg:flex">
          {stakeButton ?? (
            <Button
              as={Link}
              className="text-sm font-medium !text-primary !bg-primary/[0.10] data-[hover=true]:!bg-primary/[0.20] border border-primary/25 transition-all duration-200"
              href="https://hubra.app/earn/stake"
              radius="full"
              variant="light"
              onPress={() => trackNavClick("Stake SOL", "https://hubra.app/earn/stake", "cta")}>
              Stake SOL
            </Button>
          )}
        </NavbarItem>

        {/* Launch App Button - Desktop only */}

        <NavbarItem className="hidden lg:flex">
          <Button
            as={Link}
            className="text-sm font-semibold !text-black !bg-white data-[hover=true]:!bg-white/90 data-[hover=true]:shadow-[0_10px_30px_-12px_rgba(255,255,255,0.5)] transition-all duration-200"
            endContent={isMounted ? <ArrowRight size={14} /> : null}
            href="/link"
            radius="full"
            variant="flat"
            onPress={() => trackNavClick("Launch App", "/link", "cta")}>
            Launch App
          </Button>
        </NavbarItem>

        {/* Mobile menu toggle - Right side */}
        <NavbarItem className="lg:hidden">
          <Button
            isIconOnly
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="text-primary bg-transparent hover:bg-white/10"
            variant="light"
            onPress={() => setIsMenuOpen(!isMenuOpen)}>
            <div className="flex flex-col gap-1">
              <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
              <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`} />
              <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </div>
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="bg-[#0a0a14]/95 backdrop-blur-xl border-t border-white/[0.06]">
        <div className="flex flex-col gap-1 px-2">
          {siteConfig.navMenuItems.map(
            (item, index) =>
              item.show && (
                <NavbarMenuItem key={`${item.label}-${index}`}>
                  {item.navItems ? (
                    <div className="space-y-1.5">
                      <div
                        className={`text-xs font-semibold uppercase tracking-[0.18em] px-3 py-2 ${
                          hasActiveChild(item.navItems) ? "text-primary" : "text-white/35"
                        }`}>
                        {item.label}
                      </div>
                      <div className="space-y-1">
                        {item.navItems.map((child) => (
                          <NextLink
                            key={child.href}
                            className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                              isActive(child.href)
                                ? "text-primary bg-primary/[0.12] font-semibold"
                                : "text-white/70 hover:text-white hover:bg-white/[0.06]"
                            }`}
                            href={child.href}
                            onClick={() => setIsMenuOpen(false)}>
                            {child.label}
                          </NextLink>
                        ))}
                      </div>
                    </div>
                  ) : (
                    item.href && (
                      <NextLink
                        className={`w-full text-left block py-3 px-4 text-lg rounded-xl transition-all duration-200 ${
                          isActive(item.href)
                            ? "text-primary bg-primary/[0.12] font-semibold"
                            : "text-white/70 hover:text-white hover:bg-white/[0.06]"
                        }`}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}>
                        {item.label}
                      </NextLink>
                    )
                  )}
                </NavbarMenuItem>
              )
          )}

          {/* Mobile Stake SOL Button */}
          <div className="pt-5">
            {stakeButton ?? (
              <Button
                as={Link}
                className="w-fit text-sm font-medium text-primary bg-primary/[0.10] hover:bg-primary/[0.18] border border-primary/20 transition-all duration-200"
                href="https://hubra.app/earn/stake"
                radius="full"
                variant="light"
                onPress={() => trackNavClick("Stake SOL", "https://hubra.app/earn/stake", "cta")}>
                Stake SOL
              </Button>
            )}
          </div>

          {/* Mobile Launch App Button */}
          <div className="pt-3">
            <Button
              as={NextLink}
              className="w-full text-sm font-semibold text-black bg-white hover:bg-white/90 transition-all duration-200"
              endContent={isMounted ? <ArrowRight size={14} /> : null}
              href="/link"
              radius="full"
              variant="flat"
              onPress={() => {
                trackNavClick("Launch App", "/link", "cta");
                setIsMenuOpen(false);
              }}>
              Launch App
            </Button>
          </div>
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
