"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon } from "lucide-react";
import { Mockup, MockupFrame } from "@/components/ui/mockup";
import { Glow } from "@/components/ui/glow";
import TalkToUsButton from "@/components/TalkToUsButton";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface HeroAction {
  text: string;
  href: string;
  icon?: React.ReactNode;
  variant?: "default" | "glow";
}

interface HeroProps {
  badge?: {
    text: string;
    action: {
      text: string;
      href: string;
    };
  };
  title: React.ReactNode;
  description: string;
  actions: HeroAction[];
  image?: {
    light: string;
    dark: string;
    alt: string;
  };
  centered?: boolean;
  className?: string;
}

export function HeroSection({
  badge,
  title,
  description,
  actions,
  image,
  centered = false,
  className,
}: HeroProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const imageSrc = image
    ? !mounted || resolvedTheme === "light"
      ? image.light
      : image.dark
    : null;

  return (
    <section
      className={cn(
        "bg-background text-foreground",
        "px-4",
        centered
          ? "flex min-h-[100svh] items-center justify-center py-24"
          : "py-12 sm:py-24 md:py-32 fade-bottom overflow-hidden pb-0",
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-container flex-col",
          centered ? "items-center gap-8" : "gap-12 pt-16 sm:gap-24",
        )}
      >
        <div
          className={cn(
            "flex flex-col items-center text-center",
            centered ? "gap-6 sm:gap-8" : "gap-6 sm:gap-12",
          )}
        >
          {badge && (
            <Badge variant="outline" className="animate-appear gap-2">
              <span className="text-muted-foreground">{badge.text}</span>
              <a href={badge.action.href} className="flex items-center gap-1">
                {badge.action.text}
                <ArrowRightIcon className="h-3 w-3" />
              </a>
            </Badge>
          )}

          <h1
            className={cn(
              "relative z-10 inline-block animate-appear font-semibold leading-tight text-foreground drop-shadow-2xl",
              centered
                ? "max-w-4xl text-4xl sm:text-5xl md:text-6xl md:leading-tight"
                : "bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-4xl text-transparent sm:text-6xl sm:leading-tight md:text-8xl md:leading-tight",
            )}
          >
            {title}
          </h1>

          <p
            className={cn(
              "text-md relative z-10 animate-appear font-medium text-muted-foreground opacity-0 delay-100 sm:text-xl",
              centered ? "max-w-[640px]" : "max-w-[550px]",
            )}
          >
            {description}
          </p>

          <div className="relative z-10 flex animate-appear justify-center gap-4 opacity-0 delay-300">
            {actions.map((action, index) =>
              action.text.toLowerCase().includes("talk") ? (
                <TalkToUsButton key={index} href={action.href} />
              ) : (
                <Button key={index} variant={action.variant} size="lg" asChild>
                  <a href={action.href} className="flex items-center gap-2">
                    {action.icon}
                    {action.text}
                  </a>
                </Button>
              ),
            )}
          </div>

          {image && imageSrc ? (
            <div className="relative pt-12">
              <MockupFrame
                className="animate-appear opacity-0 delay-700"
                size="small"
              >
                <Mockup type="responsive">
                  <Image
                    src={imageSrc}
                    alt={image.alt}
                    width={1248}
                    height={765}
                    priority
                  />
                </Mockup>
              </MockupFrame>
              <Glow
                variant="top"
                className="animate-appear-zoom opacity-0 delay-1000"
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
