import { getConfig } from "@/helper";
import { useConfig } from "@/hooks/useConfig";
import { Phone, Mail, MapPin, Smartphone } from "lucide-react";

export const Contact = () => {
  const config = useConfig();
  const phone = getConfig(config, "contact_phone")?.value as string;
  const email = getConfig(config, "contact_phone")?.value as string;
  const address = getConfig(config, "contact_address")?.value as string;

  return (
    <div>
      <h4 className="text-muted-foreground font-bold text-lg mb-4">
        Get in Touch
      </h4>
      <ul className="space-y-3">
        <li className="flex items-start gap-2 text-sm">
          <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{phone}</span>
        </li>
        <li className="flex items-start gap-2 text-sm">
          <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{email}</span>
        </li>
        <li className="flex items-start gap-2 text-sm">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{address}</span>
        </li>
      </ul>

      <div className="mt-6">
        <h5 className="text-muted-foreground font-semibold mb-3 text-sm">
          Download Our App
        </h5>
        <div className="flex flex-col gap-2">
          <a
            href="#"
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded transition-colors">
            <Smartphone className="w-5 h-5" />
            <div className="text-left">
              <div className="text-xs text-gray-400">Download on</div>
              <div className="text-sm font-semibold text-muted-foreground">
                App Store
              </div>
            </div>
          </a>
          <a
            href="#"
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded transition-colors">
            <Smartphone className="w-5 h-5" />
            <div className="text-left">
              <div className="text-xs text-gray-400">Get it on</div>
              <div className="text-sm font-semibold text-muted-foreground">
                Google Play
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};
