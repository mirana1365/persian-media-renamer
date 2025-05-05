
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";

interface Upload {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadDate: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, logout } = useAuth();
  const [uploads, setUploads] = useState<Upload[]>([]);
  
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    
    // در یک برنامه واقعی، اینجا از API برای دریافت لیست آپلودها استفاده می‌کنید
    // برای نمونه، از localStorage استفاده می‌کنیم
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const currentUser = users.find((u: any) => u.id === user.id);
    
    if (currentUser && currentUser.uploads) {
      setUploads(currentUser.uploads);
    }
  }, [user, navigate]);
  
  const handleLogout = () => {
    logout();
    toast({
      title: "خروج موفق",
      description: "با موفقیت از حساب کاربری خود خارج شدید."
    });
    navigate("/login");
  };
  
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + " KB";
    else return (bytes / 1048576).toFixed(2) + " MB";
  };
  
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Button variant="outline" onClick={() => navigate("/")}>
            بازگشت به صفحه اصلی
          </Button>
          <h1 className="text-3xl font-bold text-primary">پروفایل کاربری</h1>
        </div>
        
        <Card className="mb-8">
          <CardHeader className="text-right">
            <CardTitle>اطلاعات کاربر</CardTitle>
            <CardDescription>
              اطلاعات مربوط به حساب کاربری شما
            </CardDescription>
          </CardHeader>
          <CardContent className="text-right">
            <div className="space-y-2">
              <p><span className="font-semibold ml-2">نام کاربری:</span> {user?.username}</p>
              <p><span className="font-semibold ml-2">ایمیل:</span> {user?.email}</p>
              <Button variant="destructive" className="mt-4" onClick={handleLogout}>
                خروج از حساب کاربری
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="text-right">
            <CardTitle>فایل‌های آپلود شده</CardTitle>
            <CardDescription>
              لیست فایل‌هایی که تا کنون آپلود کرده‌اید
            </CardDescription>
          </CardHeader>
          <CardContent>
            {uploads.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">نام فایل</TableHead>
                    <TableHead className="text-right">نوع</TableHead>
                    <TableHead className="text-right">حجم</TableHead>
                    <TableHead className="text-right">تاریخ آپلود</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {uploads.map((upload) => (
                    <TableRow key={upload.id}>
                      <TableCell className="text-right font-medium">{upload.fileName}</TableCell>
                      <TableCell className="text-right">{upload.fileType}</TableCell>
                      <TableCell className="text-right">{formatFileSize(upload.fileSize)}</TableCell>
                      <TableCell className="text-right">{upload.uploadDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                هنوز هیچ فایلی آپلود نکرده‌اید.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
