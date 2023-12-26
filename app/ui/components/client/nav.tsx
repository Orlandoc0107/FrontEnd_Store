"use client";

import React from "react";
import Regisbtn from "@/app/ui/components/buttons/regist-btn";
import NextAuth from "@/app/ui/components/client/login-btn";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Time from "@/app/ui/components/client/Time"

export default function Nav() {
  const { data: session, status } = useSession();
  const router = useRouter();

  
  const handleSignOut = async () => {
    if (session) {
      await router.push("/");
    }

    await signOut({ redirect: false });
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <div className=" flex gap-2">
        <div>
        <NextAuth />
        </div>
        <div>
          <Link href="/dashboard/perfil">Perfil</Link>
        </div>
        <div>
          <Link href="/dashboard/admin">Admin</Link>
        </div>
        <div>
          <Time />
        </div>
      </div>
    );
  }

  return (
    <div className=" flex gap-2">
      <div>
      <Regisbtn />
      </div>
      <div>
      <NextAuth />
      </div>
    </div>
  );
}
