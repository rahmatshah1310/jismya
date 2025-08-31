// app/search/page.js
"use client";

import { Suspense } from "react";
import SearchPageContent from "./SearchPageContent";

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
