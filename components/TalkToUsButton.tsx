"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import styles from "./TalkToUsButton.module.css";

export default function TalkToUsButton({
  href = "/#talk",
  className,
  style,
  onClick,
  children = "Talk to us",
  id,
}) {
  return (
    <Link
      id={id}
      href={href}
      onClick={onClick}
      style={style}
      className={cn(styles.btn, className)}
    >
      {children}
    </Link>
  );
}
