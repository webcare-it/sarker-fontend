import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupButton,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { EyeOff, Eye } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  placeholder?: string;
  forgotPassword?: boolean;
}

export const Password = ({ placeholder, forgotPassword = false }: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <Field>
      <div className="flex items-center">
        <FieldLabel htmlFor="password">Password *</FieldLabel>
        {forgotPassword && (
          <Link
            to="/forgot-password"
            className="ml-auto text-sm underline-offset-4 hover:underline">
            Forgot your password?
          </Link>
        )}
      </div>
      <InputGroup className="h-10">
        <InputGroupInput
          id="password"
          name="password"
          placeholder={placeholder || "Enter your password"}
          className="pl-3 h-full"
          type={showPassword ? "text" : "password"}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            className="rounded-full hover:bg-none"
            onClick={() => setShowPassword(!showPassword)}
            size="icon-xs">
            {showPassword ? <EyeOff /> : <Eye />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
};
