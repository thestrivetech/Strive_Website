import { MetaTags } from "@/components/seo/meta-tags";
import { useSEO } from "@/hooks/use-seo";
import { LegalSection, TableOfContents } from "@/components/legal";
import {
  tosMetadata,
  tableOfContents,
  tosSections,
  appendices,
  contactInfo,
  copyrightNotice,
} from "@/data/legal/terms-of-service-content";

export function TermsOfServicePage() {
  const { seoConfig } = useSEO();

  return (
    <>
      <MetaTags seo={seoConfig} />
      <div className="pt-16 bg-white min-h-screen">
        <div className="pt-12 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <header className="mb-10 text-center max-w-4xl mx-auto">
              <p className="text-sm font-medium text-orange-600 uppercase tracking-wide mb-2">
                {tosMetadata.subtitle}
              </p>
              <h1
                className="text-4xl font-bold text-gray-900 mb-4"
                data-testid="text-tos-title"
              >
                {tosMetadata.title}
              </h1>
              <p className="text-gray-600">
                Last Updated: {tosMetadata.lastUpdated}
              </p>
            </header>

            {/* Main Content with Sidebar */}
            <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
              {/* Table of Contents - Sidebar on Desktop */}
              <aside className="lg:w-72 flex-shrink-0">
                <TableOfContents items={tableOfContents} />
              </aside>

              {/* Content */}
              <main className="flex-1 min-w-0 max-w-4xl">
                {/* Mobile ToC is rendered inside TableOfContents component */}

                {/* Sections */}
                <div className="bg-white">
                  {tosSections.map((section) => (
                    <LegalSection
                      key={section.id}
                      id={section.id}
                      title={`${section.number}. ${section.title}`}
                      content={section.content}
                    />
                  ))}
                </div>

                {/* Appendices */}
                <section className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Appendices
                  </h2>
                  <p className="text-gray-700 mb-4">
                    The following appendices are incorporated by reference and
                    available in the Help Center:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    {appendices.map((appendix, index) => (
                      <li key={index} className="text-gray-700">
                        {appendix}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Contact Information */}
                <section className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Contact Information
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">
                        Legal/Privacy Inquiries
                      </h3>
                      <a
                        href={`mailto:${contactInfo.legalPrivacy}`}
                        className="text-orange-600 hover:underline"
                      >
                        {contactInfo.legalPrivacy}
                      </a>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">
                        Security/Abuse Reports
                      </h3>
                      <a
                        href={`mailto:${contactInfo.securityAbuse}`}
                        className="text-orange-600 hover:underline"
                      >
                        {contactInfo.securityAbuse}
                      </a>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">
                        Support/Billing
                      </h3>
                      <a
                        href={`mailto:${contactInfo.supportBilling}`}
                        className="text-orange-600 hover:underline"
                      >
                        {contactInfo.supportBilling}
                      </a>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">
                        Mailing Address
                      </h3>
                      <div className="text-gray-700">
                        <p>{contactInfo.mailingAddress.company}</p>
                        <p>{contactInfo.mailingAddress.attention}</p>
                        <p>{contactInfo.mailingAddress.address}</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Copyright Notice */}
                <footer className="mt-8 text-center text-gray-600 text-sm">
                  <p>{copyrightNotice}</p>
                </footer>
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TermsOfServicePage;
