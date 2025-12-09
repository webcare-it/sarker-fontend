import React from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { usePhoneValidation } from "@/hooks/usePhoneValidation";
import { cn } from "@/lib/utils";

interface Props {
  id: string;
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  onValidationChange?: (isValid: boolean, phone: string) => void;
}

export const PhoneInput = ({
  id,
  name,
  label = "Phone",
  placeholder = "01XXXXXXXXX",
  required = true,
  className,
  onValidationChange,
}: Props) => {
  const { phone, touched, handlePhoneChange, handleBlur, isValid, error } =
    usePhoneValidation();

  React.useEffect(() => {
    onValidationChange?.(isValid, phone);
  }, [isValid, phone, onValidationChange]);

  return (
    <Field>
      <FieldLabel htmlFor={id}>{label} *</FieldLabel>
      <div className="space-y-1">
        <Input
          id={id}
          name={name}
          value={phone}
          onChange={(e) => handlePhoneChange(e.target.value)}
          onBlur={handleBlur}
          className={cn(
            "h-10",
            touched && !isValid && "border-red-500 focus:border-red-500",
            touched && isValid && "border-green-500 focus:border-green-500",
            className
          )}
          type="text"
          placeholder={placeholder}
          required={required}
        />

        {touched && error && (
          <div className="text-sm text-red-500">{error}</div>
        )}

        {touched && isValid && (
          <div className="text-sm text-green-600">✓ Valid phone number</div>
        )}

        {!touched && (
          <div className="text-sm text-gray-500">
            Enter your mobile number (11 digits starting with 01)
          </div>
        )}
      </div>
    </Field>
  );
};
