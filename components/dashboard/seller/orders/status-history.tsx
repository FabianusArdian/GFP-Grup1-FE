"use client";

import { formatDistanceToNow } from "date-fns";
import { StatusHistoryEntry } from "@/lib/types/order";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface StatusHistoryProps {
  history: StatusHistoryEntry[];
}

export function StatusHistory({ history }: StatusHistoryProps) {
  return (
    <ScrollArea className="h-[200px] pr-4">
      <div className="space-y-4">
        {history.map((entry) => (
          <div
            key={entry.id}
            className="flex items-start gap-4 border-l-2 border-muted pl-4 relative"
          >
            <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full border-2 border-primary bg-background" />
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="outline">{entry.status}</Badge>
                <span className="text-sm text-muted-foreground">
                  {formatDistanceToNow(entry.timestamp, { addSuffix: true })}
                </span>
              </div>
              {entry.note && (
                <p className="text-sm text-muted-foreground">{entry.note}</p>
              )}
              <p className="text-sm">Updated by {entry.updatedBy}</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}