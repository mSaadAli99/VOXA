"use client";

import type { CSSProperties, MouseEventHandler, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MEETING_URL } from "@/lib/meeting";
import styles from "./TalkToUsButton.module.css";

type TalkToUsButtonProps = {
  href?: string;
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  children?: ReactNode;
  id?: string;
};

export default function TalkToUsButton({
  href = MEETING_URL,
  className,
  style,
  onClick,
  children = "Talk to us",
  id,
}: TalkToUsButtonProps) {
  const external = /^https?:\/\//.test(href);

  return (
    <Link
      id={id}
      href={href}
      onClick={onClick}
      style={style}
      className={cn(styles.btn, className)}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      <span className={styles.label}>{children}</span>
    </Link>
  );
}
