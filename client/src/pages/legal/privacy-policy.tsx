import { MetaTags } from "@/components/seo/meta-tags";
import { useSEO } from "@/hooks/use-seo";
import { LegalSection } from "@/components/legal";
import {
  privacyPolicyMetadata,
  privacySections,
  companyInfo,
} from "@/data/legal/privacy-policy-content";

export function PrivacyPolicyPage() {
  const { seoConfig } = useSEO();

  return (
    <>
      <MetaTags seo={seoConfig} />
      <div className="pt-16 bg-white min-h-screen">
        <div className="pt-12 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <header className="mb-10 text-center">
                <p className="text-sm font-medium text-orange-600 uppercase tracking-wide mb-2">
                  {privacyPolicyMetadata.subtitle}
                </p>
                <h1
                  className="text-4xl font-bold text-gray-900 mb-4"
                  data-testid="text-privacy-title"
                >
                  {privacyPolicyMetadata.title}
                </h1>
                <p className="text-gray-600">
                  Last Updated: {privacyPolicyMetadata.lastUpdated}
                </p>
              </header>

              {/* Content */}
              <div className="bg-white">
                {privacySections.map((section) => (
                  <LegalSection
                    key={section.id}
                    id={section.id}
                    title={section.title}
                    content={section.content}
                  />
                ))}
              </div>

              {/* Contact Footer */}
              <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Contact Information
                </h2>
                <div className="text-gray-700 space-y-1">
                  <p className="font-medium">{companyInfo.name}</p>
                  <p>{companyInfo.address}</p>
                  <p>{companyInfo.city}</p>
                  <p>
                    Email:{" "}
                    <a
                      href={`mailto:${companyInfo.email}`}
                      className="text-orange-600 hover:underline"
                    >
                      {companyInfo.email}
                    </a>
                  </p>
                  <p>Phone: {companyInfo.phone}</p>
                  <p>
                    Website:{" "}
                    <a
                      href={companyInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-600 hover:underline"
                    >
                      {companyInfo.website}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrivacyPolicyPage;
