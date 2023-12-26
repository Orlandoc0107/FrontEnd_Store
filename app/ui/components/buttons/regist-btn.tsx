import Link from "next/link";
import React from "react";

export default function Regisbtn() {
  return (
    <div>
      <button>
        <Link href="/register">Registrarse</Link>
      </button>
    </div>
  );
}