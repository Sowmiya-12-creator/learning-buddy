"use client";

import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  variant?: "card" | "text" | "avatar" | "stat" | "list-item" | "chat";
  count?: number;
  className?: string;
}

const Shimmer = ({ className }: { className?: string }) => (
  <div className={cn("animate-pulse rounded-xl bg-white/8", className)} />
);

function CardSkeleton() {
  return (
    <div className="glass-card p-5 space-y-3">
      <Shimmer className="h-4 w-2/3" />
      <Shimmer className="h-3 w-1/2" />
      <Shimmer className="h-2 w-full rounded-full" />
    </div>
  );
}

function StatSkeleton() {
  return (
    <div className="glass-card p-4 flex items-center gap-4">
      <Shimmer className="w-12 h-12 rounded-2xl flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Shimmer className="h-3 w-1/2" />
        <Shimmer className="h-6 w-1/3" />
      </div>
    </div>
  );
}

function TextSkeleton() {
  return (
    <div className="space-y-2">
      <Shimmer className="h-4 w-full" />
      <Shimmer className="h-4 w-3/4" />
      <Shimmer className="h-4 w-1/2" />
    </div>
  );
}

function AvatarSkeleton() {
  return (
    <div className="flex items-center gap-3">
      <Shimmer className="w-10 h-10 rounded-full flex-shrink-0" />
      <div className="space-y-1.5 flex-1">
        <Shimmer className="h-3 w-1/3" />
        <Shimmer className="h-3 w-1/2" />
      </div>
    </div>
  );
}

function ListItemSkeleton() {
  return (
    <div className="glass-card p-4 flex items-center gap-3">
      <Shimmer className="w-9 h-9 rounded-xl flex-shrink-0" />
      <div className="flex-1 space-y-1.5">
        <Shimmer className="h-3 w-1/2" />
        <Shimmer className="h-3 w-3/4" />
      </div>
      <Shimmer className="w-16 h-6 rounded-full flex-shrink-0" />
    </div>
  );
}

function ChatSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <Shimmer className="w-8 h-8 rounded-full flex-shrink-0" />
        <Shimmer className="h-16 w-3/4 rounded-2xl" />
      </div>
      <div className="flex gap-3 flex-row-reverse">
        <Shimmer className="w-8 h-8 rounded-full flex-shrink-0" />
        <Shimmer className="h-12 w-1/2 rounded-2xl" />
      </div>
    </div>
  );
}

const variantMap = {
  card:       CardSkeleton,
  text:       TextSkeleton,
  avatar:     AvatarSkeleton,
  stat:       StatSkeleton,
  "list-item": ListItemSkeleton,
  chat:       ChatSkeleton,
};

export default function LoadingSkeleton({
  variant = "card",
  count = 1,
  className,
}: LoadingSkeletonProps) {
  const SkeletonComponent = variantMap[variant];

  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonComponent key={i} />
      ))}
    </div>
  );
}
