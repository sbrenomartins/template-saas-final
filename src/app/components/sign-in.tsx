import { Button } from "@/_components/ui/button";
import { handleSignIn } from "@/app/actions/handle-login";
import { ArrowRight } from "lucide-react";

export default function SignIn() {
  return (
    <form action={handleSignIn}>
      <Button
        className="w-full flex items-center justify-center gap-2"
        size="lg"
      >
        <ArrowRight className="h-5 w-5" />
        <span>Continue with Google</span>
      </Button>
    </form>
  );
}
