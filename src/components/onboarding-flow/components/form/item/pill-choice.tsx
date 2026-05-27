import { useId } from "react";
import { useFormContext, Controller } from "react-hook-form";
import * as RadioGroup from "@radix-ui/react-radio-group";
import * as Label from "@radix-ui/react-label";

export interface PillChoice {
  type: "pillChoice";
  name: string;
  label: string;
  options: {
    label: string;
    value: string;
  }[];
}

export function PillChoiceView({ name, label, options }: PillChoice) {
  const id = useId();
  const { control } = useFormContext();
  return (
    <div>
      <Label.Root
        id={id}
        className="mb-3 block text-sm font-semibold text-gray-700"
      >
        {label}
      </Label.Root>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <RadioGroup.Root
            aria-labelledby={id}
            value={field.value}
            onValueChange={field.onChange}
            className="flex flex-wrap gap-2"
          >
            {options.map((option) => (
              <RadioGroup.Item
                key={option.value}
                value={option.value}
                className="cursor-pointer rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition-all duration-150 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:outline-none data-[state=checked]:border-emerald-400 data-[state=checked]:bg-emerald-50 data-[state=checked]:text-emerald-700"
              >
                {option.label}
              </RadioGroup.Item>
            ))}
          </RadioGroup.Root>
        )}
      />
    </div>
  );
}
