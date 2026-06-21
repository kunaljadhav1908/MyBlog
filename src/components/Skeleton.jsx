import React from "react";
import { cn } from "../utils/cn";

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-white/5", className)}
      {...props}
    />
  );
}

export function PostCardSkeleton() {
  return (
    <div className="glass rounded-3xl overflow-hidden border border-white/5 p-4 space-y-4">
      <Skeleton className="aspect-video w-full rounded-2xl" />

      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>

      <div className="pt-4 border-t border-white/10">
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
}

export default Skeleton;
