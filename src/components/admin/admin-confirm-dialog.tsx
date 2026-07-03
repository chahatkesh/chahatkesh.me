"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "~/components/ui";

interface AdminConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void | Promise<void>;
  confirmDisabled?: boolean;
  loading?: boolean;
  destructive?: boolean;
}

export function AdminConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  onConfirm,
  confirmDisabled = false,
  loading = false,
  destructive = true,
}: AdminConfirmDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-[1px] data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-background p-5 shadow-2xl data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          <Dialog.Title className="text-base font-semibold text-foreground">
            {title}
          </Dialog.Title>

          {description && (
            <Dialog.Description className="mt-2 text-sm text-muted-foreground">
              {description}
            </Dialog.Description>
          )}

          <div className="mt-5 flex justify-end gap-2">
            <Dialog.Close asChild>
              <Button type="button" variant="outline" disabled={loading}>
                {cancelLabel}
              </Button>
            </Dialog.Close>
            <Button
              type="button"
              variant={destructive ? "destructive" : "default"}
              onClick={() => {
                void onConfirm();
              }}
              disabled={confirmDisabled || loading}
            >
              {loading ? "Deleting..." : confirmLabel}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
