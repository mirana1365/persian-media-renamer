import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import FileUploader from "@/components/FileUploader";
import FilePreview from "@/components/FilePreview";
import RenameField from "@/components/RenameField";
import Navbar from "@/components/Navbar";
import { saveFile } from "@/utils/fileUtils";

const Index = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [customName, setCustomName] = useState("");
  const { toast } = useToast();
  const [uploads, setUploads] = useState<any[]>([]);

  // Load existing uploads from localStorage on component mount
  useEffect(() => {
    const storedUploads = localStorage.getItem("uploads");
    if (storedUploads) {
      setUploads(JSON.parse(storedUploads));
    }
  }, []);

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(prev => [...prev, ...files]);
    
    toast({
      title: "فایل‌ها انتخاب شدند",
      description: `${files.length} فایل با موفقیت انتخاب شد.`,
    });
  };

  const handleSaveFiles = async () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "خطا",
        description: "لطفاً ابتدا فایل‌هایی را انتخاب کنید.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Process each file and save them
      const newUploads = await Promise.all(selectedFiles.map(async (file, index) => {
        // Generate filename
        const fileExtension = file.name.split('.').pop();
        const fileName = customName 
          ? `${customName}${selectedFiles.length > 1 ? `_${index + 1}` : ''}.${fileExtension}`
          : file.name;
        
        // Save the file to the Upload folder at project root
        await saveFile(file, fileName);
        
        // Return metadata for storage
        return {
          id: Date.now().toString() + Math.random().toString(36).substring(2, 15),
          fileName: fileName,
          filePath: `./Upload/${fileName}`,
          fileType: file.type,
          fileSize: file.size,
          uploadDate: new Date().toLocaleDateString("fa-IR")
        };
      }));
      
      // Add to all uploads
      const allUploads = [...uploads, ...newUploads];
      setUploads(allUploads);
      
      // Store uploads in localStorage
      localStorage.setItem("uploads", JSON.stringify(allUploads));
      
      toast({
        title: "فایل‌ها ذخیره شدند",
        description: customName 
          ? `فایل‌ها با نام "${customName}" در پوشه ./Upload در سرور ذخیره شدند.`
          : "فایل‌ها با نام اصلی در پوشه ./Upload در سرور ذخیره شدند.",
      });
      
      // Reset form
      setSelectedFiles([]);
      setCustomName("");
    } catch (error) {
      console.error("Error saving files:", error);
      toast({
        title: "خطا در ذخیره فایل‌ها",
        description: "مشکلی در ذخیره‌سازی فایل‌ها رخ داده است.",
        variant: "destructive",
      });
    }
  };

  // Function to download file to user's system
  const downloadFile = (file: File, fileName: string) => {
    // Create a URL for the file
    const fileURL = URL.createObjectURL(file);
    
    // Create an anchor element and set its attributes
    const downloadLink = document.createElement('a');
    downloadLink.href = fileURL;
    downloadLink.download = fileName; // Set the file name
    
    // Append to body, click programmatically, then remove
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    // Clean up the URL object
    setTimeout(() => {
      URL.revokeObjectURL(fileURL);
    }, 100);
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
      <Navbar />
      <div className="container max-w-4xl py-8 px-4 sm:px-6">
        <div className="text-right mb-8">
          <h1 className="text-3xl font-bold text-primary">
            Transaction House
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
                <Button 
                  onClick={handleSaveFiles}
                  disabled={selectedFiles.length === 0}
                >
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
