
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileImage, FileVideo } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
}

const FileUploader = ({ onFilesSelected }: FileUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isError, setIsError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files);
      const validFiles = validateFiles(files);
      if (validFiles.length > 0) {
        onFilesSelected(validFiles);
        setIsError(false);
      } else {
        setIsError(true);
      }
    } else {
      setIsError(true);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      const validFiles = validateFiles(files);
      if (validFiles.length > 0) {
        onFilesSelected(validFiles);
        setIsError(false);
      } else {
        setIsError(true);
      }
    } else {
      setIsError(true);
    }
  };

  const validateFiles = (files: File[]): File[] => {
    const validFiles = files.filter(file => {
      const fileType = file.type.split('/')[0];
      return fileType === 'image' || fileType === 'video';
    });
    
    if (validFiles.length !== files.length) {
      toast({
        title: "خطا در آپلود فایل",
        description: "فقط فایل‌های عکس و ویدئو پشتیبانی می‌شوند.",
        variant: "destructive",
      });
    }
    
    return validFiles;
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        isDragging ? "border-primary bg-primary/5" : isError ? "border-destructive" : "border-gray-300 hover:border-primary/50"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        multiple
        accept="image/*,video/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        required
      />
      
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Upload className="h-8 w-8 text-primary" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium">فایل‌ها را آپلود کنید</h3>
          <p className="text-sm text-muted-foreground">
            فایل‌های عکس و ویدئو را اینجا رها کنید یا روی دکمه کلیک کنید
          </p>
          {isError && (
            <p className="text-sm text-destructive font-medium">
              انتخاب حداقل یک فایل ضروری است
            </p>
          )}
        </div>
        
        <div className="flex gap-2 items-center">
          <FileImage className="h-5 w-5 text-primary" />
          <span className="text-sm">عکس</span>
          <span className="text-muted-foreground mx-2">|</span>
          <FileVideo className="h-5 w-5 text-primary" />
          <span className="text-sm">ویدئو</span>
        </div>
        
        <Button 
          onClick={handleButtonClick}
          className="mt-4"
          variant={isError ? "destructive" : "default"}
        >
          انتخاب فایل‌ها
        </Button>
      </div>
    </div>
  );
};

export default FileUploader;
