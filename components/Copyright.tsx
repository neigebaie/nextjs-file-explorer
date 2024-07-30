"use client";

import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";

type Props = {};

export default function Copyright({}: Props) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col items-center justify-center pt-20 text-muted-foreground gap-6">
      <Button variant={"outline"}>
        <Link
          href="https://ko-fi.com/paulserander"
          target="_blank"
          className="flex flex-row items-center gap-2 font-bold text-xs"
        >
          <img
            height={24}
            width={24}
            src="https://storage.ko-fi.com/cdn/nav-logo-stroke.png"
            className="animate-tilt"
          />
          Soutenir Tidning sur Ko-Fi
        </Link>
      </Button>
      <p className="text-xs md:text-sm text-center">
        Copyright &copy; {currentYear} Tidning. <br className="lg:hidden" />{" "}
        Conception et développement par {" "}
        <Link
          href="https://github.com/neigebaie"
          target="_blank"
          className="underline"
        >
          Paul Serander
        </Link>
        .
      </p>
    </div>
  );
}
