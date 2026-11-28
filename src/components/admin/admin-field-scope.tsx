"use client";

import { useEffect } from "react";

const BODY_CLASS = "admin-fields";

/** Marks the document so portaled admin sheets share the single-border field style. */
export function AdminFieldScope() {
  useEffect(() => {
    document.body.classList.add(BODY_CLASS);
    return () => {
      document.body.classList.remove(BODY_CLASS);
    };
  }, []);

  return null;
}
