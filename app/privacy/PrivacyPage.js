"use client";

import LegalDocPage from "@/components/LegalDocPage";
import { PRIVACY_EFFECTIVE_DATE, PRIVACY_SECTIONS } from "./content";

export default function PrivacyPage() {
  return (
    <LegalDocPage
      title="Privacy Policy"
      effectiveDate={PRIVACY_EFFECTIVE_DATE}
      sections={PRIVACY_SECTIONS}
      navLabel="Privacy sections"
    />
  );
}
