import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../supabase";

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-sky-600">Checking authorization...</div>;
  }

  // 🚫 No session (not logged in)
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // 🔐 Admin-only protection (optional)
  if (requireAdmin) {
    const userRole = session.user?.user_metadata?.role || "user"; // Example: you store roles in metadata
    if (userRole !== "admin") {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
}
