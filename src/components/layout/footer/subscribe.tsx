import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getConfig } from "@/helper";
import { useConfig } from "@/hooks/useConfig";

export const Subscribe = () => {
  const config = useConfig();
  const isShow = getConfig(config, "show_subscribe_form")?.value as string;

  return isShow ? (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="text-center md:text-left">
        <h3 className="text-muted-foreground text-xl font-bold mb-1">
          Subscribe to our Newsletter
        </h3>
        <p className="text-muted-foreground text-sm">
          Get exclusive deals, new arrivals & design inspiration
        </p>
      </div>
      <div className="flex w-full md:w-auto gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          className="min-w-[250px]"
        />
        <Button>Subscribe</Button>
      </div>
    </div>
  ) : null;
};
