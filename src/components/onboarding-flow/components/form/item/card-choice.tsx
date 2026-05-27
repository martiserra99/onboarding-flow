import { useId } from "react";
import { useFormContext, Controller } from "react-hook-form";
import * as RadioGroup from "@radix-ui/react-radio-group";
import * as Label from "@radix-ui/react-label";

export interface CardChoice {
  type: "cardChoice";
  name: string;
  label: string;
  options: {
    icon?: React.ReactNode;
    label: string;
    value: string;
  }[];
}

export function CardChoiceView({ name, label, options }: CardChoice) {
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
            className="flex flex-wrap gap-3"
          >
            {options.map((option) => (
              <RadioGroup.Item
                key={option.value}
                value={option.value}
                className="group flex min-w-32 flex-1 cursor-pointer flex-col items-center gap-3 rounded-xl border border-gray-200 px-4 py-6 text-sm font-medium text-gray-600 transition-all duration-150 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:outline-none data-[state=checked]:border-emerald-400 data-[state=checked]:bg-emerald-50 data-[state=checked]:text-emerald-700"
              >
                {option.icon && (
                  <span className="text-gray-400 transition-colors group-data-[state=checked]:text-emerald-500">
                    {option.icon}
                  </span>
                )}
                <span className="text-center leading-tight">
                  {option.label}
                </span>
              </RadioGroup.Item>
            ))}
          </RadioGroup.Root>
        )}
      />
    </div>
  );
}
