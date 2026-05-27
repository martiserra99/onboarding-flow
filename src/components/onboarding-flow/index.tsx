"use client";

import type { OnReturn } from "@formity/react";
import type { Status, FormStatus } from "./types/status";

import { motion, AnimatePresence } from "motion/react";
import { useState, useCallback } from "react";
import { useFormity } from "@formity/react";

import { Done } from "./components/done";

import { flow, type Schema } from "./flow";

export function OnboardingFlow() {
  const [status, setStatus] = useState<Status>({
    type: "form",
    move: false,
    submitting: false,
  });

  const onReturn = useCallback<OnReturn<Schema>>(async (output) => {
    setStatus({ type: "form", move: false, submitting: true });

    // Show output in the console
    console.log(output);

    // Simulate a network request
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setStatus({ type: "done" });
  }, []);

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={status.type}
        className="h-full"
        initial={{ x: 25, opacity: 0 }}
        animate={{
          x: 0,
          opacity: 1,
          transition: { delay: 0.25, duration: 0.25 },
        }}
        exit={{
          x: -25,
          opacity: 0,
          transition: { delay: 0, duration: 0.25, ease: "easeInOut" },
        }}
      >
        <Stage status={status} onStatusChange={setStatus} onReturn={onReturn} />
      </motion.div>
    </AnimatePresence>
  );
}

interface StageProps {
  status: Status;
  onStatusChange: (status: Status) => void;
  onReturn: OnReturn<Schema>;
}

function Stage({ status, onStatusChange, onReturn }: StageProps) {
  switch (status.type) {
    case "form": {
      return (
        <Form
          status={status}
          onStatusChange={onStatusChange}
          onReturn={onReturn}
        />
      );
    }
    case "done": {
      return (
        <Done
          onStartOver={() => {
            onStatusChange({ type: "form", move: false, submitting: false });
          }}
        />
      );
    }
  }
}

interface FormProps {
  status: FormStatus;
  onStatusChange: (status: Status) => void;
  onReturn: OnReturn<Schema>;
}

function Form({ status, onStatusChange, onReturn }: FormProps) {
  const { progress, form } = useFormity({
    flow,
    params: { status, onStatusChange },
    onReturn,
  });
  return (
    <div className="flex h-full flex-col overflow-hidden bg-white">
      <header className="flex shrink-0 items-center justify-end px-6 pt-6 sm:px-8 sm:pt-8">
        <div className="flex items-center gap-2">
          {Array.from({ length: progress.numberSteps }).map((_, i) => {
            const prev = i + 1 < progress.currentStep;
            const curr = i + 1 === progress.currentStep;
            return (
              <motion.div
                key={i}
                className="h-2 rounded-full"
                animate={{
                  width: curr ? "1.25rem" : "0.5rem",
                  backgroundColor: curr || prev ? "#10b981" : "#e5e7eb",
                }}
                transition={{ duration: 0.3 }}
              />
            );
          })}
        </div>
      </header>
      <div className="flex-1 flex-col overflow-hidden">{form}</div>
    </div>
  );
}
