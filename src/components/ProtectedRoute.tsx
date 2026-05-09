import { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      toast.error("Please sign in to view that page");
    }
  }, [loading, user]);

  if (loading) {
    return <div className="container py-20 text-center text-muted-foreground">Loading…</div>;
  }
  if (!user) return <Navigate to="/" replace />;
  return <>{children}</>;
}
