
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import FileUploader from "@/components/FileUploader";
import FilePreview from "@/components/FilePreview";
import RenameField from "@/components/RenameField";

const Index = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [customName, setCustomName] = useState("");
  const { toast } = useToast();

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(prev => [...prev, ...files]);
    
    toast({
      title: "فایل‌ها انتخاب شدند",
      description: `${files.length} فایل با موفقیت انتخاب شد.`,
    });
  };

  const handleSaveFiles = () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "خطا",
        description: "لطفاً ابتدا فایل‌هایی را انتخاب کنید.",
        variant: "destructive",
      });
      return;
    }

    // In a real application, we would upload the files to a server here
    // and use the customName to rename them
    
    // For demonstration, we'll simulate a successful upload
    toast({
      title: "فایل‌ها ذخیره شدند",
      description: customName 
        ? `فایل‌ها با نام "${customName}" ذخیره شدند.`
        : "فایل‌ها با نام اصلی ذخیره شدند.",
    });
  };

  const handleReset = () => {
    setSelectedFiles([]);
    setCustomName("");
    
    toast({
      title: "بازنشانی شد",
      description: "همه فایل‌ها و نام سفارشی حذف شدند.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl py-8 px-4 sm:px-6">
        <div className="text-right mb-8">
          <h1 className="text-3xl font-bold text-primary">
            سامانه آپلود فایل
          </h1>
          <p className="text-muted-foreground mt-2">
            ویدئوها و تصاویر خود را آپلود کنید و آن‌ها را با نام دلخواه ذخیره کنید
          </p>
        </div>
        
        <div className="space-y-8">
          <div className="bg-card p-6 rounded-lg shadow-sm border">
            <RenameField 
              value={customName}
              onChange={setCustomName}
            />
            
            <FileUploader onFilesSelected={handleFilesSelected} />
            
            <FilePreview 
              files={selectedFiles}
              customName={customName}
            />
            
            {selectedFiles.length > 0 && (
              <div className="mt-8 flex gap-4 justify-end">
                <Button 
                  variant="outline" 
                  onClick={handleReset}
                >
                  حذف همه
                </Button>
                <Button onClick={handleSaveFiles}>
                  ذخیره فایل‌ها
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
