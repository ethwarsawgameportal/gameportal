"use client";

import React from "react";
import { useUser } from "@civic/auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, CheckCircle } from "lucide-react";

interface ProfileProps {
  variant?: "compact" | "full";
  className?: string;
}

export const Profile: React.FC<ProfileProps> = ({
  variant = "full",
  className = "",
}) => {
  const userContext = useUser();
  const { user } = userContext;

  // Don't render if user is not authenticated
  if (!user) {
    return null;
  }

  if (variant === "compact") {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-900 dark:text-white">
              {user.email || user.name || "User"}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Identity Verified
            </span>
          </div>
        </div>
        <Badge
          variant="secondary"
          className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
        >
          <CheckCircle className="w-3 h-3 mr-1" />
          Verified
        </Badge>
      </div>
    );
  }

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2">
          <User className="w-5 h-5" />
          <span>Profile</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* User Info */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Email
            </span>
            <span className="text-sm text-slate-900 dark:text-white">
              {user.email || "Not provided"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Name
            </span>
            <span className="text-sm text-slate-900 dark:text-white">
              {user.name || "Not provided"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Status
            </span>
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
            >
              <CheckCircle className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          </div>
        </div>

        {/* Identity Information */}
        <div className="border-t pt-4 space-y-3">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="font-medium text-slate-900 dark:text-white">
              Identity Information
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Provider
              </span>
              <span className="text-sm text-slate-900 dark:text-white">
                Civic Auth
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Verification
              </span>
              <Badge variant="outline" className="text-xs">
                Identity Verified
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
