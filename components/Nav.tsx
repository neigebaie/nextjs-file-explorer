"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { ModeToggle } from "./ui/toggle-mode";
import BreadcrumbsPath from "./BreadcrumbsPath";

export default function Nav() {
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/50 backdrop-blur z-20">
      <nav className="h-14 flex items-center px-8">
        <Link href={"/"}>
          <div className="flex flex-row items-center gap-2 justify-center">
            <p className="text-xl">☁️</p>
            <h1 className="font-bold">Tidning</h1>
          </div>
        </Link>

        <span className="px-4" />

        <BreadcrumbsPath />

        <span className="flex-grow" />

        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger>
            <Menu className="flex md:hidden" />
          </SheetTrigger>
          <SheetContent className="flex flex-col gap-8 items-center px-10 pt-16 w-[70%] supports-backdrop-blur:bg-background/80 border-b bg-background/80 backdrop-blur">
            <div className="flex flex-row gap-4">
              <ModeToggle />
            </div>

            <div className="flex-grow" />
            <Link
              href="/"
              className="hover:text-primary"
              onClick={() => setSheetOpen(false)}
            >
              <p className="flex flex-row gap-2 items-center text-lg font-bold">
                <Image
                  className="animate-tilt"
                  src="/tidning.png"
                  alt="Tidning Logo"
                  width={24}
                  height={24}
                  priority
                />
                Tidning
              </p>
            </Link>
            <p className="text-muted-foreground">
              {process.env.NEXT_PUBLIC_VERSION} -{" "}
              {process.env.NEXT_PUBLIC_BUILD_DATE}
            </p>
            <div className="my-4" />
          </SheetContent>
        </Sheet>

        <div className="hidden md:flex flex-row items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="text-xs text-muted-foreground">
                {process.env.NEXT_PUBLIC_VERSION}
              </TooltipTrigger>
              <TooltipContent>
                {process.env.NEXT_PUBLIC_BUILD_DATE}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <ModeToggle />
        </div>
      </nav>
    </div>
  );
}
