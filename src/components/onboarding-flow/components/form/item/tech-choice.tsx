import { useId } from "react";
import { useFormContext, Controller } from "react-hook-form";
import * as RadioGroup from "@radix-ui/react-radio-group";
import * as Label from "@radix-ui/react-label";

export interface TechChoice {
  type: "techChoice";
  name: string;
  label: string;
  options: {
    icon: React.ReactNode;
    label: string;
    hint: string;
    value: string;
  }[];
}

export function TechChoiceView({ name, label, options }: TechChoice) {
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
            className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            {options.map((option) => (
              <RadioGroup.Item
                key={option.value}
                value={option.value}
                className="group flex cursor-pointer items-center gap-4 rounded-xl border border-gray-200 px-5 py-4 text-left transition-all duration-150 hover:border-gray-300 hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:outline-none data-[state=checked]:border-emerald-400 data-[state=checked]:bg-emerald-50"
              >
                {option.icon}
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 group-data-[state=checked]:text-emerald-700">
                    {option.label}
                  </p>
                  <p className="mt-0.5 text-xs leading-snug font-medium text-gray-400 group-data-[state=checked]:text-emerald-600/80">
                    {option.hint}
                  </p>
                </div>
              </RadioGroup.Item>
            ))}
          </RadioGroup.Root>
        )}
      />
    </div>
  );
}
