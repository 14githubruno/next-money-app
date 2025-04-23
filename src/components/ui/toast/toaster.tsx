// Tremor Toaster [v0.0.0]

"use client";

import { useToast } from "@/hooks/toast/use-toast";

import { Toast, ToastProvider, ToastViewport } from "./toast";

const Toaster = () => {
  const { toasts } = useToast();

  return (
    <ToastProvider swipeDirection="right">
      {toasts.map(({ id, ...props }) => {
        return <Toast key={id} {...props} />;
      })}
      <ToastViewport className="left-1/2 -translate-x-1/2" />
    </ToastProvider>
  );
};

export { Toaster };
