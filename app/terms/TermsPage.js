"use client";

import LegalDocPage from "@/components/LegalDocPage";
import { TERMS_EFFECTIVE_DATE, TERMS_SECTIONS } from "./content";

export default function TermsPage() {
  return (
    <LegalDocPage
      title="Terms & Conditions"
      effectiveDate={TERMS_EFFECTIVE_DATE}
      sections={TERMS_SECTIONS}
      navLabel="Terms sections"
    />
  );
}
