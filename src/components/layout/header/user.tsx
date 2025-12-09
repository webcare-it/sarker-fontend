import {
  Heart,
  LayoutDashboard,
  List,
  LogIn,
  LogOut,
  Settings,
  ShoppingBag,
  User,
  UserRound,
} from "lucide-react";
import { Button } from "../../ui/button";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { DropdownMenu } from "../../ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { useGetUserQuery } from "@/api/queries/useUser";
import { getGuestUserId, getUUID, isAuthenticated } from "@/helper";
import type { UserType } from "@/type";
import { useSignOutMutation } from "@/api/mutations/useAuth";
import { useEffect } from "react";

interface Props {
  variant?: "default" | "mobile";
  children?: React.ReactNode;
}

export const UserProfile = ({ variant = "default", children }: Props) => {
  const { data } = useGetUserQuery();
  const { mutate, isPending } = useSignOutMutation();

  useEffect(() => {
    if (!getGuestUserId() && !isAuthenticated()) {
      const guestUserId = getUUID();
      localStorage.setItem("guest_user_id", guestUserId);
    }
  }, []);

  const Default = () => {
    return (
      <Button variant="ghost" size="icon-lg" className="focus:outline-none">
        {isAuthenticated() ? (
          <Avatar>
            <AvatarImage
              src={data ? (data as UserType)?.avatar || undefined : undefined}
            />
            <AvatarFallback>
              {(data as UserType)?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        ) : (
          <UserRound className="h-6 w-6" />
        )}
      </Button>
    );
  };

  const Mobile = () => {
    return <>{children && children}</>;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {variant === "default" ? <Default /> : <Mobile />}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuItem>
          <User className="h-6 w-6" /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LayoutDashboard className="h-6 w-6" /> Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Heart className="h-6 w-6" /> Wishlist
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ShoppingBag className="h-6 w-6" /> Cart
        </DropdownMenuItem>
        <DropdownMenuItem>
          <List className="h-6 w-6" /> Orders
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="h-6 w-6" /> Settings
        </DropdownMenuItem>
        {!isAuthenticated() ? (
          <DropdownMenuItem>
            <Link to="/signin" className="flex items-center gap-2">
              <LogIn className="h-6 w-6 " />
              Sign In
            </Link>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onClick={() => mutate()}
            disabled={isPending}
            variant="destructive">
            <LogOut className="h-6 w-6 " />
            Sign Out
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
