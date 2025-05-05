
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import FileUploader from "@/components/FileUploader";
import FilePreview from "@/components/FilePreview";
import RenameField from "@/components/RenameField";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [customName, setCustomName] = useState("");
  const { toast } = useToast();
  const { user } = useAuth();

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

    if (!user) {
      toast({
        title: "خطا",
        description: "لطفاً ابتدا وارد حساب کاربری خود شوید.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    // در یک برنامه واقعی، اینجا فایل‌ها را به سرور آپلود می‌کنید
    // برای نمونه، فقط در localStorage ذخیره می‌کنیم
    
    // ابتدا لیست کاربران را دریافت می‌کنیم
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userIndex = users.findIndex((u: any) => u.id === user.id);
    
    if (userIndex !== -1) {
      // آپلودهای جدید را به لیست کاربر اضافه می‌کنیم
      const newUploads = selectedFiles.map(file => ({
        id: Date.now().toString() + Math.random().toString(36).substring(2, 15),
        fileName: customName || file.name,
        fileType: file.type,
        fileSize: file.size,
        uploadDate: new Date().toLocaleDateString("fa-IR")
      }));
      
      if (!users[userIndex].uploads) {
        users[userIndex].uploads = [];
      }
      
      users[userIndex].uploads = [...users[userIndex].uploads, ...newUploads];
      
      // لیست به‌روزرسانی شده را ذخیره می‌کنیم
      localStorage.setItem("users", JSON.stringify(users));
      
      toast({
        title: "فایل‌ها ذخیره شدند",
        description: customName 
          ? `فایل‌ها با نام "${customName}" ذخیره شدند.`
          : "فایل‌ها با نام اصلی ذخیره شدند.",
      });
      
      // پس از ذخیره، فرم را ریست می‌کنیم
      setSelectedFiles([]);
      setCustomName("");
    }
  };

  const handleReset = () => {
    setSelectedFiles([]);
    setCustomName("");
    
    toast({
      title: "بازنشانی شد",
      description: "همه فایل‌ها و نام سفارشی حذف شدند.",
    });
  };

  const showLoginPrompt = () => {
    toast({
      title: "ورود به حساب کاربری",
      description: "برای آپلود فایل، لطفاً ابتدا وارد حساب کاربری خود شوید.",
    });
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
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
          {user ? (
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
          ) : (
            <div className="bg-card p-8 rounded-lg shadow-sm border text-center">
              <h2 className="text-2xl font-bold mb-4">برای آپلود فایل وارد حساب کاربری خود شوید</h2>
              <p className="text-muted-foreground mb-6">
                برای استفاده از امکانات سایت و آپلود فایل‌ها، لطفاً ابتدا وارد حساب کاربری خود شوید یا ثبت‌نام کنید.
              </p>
              <Button onClick={showLoginPrompt} className="px-8">
                ورود / ثبت‌نام
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
