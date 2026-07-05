import Link from "next/link";
import { ArrowLeft, type LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StaticPageLayoutProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function StaticPageLayout({
  icon: Icon,
  title,
  subtitle,
  children,
}: StaticPageLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <Icon className="h-7 w-7 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            {title}
          </h1>
        </div>
        <p className="text-sm text-muted-foreground mb-8">{subtitle}</p>

        <Card>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none px-4 space-y-6">
            {children}
          </CardContent>
        </Card>

        <p className="text-xs text-muted-foreground text-center mt-8">
          © {new Date().getFullYear()} Industrial Wastewater Management
          System.
        </p>
      </div>
    </div>
  );
}

export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-base font-semibold text-foreground mb-2">
        {title}
      </h2>
      <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
        {children}
      </div>
    </section>
  );
}
