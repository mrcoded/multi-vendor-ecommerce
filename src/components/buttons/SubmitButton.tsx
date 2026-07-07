import React from "react";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

function SubmitButton({
  isLoading = false,
  buttonTitle,
  loadingButtonTitle,
}: {
  isLoading: boolean;
  buttonTitle: string;
  loadingButtonTitle: string;
}) {
  return (
    <div className="sm:col-span-1">
      {isLoading ? (
        <Button disabled type="button" className="mt-4 w-full sm:w-auto">
          <Loader2 className="size-4 animate-spin" />
          {loadingButtonTitle}
        </Button>
      ) : (
        <Button type="submit" variant="accent" className="mt-4 w-full sm:mt-6 sm:w-auto">
          <Plus className="size-4" />
          <span>{buttonTitle}</span>
        </Button>
      )}
    </div>
  );
}

export default SubmitButton;
