"use client";
import Link from "next/link";
import React from "react";

type Props = {};

const Logo = (props: Props) => {
  return (
    <Link href={"/"} className="flex items-center gap-2">
      <img src="/logo.png" className="h-40 w-40" alt="logo" />
    </Link>
  );
};

export default Logo;
