import { LoadingSpinner } from "@/components/UI/loading-spinner";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );
} 