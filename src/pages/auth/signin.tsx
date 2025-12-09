import React from "react";
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
  FieldSeparator,
} from "@/components/ui/field";
import { SocialSignIn } from "./component/social";
import { ArrowLeftIcon } from "lucide-react";
import { Password } from "./component/password";
import { useSignIn } from "@/controllers/authController";
import { Spinner } from "@/components/ui/spinner";
import { PhoneInput } from "@/components/common/phone-input";
import { SeoWrapper } from "@/components/common/seo-wrapper";

export const SignInPage = () => {
  const { fnSignIn, isPending } = useSignIn();
  const [isPhoneValid, setIsPhoneValid] = React.useState(false);
  return (
    <>
      <SeoWrapper title="Sign in" />
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center">
        <div className="flex w-full max-w-lg flex-col gap-6">
          <div className={cn("flex flex-col gap-4 md:gap-6")}>
            <Card className="p-4">
              <CardHeader className="flex gap-2 items-center justify-center">
                <Link to="/">
                  <Button variant="outline" size="icon">
                    <ArrowLeftIcon className="h-4 w-4" />
                  </Button>
                </Link>
                <div className="text-center">
                  <CardTitle className="text-xl">Welcome back</CardTitle>
                  <CardDescription>Sign in to your account</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="px-4 md:px-6">
                <form onSubmit={fnSignIn}>
                  <input type="hidden" name="user_type" value="customer" />
                  <FieldGroup>
                    <PhoneInput
                      id="email"
                      name="email"
                      label="Phone"
                      placeholder="01XXXXXXXXX"
                      onValidationChange={(isValid) => setIsPhoneValid(isValid)}
                    />

                    <Password
                      placeholder="Enter your password"
                      forgotPassword={true}
                    />

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
                          "Sign in"
                        )}
                      </Button>
                      <FieldDescription className="text-center">
                        Don&apos;t have an account?
                        <Link to="/signup" className="text-primary ml-1   ">
                          Sign up
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
