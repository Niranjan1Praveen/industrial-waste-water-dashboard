import { LifeBuoy } from "lucide-react";
import StaticPageLayout, {
  Section,
} from "@/components/static-page/staticPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technical Support | Industrial Wastewater Dashboard",
  description: "Troubleshooting guidance and support resources.",
};

export default function SupportPage() {
  return (
    <StaticPageLayout
      icon={LifeBuoy}
      title="Technical Support"
      subtitle="Common issues and where to look before reaching out."
    >
      <Section title="Analysis Results Look Incomplete">
        <p>
          If the treatment prescription section is missing after running an
          analysis, the AI service that generates chemical recommendations
          may be temporarily rate-limited. The rest of the analysis —
          parameter violations, severity classification, and anomaly
          score — is unaffected and will still display normally in this
          case.
        </p>
      </Section>

      <Section title="Equipment or Industry Data Not Loading">
        <p>
          Data for each industry sub-category is loaded from the backend on
          demand. A slow first load is expected if the backend service has
          been idle — it can take up to a minute to wake up. If a specific
          industry consistently fails to load, try refreshing or selecting
          a different sub-category.
        </p>
      </Section>

      <Section title="Checking System Status">
        <p>
          The backend exposes a health diagnostics endpoint that reports
          whether each analysis model and the AI service are currently
          available, which is the fastest way to confirm whether an issue
          is on the backend rather than in the browser.
        </p>
      </Section>

      <Section title="Reporting an Issue">
        <p>
          For issues not covered above, please contact your platform
          administrator or the development team responsible for this
          deployment.
        </p>
      </Section>
    </StaticPageLayout>
  );
}
