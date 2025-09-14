import { Helmet } from 'react-helmet-async';
import { organizationSchema, serviceSchemas, faqSchema } from '@/lib/seo-config';
import { BreadcrumbListSchema } from '@/types/seo';

interface StructuredDataProps {
  type?: 'organization' | 'service' | 'faq' | 'breadcrumb';
  serviceType?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
  customSchema?: any;
}

export const StructuredData: React.FC<StructuredDataProps> = ({ 
  type = 'organization', 
  serviceType,
  breadcrumbs,
  customSchema 
}) => {
  const getSchemaData = () => {
    if (customSchema) {
      return customSchema;
    }

    switch (type) {
      case 'organization':
        return organizationSchema;
        
      case 'service':
        if (serviceType && serviceSchemas[serviceType]) {
          return serviceSchemas[serviceType];
        }
        return null;
        
      case 'faq':
        return faqSchema;
        
      case 'breadcrumb':
        if (breadcrumbs && breadcrumbs.length > 0) {
          const breadcrumbSchema: BreadcrumbListSchema = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbs.map((crumb, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: crumb.name,
              item: crumb.url.startsWith('http') ? crumb.url : `https://strive-tech-website.com${crumb.url}`
            }))
          };
          return breadcrumbSchema;
        }
        return null;
        
      default:
        return null;
    }
  };

  const schemaData = getSchemaData();

  if (!schemaData) {
    return null;
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};

// Specific structured data components for common use cases
export const OrganizationStructuredData: React.FC = () => (
  <StructuredData type="organization" />
);

export const ServiceStructuredData: React.FC<{ serviceType: string }> = ({ serviceType }) => (
  <StructuredData type="service" serviceType={serviceType} />
);

export const FAQStructuredData: React.FC = () => (
  <StructuredData type="faq" />
);

export const BreadcrumbStructuredData: React.FC<{ breadcrumbs: Array<{ name: string; url: string }> }> = ({ breadcrumbs }) => (
  <StructuredData type="breadcrumb" breadcrumbs={breadcrumbs} />
);

// Combined structured data for pages that need multiple schemas
export const CombinedStructuredData: React.FC<{
  schemas: Array<{
    type: 'organization' | 'service' | 'faq' | 'breadcrumb';
    serviceType?: string;
    breadcrumbs?: Array<{ name: string; url: string }>;
    customSchema?: any;
  }>;
}> = ({ schemas }) => (
  <>
    {schemas.map((schema, index) => (
      <StructuredData key={index} {...schema} />
    ))}
  </>
);

export default StructuredData;