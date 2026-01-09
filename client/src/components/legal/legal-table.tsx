import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface LegalTableProps {
  headers: string[];
  rows: string[][];
  className?: string;
}

export function LegalTable({ headers, rows, className }: LegalTableProps) {
  return (
    <div className={cn("my-6 overflow-x-auto rounded-lg border border-gray-200", className)}>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 hover:bg-gray-100">
            {headers.map((header, index) => (
              <TableHead
                key={index}
                className="text-gray-900 font-semibold py-3 px-4"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              className={cn(
                "hover:bg-gray-50",
                rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50/50"
              )}
            >
              {row.map((cell, cellIndex) => (
                <TableCell
                  key={cellIndex}
                  className="text-gray-700 py-3 px-4 align-top"
                >
                  {cell.split("\n").map((line, lineIndex) => (
                    <span key={lineIndex}>
                      {line}
                      {lineIndex < cell.split("\n").length - 1 && <br />}
                    </span>
                  ))}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
