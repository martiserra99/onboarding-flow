import type { FieldValues, DefaultValues, Resolver } from "react-hook-form";
import type { MotionProps } from "motion/react";
import type { OnNext, OnBack } from "@formity/react";
import type { FormStatus } from "../../types/status";

import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";
import { AnimatePresence, motion } from "motion/react";

import {
  useMemo,
  useState,
  useEffect,
  useCallback,
  useEffectEvent,
} from "react";

import { Button } from "@/src/components/ui/button";

import { ItemView, type Item } from "./item";

interface FormProps<T extends FieldValues> {
  id: string;
  defaultValues: DefaultValues<T>;
  resolver: Resolver<T>;
  eyebrow: string;
  heading: string;
  message: string;
  content: Item[];
  buttons: {
    back: string | null;
    next: string;
  };
  onBack: OnBack<T>;
  onNext: OnNext<T>;
  status: FormStatus;
  onStatusChange: (status: FormStatus) => void;
}

export function Form<T extends FieldValues>({
  id,
  onBack,
  onNext,
  status,
  onStatusChange,
  ...props
}: FormProps<T>) {
  const [fields, setFields] = useState<T>();

  const move = useEffectEvent((move: FormStatus["move"]) => {
    if (move === "next") return onNext(fields!);
    if (move === "back") return onBack(fields!);
  });

  useEffect(() => move(status.move), [status.move]);

  const handleBack = useCallback<OnBack<T>>(
    (fields) => {
      onStatusChange({ type: "form", move: "back", submitting: false });
      setFields(fields);
    },
    [onStatusChange, setFields],
  );

  const handleNext = useCallback<OnNext<T>>(
    (fields) => {
      onStatusChange({ type: "form", move: "next", submitting: false });
      setFields(fields);
    },
    [onStatusChange, setFields],
  );

  const animate = useMemo(
    () => ({ x: 0, opacity: 1, transition: { delay: 0.25, duration: 0.25 } }),
    [],
  );

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={id}
        inert={Boolean(status.move)}
        animate={animate}
        onAnimationComplete={(definition) => {
          if (definition === animate) {
            onStatusChange({ type: "form", move: false, submitting: false });
          }
        }}
        {...motionProps(status)}
        className="h-full"
      >
        <View
          onBack={handleBack}
          onNext={handleNext}
          status={status}
          {...props}
        />
      </motion.div>
    </AnimatePresence>
  );
}

function View<T extends FieldValues>({
  defaultValues,
  resolver,
  eyebrow,
  heading,
  message,
  content,
  buttons,
  onBack,
  onNext,
  status,
}: Omit<FormProps<T>, "id" | "onStatusChange">) {
  const form = useForm({ defaultValues, resolver, mode: "onChange" });
  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={form.handleSubmit(onNext)}
      className="@container flex h-full flex-1 flex-col overflow-hidden"
    >
      <FormProvider {...form}>
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-2xl px-6 pt-8 pb-6 sm:px-10 sm:pt-12 sm:pb-8">
            <p className="mb-3 text-xs font-semibold tracking-widest text-gray-400 uppercase">
              {eyebrow}
            </p>
            <h2 className="mb-2 text-2xl leading-tight font-bold text-gray-950">
              {heading}
            </h2>
            <p className="mb-10 text-sm font-medium text-gray-400">{message}</p>
            <div className="flex flex-col gap-10">
              {content.map((item, i) => (
                <ItemView key={i} {...item} />
              ))}
            </div>
          </div>
        </div>
        <div className="shrink-0 border-t border-gray-100">
          <div className="mx-auto flex max-w-2xl items-center px-6 py-4 sm:px-10 sm:py-5">
            {buttons.back && (
              <button
                type="button"
                onClick={() => onBack(form.getValues())}
                disabled={status.submitting}
                className="inline-flex items-center gap-2 rounded-sm text-sm font-medium text-gray-400 transition-colors hover:text-gray-700 focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:text-gray-400"
              >
                <ArrowLeftIcon className="size-3.5" /> {buttons.back}
              </button>
            )}
            <Button
              disabled={!form.formState.isValid || status.submitting}
              className="ml-auto"
            >
              {status.submitting ? "Submitting..." : buttons.next}
              <ArrowRightIcon className="size-3.5" />
            </Button>
          </div>
        </div>
      </FormProvider>
    </form>
  );
}

export function motionProps(status: FormStatus): MotionProps {
  if (status.move === "next") {
    return {
      initial: { x: 25, opacity: 0 },
      exit: {
        x: -25,
        opacity: 0,
        transition: { delay: 0, duration: 0.25, ease: "easeInOut" },
      },
    };
  }
  if (status.move === "back") {
    return {
      initial: { x: -25, opacity: 0 },
      exit: {
        x: 25,
        opacity: 0,
        transition: { delay: 0, duration: 0.25, ease: "easeInOut" },
      },
    };
  }
  return {};
}
