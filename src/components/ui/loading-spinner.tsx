import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  className?: string;
  text?: string;
  fullScreen?: boolean;
}

export function LoadingSpinner({
  size = "medium",
  className,
  text,
  fullScreen = false,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    small: "w-8 h-8 border-2",
    medium: "w-12 h-12 border-3",
    large: "w-16 h-16 border-4",
  };

  const spinner = (
    <div
      className={cn(
        sizeClasses[size],
        "border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto",
        className,
      )}
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/90">
        <div className="text-center">
          {spinner}
          {text && <p className="text-yellow-400 text-lg mt-4">{text}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      {spinner}
      {text && <p className="text-yellow-400 text-sm mt-2">{text}</p>}
    </div>
  );
}
