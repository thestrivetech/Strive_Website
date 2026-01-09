import { LegalTable } from "./legal-table";
import { cn } from "@/lib/utils";

// Types for content items
interface ListContent {
  type: "list";
  ordered?: boolean;
  items: string[];
}

interface BoldText {
  type: "bold";
  text: string;
}

interface TableContent {
  type: "table";
  headers: string[];
  rows: string[][];
}

interface SubSection {
  type: "subsection";
  id: string;
  title: string;
  content: ContentItem[];
}

type ContentItem = string | ListContent | BoldText | TableContent | SubSection;

interface LegalSectionProps {
  id: string;
  title: string;
  content: ContentItem[];
  className?: string;
}

// Renders a single content item
function ContentRenderer({ item }: { item: ContentItem }) {
  if (typeof item === "string") {
    // Handle multi-line strings
    const lines = item.split("\n");
    return (
      <p className="text-gray-700 leading-relaxed mb-4">
        {lines.map((line, index) => (
          <span key={index}>
            {line}
            {index < lines.length - 1 && <br />}
          </span>
        ))}
      </p>
    );
  }

  if (item.type === "bold") {
    return (
      <p className="text-gray-900 font-semibold mb-2 mt-4">{item.text}</p>
    );
  }

  if (item.type === "list") {
    const ListTag = item.ordered ? "ol" : "ul";
    return (
      <ListTag
        className={cn(
          "mb-4 pl-6 space-y-2",
          item.ordered ? "list-decimal" : "list-disc"
        )}
      >
        {item.items.map((listItem, index) => (
          <li key={index} className="text-gray-700 leading-relaxed">
            {listItem}
          </li>
        ))}
      </ListTag>
    );
  }

  if (item.type === "table") {
    return <LegalTable headers={item.headers} rows={item.rows} />;
  }

  if (item.type === "subsection") {
    return (
      <div id={item.id} className="mt-6 scroll-mt-24">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
        <div className="pl-0">
          {item.content.map((subItem, index) => (
            <ContentRenderer key={index} item={subItem} />
          ))}
        </div>
      </div>
    );
  }

  return null;
}

export function LegalSection({ id, title, content, className }: LegalSectionProps) {
  return (
    <section id={id} className={cn("mb-10 scroll-mt-24", className)}>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
        {title}
      </h2>
      <div className="space-y-0">
        {content.map((item, index) => (
          <ContentRenderer key={index} item={item} />
        ))}
      </div>
    </section>
  );
}
