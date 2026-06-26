"use client";

import { use } from "react";
import { redirect } from "next/navigation";
import { industries } from "@/data/industries";
import IndustryView from "@/components/dashboard/industryView";

interface Props {
  params: Promise<{ industryId: string; subCategoryId: string }>;
}

export default function IndustryPage({ params }: Props) {
  const { industryId, subCategoryId } = use(params);
  const industry = industries.find((i) => i.id === industryId);
  const sub = industry?.subCategories.find((s) => s.id === subCategoryId);

  if (!sub) {
    redirect("/dashboard");
  }

  return <IndustryView selectedSubCategory={sub} />;
}
