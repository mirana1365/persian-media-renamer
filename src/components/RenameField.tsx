
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface RenameFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const RenameField = ({ value, onChange }: RenameFieldProps) => {
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    
    if (newValue.trim() && newValue !== value) {
      toast({
        title: "نام فایل تغییر کرد",
        description: `نام جدید: "${newValue}"`,
      });
    }
  };

  const handleClear = () => {
    if (value) {
      onChange("");
      toast({
        title: "نام فایل پاک شد",
        description: "فایل‌ها با نام اصلی ذخیره خواهند شد.",
      });
    }
  };

  return (
    <div className="w-full mb-6">
      <Label htmlFor="rename-field" className="text-lg font-medium mb-2 block">
        نام فایل‌های آپلود شده
      </Label>
      <div className="flex gap-2">
        <Input
          id="rename-field"
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="نام دلخواه برای فایل‌ها را وارد کنید"
          className="text-right flex-1"
        />
        {value && (
          <button
            onClick={handleClear}
            className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 border rounded"
            title="پاک کردن نام"
          >
            پاک
          </button>
        )}
      </div>
    </div>
  );
};

export default RenameField;
