import { DropdownMenuItem } from "@/_components/ui/dropdown-menu";
import { handleSignOut } from "../actions/handle-logout";
import { LogOutIcon } from "lucide-react";

export default function SignOut() {
  return (
    <form action={handleSignOut}>
      <DropdownMenuItem>
        <button className="cursor-pointer flex items-center gap-2 rounded-md p-2 text-sm text-red-500 hover:bg-red-500/10 focus:outline-none focus:ring-2 focus:ring-red-500/50">
          <LogOutIcon className="text-red-500 hover:bg-red-500/10 focus:outline-none focus:ring-2 focus:ring-red-500/50" />
          Log out
        </button>
      </DropdownMenuItem>
    </form>
  );
}
