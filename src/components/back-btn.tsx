"use client";
import React, { ReactNode } from "react";
import { Button } from "./ui/button";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = ({ children, href }: { children: ReactNode; href?: string }) => {
  const router = useRouter();
  return (
    <Button
      variant="link"
      className="flex h-full items-center gap-2 p-0 text-ring"
      onClick={() => href ? router.push(href) : router.back()}
    >
      <MoveLeft className="size-4" />
      {children}
    </Button>
  );
};

export default BackButton;
