import { getConfig } from "@/helper";
import { useConfig } from "@/hooks/useConfig";
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export const Social = () => {
  const config = useConfig();

  const url = window.location.origin;
  const showSocialLinks = getConfig(config, "show_social_links")?.value || url;
  const facebookLink = getConfig(config, "facebook_link")?.value || url;
  const twitterLink = getConfig(config, "twitter_link")?.value || url;
  const instagramLink = getConfig(config, "instagram_link")?.value || url;
  const youtubeLink = getConfig(config, "youtube_link")?.value || url;
  const linkedinLink = getConfig(config, "linkedin_link")?.value || url;

  return showSocialLinks ? (
    <div className="flex items-center gap-4">
      <span className="text-sm font-semibold text-white">Follow Us:</span>
      <div className="flex gap-3">
        <Link
          to={facebookLink as string}
          className="bg-muted hover:bg-primary p-2 rounded-full transition-colors">
          <Facebook className="w-5 h-5" />
        </Link>
        <Link
          to={twitterLink as string}
          className="bg-muted hover:bg-primary p-2 rounded-full transition-colors">
          <Twitter className="w-5 h-5" />
        </Link>
        <Link
          to={instagramLink as string}
          className="bg-muted hover:bg-primary p-2 rounded-full transition-colors">
          <Instagram className="w-5 h-5" />
        </Link>
        <Link
          to={youtubeLink as string}
          className="bg-muted hover:bg-primary p-2 rounded-full transition-colors">
          <Youtube className="w-5 h-5" />
        </Link>
        <Link
          to={linkedinLink as string}
          className="bg-muted hover:bg-primary p-2 rounded-full transition-colors">
          <Linkedin className="w-5 h-5" />
        </Link>
      </div>
    </div>
  ) : null;
};
