import { useId } from "react";
import { useFormContext, Controller } from "react-hook-form";
import * as RadixSwitch from "@radix-ui/react-switch";
import * as Label from "@radix-ui/react-label";

export interface Switch {
  type: "switch";
  name: string;
  label: string;
  hint: string;
}

export function SwitchView({ name, label, hint }: Switch) {
  const id = useId();
  const { control } = useFormContext();
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 px-5 py-4">
      <div>
        <Label.Root
          htmlFor={id}
          className="text-sm font-semibold text-gray-900"
        >
          {label}
        </Label.Root>
        <p className="mt-0.5 text-xs font-medium text-gray-400">{hint}</p>
      </div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <RadixSwitch.Root
            id={id}
            checked={field.value}
            onCheckedChange={field.onChange}
            className="relative ml-6 inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:outline-none data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-gray-200"
          >
            <RadixSwitch.Thumb className="inline-block size-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-1" />
          </RadixSwitch.Root>
        )}
      />
    </div>
  );
}
