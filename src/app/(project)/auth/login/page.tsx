import SignIn from "@/app/components/sign-in";
import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/_components/ui/card";
import { cn } from "@/_lib/utils";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6")}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Sign in to continue to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SignIn />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
