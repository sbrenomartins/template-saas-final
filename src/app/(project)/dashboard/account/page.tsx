"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/_components/ui/card";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";
import { Button } from "@/_components/ui/button";
import { Badge } from "@/_components/ui/badge";
import { User, Mail, CreditCard, CheckCircle, ArrowLeft } from "lucide-react";
import { Bounce, toast } from "react-toastify";
import Link from "next/link";

export default function AccountPage() {
  const router = useRouter();

  // Mock user data - in a real app, this would come from your auth provider
  const [userData, setUserData] = useState({
    name: "Jane Smith",
    email: "jane.smith@example.com",
    status: "active",
    subscriptionId: "sub_1234567890",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, you would send this data to your API
    try {
      // Update local state with form data
      setUserData(formData);
      // setIsEditing(false);

      toast.info("Account updated successfully.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        className: "w-[500px]",
      });
    } catch (error: unknown) {
      console.error(error);
      toast.error("There was a problem updating your account.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        className: "w-[500px]",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "suspended":
        return <Badge className="bg-red-500">Suspended</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <Link href="/dashboard">
            <ArrowLeft className="h-8 w-8" />
          </Link>
          My Account
        </h1>

        <Card>
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>
              View and manage your account information
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="name" className="flex items-center gap-1">
                      <User className="h-4 w-4" /> Name
                    </Label>
                    {!isEditing && (
                      <span className="text-sm font-medium">
                        {userData.name}
                      </span>
                    )}
                  </div>
                  {isEditing && (
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                  )}
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email" className="flex items-center gap-1">
                      <Mail className="h-4 w-4" /> Email
                    </Label>
                    {!isEditing && (
                      <span className="text-sm font-medium">
                        {userData.email}
                      </span>
                    )}
                  </div>
                  {isEditing && (
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  )}
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    {!isEditing && (
                      <Label
                        htmlFor="status"
                        className="flex items-center gap-1"
                      >
                        <CheckCircle className="h-4 w-4" /> Status
                      </Label>
                    )}
                    {!isEditing && getStatusBadge(userData.status)}
                  </div>
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    {!isEditing && (
                      <Label
                        htmlFor="subscriptionId"
                        className="flex items-center gap-1"
                      >
                        <CreditCard className="h-4 w-4" /> Subscription ID
                      </Label>
                    )}
                    {!isEditing && (
                      <span className="text-sm font-medium font-mono">
                        {userData.subscriptionId}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex mt-10 gap-2">
              {isEditing ? (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData(userData);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </>
              ) : (
                <>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete your account? This action cannot be undone.",
                        )
                      ) {
                        // Mock account deletion

                        toast.info(
                          "Your account has been successfully deleted.",
                          {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                            transition: Bounce,
                            className: "w-[500px]",
                          },
                        );
                        // In a real app, you would redirect to a logout page or home page
                        setTimeout(() => {
                          router.push("/");
                        }, 2000);
                      }
                    }}
                  >
                    Delete My Account
                  </Button>
                  <Button onClick={() => setIsEditing(true)} variant="outline">
                    Editar
                  </Button>
                </>
              )}
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
