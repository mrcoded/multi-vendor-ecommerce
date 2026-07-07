"use client";

import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

function ArrayItemsInput({
  setItems,
  items,
  itemTitle,
}: {
  setItems: React.Dispatch<React.SetStateAction<string[]>>;
  items: string[];
  itemTitle: string;
}) {
  const [item, setItem] = useState("");
  const [showTagForm, setShowTagForm] = useState(false);

  const addItems = () => {
    if (!item) return;
    setItems([...items, item]);
    setItem("");
  };

  const removeItems = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  return (
    <div className="sm:col-span-2">
      {showTagForm ? (
        <div className="flex items-center gap-2">
          <Input
            value={item}
            type="text"
            id={itemTitle}
            onChange={(e) => setItem(e.target.value)}
            placeholder={`Create a ${itemTitle}...`}
            className="flex-1"
          />
          <Button type="button" variant="accent" size="sm" onClick={addItems}>
            <Plus className="size-4" />
            Add
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="icon-sm"
            onClick={() => setShowTagForm(false)}
          >
            <X className="size-4" />
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setShowTagForm(true)}
        >
          <Plus className="size-4" />
          Add {itemTitle}
        </Button>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {items.length === 0 && (
          <p className="text-muted-foreground">No {itemTitle}</p>
        )}
        {items?.map((tag, index) => (
          <Badge
            key={index}
            variant="default"
            className="cursor-pointer gap-1 px-3 py-1.5"
            onClick={() => removeItems(index)}
          >
            {tag}
            <X className="size-3" />
          </Badge>
        ))}
      </div>
    </div>
  );
}

export default ArrayItemsInput;
