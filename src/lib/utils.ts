import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));
}

export function formatRole(role: string) {
  const labels: Record<string, string> = {
    student: "学生",
    worker: "社会人",
    sales: "営業",
    other: "その他",
  };

  return labels[role] ?? role;
}
