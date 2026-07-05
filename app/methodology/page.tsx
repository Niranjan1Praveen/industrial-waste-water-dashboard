import { FlaskConical } from "lucide-react";
import StaticPageLayout, {
  Section,
} from "@/components/static-page/staticPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Treatment Methodology | Industrial Wastewater Dashboard",
  description:
    "How the platform analyzes effluent samples and generates treatment recommendations.",
};

export default function MethodologyPage() {
  return (
    <StaticPageLayout
      icon={FlaskConical}
      title="Treatment Methodology"
      subtitle="How an effluent sample moves from raw readings to a treatment recommendation."
    >
      <Section title="1. Threshold and Anomaly Screening">
        <p>
          Every submitted sample is first checked against CPCB/EPA parameter
          thresholds to flag individual violations. In parallel, an
          IsolationForest anomaly model — trained on industry-specific
          effluent profiles — scores the sample as a whole, catching
          combinations of values that look unusual even when no single
          parameter has crossed a hard limit.
        </p>
      </Section>

      <Section title="2. Severity Classification">
        <p>
          A RandomForest classifier assigns an overall severity label —
          Normal, Warning, or Critical — using the same threshold and
          anomaly signals, giving a single at-a-glance status for the
          sample alongside the detailed per-parameter breakdown.
        </p>
      </Section>

      <Section title="3. AI-Generated Treatment Prescriptions">
        <p>
          For each violated parameter, a schema-constrained call to Google
          Gemini generates a structured treatment recommendation: the
          chemical reagent, a dosage range, the relevant unit process, the
          expected outcome, and an approximate cost band. If the AI service
          is temporarily unavailable, the platform falls back to a
          template-based summary so the dashboard never shows a broken
          state — though detailed per-chemical prescriptions are only
          available when the AI-generated path succeeds.
        </p>
      </Section>

      <Section title="4. Equipment Health and Forecasting">
        <p>
          Pump and blower sensor readings are scored the same way — an
          IsolationForest tuned to ISO 10816 vibration bands plus direct
          threshold checks — and forecasting models project short-term
          trends for select parameters using recent historical values from
          each industry's dataset.
        </p>
      </Section>
    </StaticPageLayout>
  );
}
