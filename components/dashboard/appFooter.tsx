import Image from "next/image";
import Link from "next/link";

interface FooterProps {
  description: string;
  showStatusIndicators?: boolean;
  showAdminLinks?: boolean;
}

function AppFooter({ description, showStatusIndicators = true, showAdminLinks = false }: FooterProps) {
  return (
    <div className="section w-full py-10 bg-[var(--background)]">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Logo & Description */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start mb-3">
            <span className="text-sm font-semibold text-[var(--ink)] uppercase tracking-wider">
              Industrial Wastewater Dashboard
            </span>
          </div>
          <p className="text-xs text-[var(--warm-gray)] max-w-md leading-relaxed">
            {description}
          </p>
        </div>

        {/* Status Indicators */}
        {showStatusIndicators && (
          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs">
            <div className="flex items-center gap-2 text-[var(--warm-gray)]">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <span>Real-time Monitoring</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--warm-gray)]">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span>EPA Standards</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--warm-gray)]">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <span>Treatment Optimization</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Section */}
      <div className="mt-8 pt-6 border-t border-[var(--border-strong)]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[var(--warm-gray)]">
          <div className="text-center md:text-left">
            © {new Date().getFullYear()} Industrial Wastewater Management System. 
          </div>
          <div className="flex flex-wrap items-center gap-6 justify-center">
            <Link
              href="/compliance"
              className="hover:text-[var(--gold)] transition-colors"
            >
              Compliance Standards
            </Link>
            <Link
              href="/methodology"
              className="hover:text-[var(--gold)] transition-colors"
            >
              Treatment Methodology
            </Link>
            <Link
              href="/environmental-policy"
              className="hover:text-[var(--gold)] transition-colors"
            >
              Environmental Policy
            </Link>
            <Link
              href="/support"
              className="hover:text-[var(--gold)] transition-colors"
            >
              Technical Support
            </Link>
            {showAdminLinks && (
              <>
                <Link
                  href="/admin"
                  className="hover:text-[var(--gold)] transition-colors"
                >
                  Admin Dashboard
                </Link>
                <Link
                  href="/analytics"
                  className="hover:text-[var(--gold)] transition-colors"
                >
                  Analytics
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppFooter;