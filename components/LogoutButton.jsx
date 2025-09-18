"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) return null; // Hide button if user not logged in

  const handleLogout = async () => {
    await signOut({ redirect: false }); // Sign out without automatic redirect
    router.push("/sign-in");            // Redirect to Sign-In page
  };

  return <Button onClick={handleLogout}>Logout</Button>;
}
