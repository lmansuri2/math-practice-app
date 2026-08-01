import React, { useState, useEffect } from "react";
import { supabase } from "./supabase";
import Login from "./Login";
import Menu from "./Menu";

export default function Redirect() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // 1. Check for any pre-existing logged-in sessions when the app opens
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
    });

    // 2. Listen live for Sign-In, Sign-Up, and Log-Out events
    const { data } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        setSession(currentSession); // This triggers your screen swap instantly!
      },
    );

    // 3. Clean up the listener memory when the screen closes
    return () => {
      if (data && data.subscription) {
        data.subscription.unsubscribe();
      }
    };
  }, []);

  // 4. Return the correct screen based on the session token
  return session ? <Menu /> : <Login />;
}
