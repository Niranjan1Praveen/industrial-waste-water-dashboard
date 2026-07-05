import { Shield } from "lucide-react";
import StaticPageLayout, {
  Section,
} from "@/components/static-page/staticPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compliance Standards | Industrial Wastewater Dashboard",
  description:
    "Regulatory standards referenced by the platform's effluent and equipment analysis.",
};

export default function CompliancePage() {
  return (
    <StaticPageLayout
      icon={Shield}
      title="Compliance Standards"
      subtitle="The regulatory frameworks this platform's analysis is calibrated against."
    >
      <Section title="Wastewater Parameter Thresholds">
        <p>
          Effluent parameter violations (BOD, COD, TSS, TDS, pH, Oil &amp;
          Grease, Ammonia, and Temperature) are evaluated against limits
          drawn from the Central Pollution Control Board (CPCB) General
          Standards for Discharge of Environmental Pollutants and comparable
          EPA effluent guidelines. Each parameter carries a Normal, Warning,
          and Critical band, and the platform flags a sample the moment it
          crosses into Warning or Critical territory.
        </p>
      </Section>

      <Section title="Equipment Vibration Severity">
        <p>
          Pump and blower health classification follows ISO 10816, the
          international standard for evaluating mechanical vibration
          severity in rotating machinery. Sound, vibration, and temperature
          readings are checked against equipment-type-specific Normal,
          Warning, and Critical bands derived from this standard.
        </p>
      </Section>

      <Section title="Scope and Limitations">
        <p>
          This platform is a decision-support tool. Its anomaly detection,
          classification, and forecasting outputs — and the treatment or
          maintenance recommendations generated from them — are intended to
          assist a qualified environmental engineer or maintenance
          professional, not to replace regulatory certification, statutory
          reporting, or professional sign-off. Facility operators remain
          responsible for verifying compliance with applicable local,
          state, and national regulations before acting on any
          recommendation shown here.
        </p>
      </Section>
    </StaticPageLayout>
  );
}
