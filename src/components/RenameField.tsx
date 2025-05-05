
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RenameFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const RenameField = ({ value, onChange }: RenameFieldProps) => {
  return (
    <div className="w-full mb-6">
      <Label htmlFor="rename-field" className="text-lg font-medium mb-2 block">
        نام فایل‌های آپلود شده
      </Label>
      <Input
        id="rename-field"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="نام دلخواه برای فایل‌ها را وارد کنید"
        className="text-right"
      />
    </div>
  );
};

export default RenameField;
