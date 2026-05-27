import { CheckIcon, ArrowRightIcon } from "lucide-react";

import { Button } from "@/src/components/ui/button";

interface DoneProps {
  onStartOver: () => void;
}

export function Done({ onStartOver }: DoneProps) {
  return (
    <div className="@container flex h-full flex-1 flex-col items-center justify-center px-8 py-12 text-center">
      <div className="mb-6 flex size-14 items-center justify-center rounded-full bg-emerald-500">
        <CheckIcon className="size-7 text-white" strokeWidth={2.5} />
      </div>
      <h1 className="mb-4 text-3xl font-bold text-gray-950 @3xl:text-4xl">
        Your path is ready.
      </h1>
      <p className="mb-8 max-w-sm text-base leading-normal font-medium text-gray-400">
        We&apos;ve built a personalised curriculum based on your goals and
        learning style. Time to start.
      </p>
      <Button variant="dark" onClick={onStartOver}>
        Start Over
        <ArrowRightIcon className="size-3.5" />
      </Button>
    </div>
  );
}
