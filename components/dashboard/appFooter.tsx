"use client";

import Link from "next/link";
import { Shield, Droplets, Gauge, Activity, BarChart3 } from "lucide-react";

interface FooterProps {
  description: string;
  showStatusIndicators?: boolean;
  showAdminLinks?: boolean;
}

function AppFooter({ description, showStatusIndicators = true, showAdminLinks = false }: FooterProps) {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Logo & Description */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-3">
              <span className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Industrial Wastewater Dashboard
              </span>
            </div>
            <p className="text-xs text-muted-foreground max-w-md leading-relaxed">
              {description}
            </p>
          </div>

          {/* Status Indicators */}
          {showStatusIndicators && (
            <div className="flex flex-col sm:flex-row items-center gap-4 text-xs">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Activity className="h-3 w-3 text-green-500" />
                <span>Real-time Monitoring</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="h-3 w-3 text-primary" />
                <span>EPA Standards</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Gauge className="h-3 w-3 text-primary" />
                <span>Treatment Optimization</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <div className="text-center md:text-left">
              © {new Date().getFullYear()} Industrial Wastewater Management System.
            </div>
            <div className="flex flex-wrap items-center gap-6 justify-center">
              <Link
                href="/compliance"
                className="hover:text-primary transition-colors"
              >
                Compliance Standards
              </Link>
              <Link
                href="/methodology"
                className="hover:text-primary transition-colors"
              >
                Treatment Methodology
              </Link>
              <Link
                href="/environmental-policy"
                className="hover:text-primary transition-colors"
              >
                Environmental Policy
              </Link>
              <Link
                href="/support"
                className="hover:text-primary transition-colors"
              >
                Technical Support
              </Link>
              {showAdminLinks && (
                <>
                  <Link
                    href="/admin"
                    className="hover:text-primary transition-colors"
                  >
                    Admin Dashboard
                  </Link>
                  <Link
                    href="/analytics"
                    className="hover:text-primary transition-colors"
                  >
                    Analytics
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default AppFooter;