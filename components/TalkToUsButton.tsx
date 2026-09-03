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
  const classNames = cn(styles.btn, className);

  if (external) {
    return (
      <a
        id={id}
        href={href}
        onClick={onClick}
        style={style}
        className={classNames}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className={styles.label}>{children}</span>
      </a>
    );
  }

  return (
    <Link id={id} href={href} onClick={onClick} style={style} className={classNames}>
      <span className={styles.label}>{children}</span>
    </Link>
  );
}
