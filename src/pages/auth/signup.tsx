import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React from "react";
import { SocialSignIn } from "./component/social";
import { ArrowLeftIcon } from "lucide-react";
import { Password } from "./component/password";
import { useSignUp } from "@/controllers/authController";
import { Spinner } from "@/components/ui/spinner";
import { PhoneInput } from "@/components/common/phone-input";
import { SeoWrapper } from "@/components/common/seo-wrapper";

export const SignUpPage = () => {
  const { fnSignUp, isPending } = useSignUp();
  const [isPhoneValid, setIsPhoneValid] = React.useState(false);
  return (
    <>
      <SeoWrapper title="Sign up" />
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-lg flex-col gap-6">
          <div className={cn("flex flex-col gap-6")}>
            <Card>
              <CardHeader className="flex gap-2 items-center justify-center">
                <Link to="/">
                  <Button variant="outline" size="icon">
                    <ArrowLeftIcon className="h-4 w-4" />
                  </Button>
                </Link>
                <div className="text-center">
                  <CardTitle className="text-xl">Welcome</CardTitle>
                  <CardDescription>Sign up to your account</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={fnSignUp}>
                  <input type="hidden" name="register_by" value="phone" />
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="name">Full Name</FieldLabel>
                      <Input
                        className="h-10 "
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Full Name"
                        required
                      />
                    </Field>
                    <PhoneInput
                      id="email_or_phone"
                      name="email_or_phone"
                      label="Phone"
                      placeholder="01XXXXXXXXX or +881XXXXXXXXX"
                      onValidationChange={(isValid) => setIsPhoneValid(isValid)}
                    />
                    <Password placeholder="Enter your password" />
                    <Field>
                      <Button
                        className={cn(
                          isPending ? "opacity-50 cursor-not-allowed" : ""
                        )}
                        type="submit"
                        size="lg"
                        disabled={isPending || !isPhoneValid}>
                        {isPending ? (
                          <>
                            <Spinner />
                            Processing...
                          </>
                        ) : (
                          "Sign up"
                        )}
                      </Button>
                      <FieldDescription className="text-center">
                        Already have an account?
                        <Link to="/signin" className="text-primary ml-1   ">
                          Sign in
                        </Link>
                      </FieldDescription>
                    </Field>
                    <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                      Or continue with
                    </FieldSeparator>
                    <SocialSignIn />
                  </FieldGroup>
                </form>
              </CardContent>
            </Card>
            <FieldDescription className="px-6 text-center">
              By clicking continue, you agree to our{" "}
              <Link to="/policy/terms-condition">Terms & Condition</Link> and{" "}
              <Link to="/policy/privacy-policy">Privacy Policy</Link>.
            </FieldDescription>
          </div>
        </div>
      </div>
    </>
  );
};
