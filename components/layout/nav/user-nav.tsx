
"use client";

import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { logout } from "@/lib/services/auth/logout";
import { useUserStore } from "@/lib/stores/user-store";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Settings } from "lucide-react";
import { AuthButtons } from "./auth-buttons";

export function UserNav() {
  const router = useRouter();
  const { toast } = useToast();
  const { currentUser } = useUserStore();

  const handleLogout = async () => {
    try {
      await logout();
      
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });

      // Redirect to home page
      router.push("/");
      
      // Force page refresh to clear all state
      window.location.reload();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to logout. Please try again.",
      });
    }
  };

  if (!currentUser) {
    return <AuthButtons />;
  }

  const accountLink = currentUser.role === 'seller' ? '/dashboard' : '/account';
  const accountText = currentUser.role === 'seller' ? 'Dashboard' : 'My Account';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {currentUser.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {currentUser.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push(accountLink)}>
            <Settings className="mr-2 h-4 w-4" />
            <span>{accountText}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
