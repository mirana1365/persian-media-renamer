
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, register } = useAuth();
  
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginData.email || !loginData.password) {
      toast({
        title: "خطا",
        description: "لطفاً همه فیلدها را پر کنید",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await login(loginData.email, loginData.password);
      toast({
        title: "ورود موفق",
        description: "با موفقیت وارد حساب کاربری خود شدید."
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "خطا در ورود",
        description: error instanceof Error ? error.message : "مشکلی در ورود به سیستم پیش آمد",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registerData.username || !registerData.email || !registerData.password || !registerData.confirmPassword) {
      toast({
        title: "خطا",
        description: "لطفاً همه فیلدها را پر کنید",
        variant: "destructive"
      });
      return;
    }
    
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "خطا",
        description: "رمز عبور و تکرار آن مطابقت ندارند",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await register(registerData.username, registerData.email, registerData.password);
      toast({
        title: "ثبت نام موفق",
        description: "حساب کاربری شما با موفقیت ایجاد شد."
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "خطا در ثبت نام",
        description: error instanceof Error ? error.message : "مشکلی در ایجاد حساب کاربری پیش آمد",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-right">
          <CardTitle className="text-2xl font-bold">حساب کاربری</CardTitle>
          <CardDescription>برای استفاده از امکانات سایت وارد شوید یا ثبت‌نام کنید</CardDescription>
        </CardHeader>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="login">ورود</TabsTrigger>
            <TabsTrigger value="register">ثبت‌نام</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-right">
                  <Label htmlFor="login-email">ایمیل</Label>
                  <Input 
                    id="login-email" 
                    name="email"
                    type="email" 
                    value={loginData.email}
                    onChange={handleLoginChange}
                    className="text-right"
                    required
                  />
                </div>
                <div className="space-y-2 text-right">
                  <Label htmlFor="login-password">رمز عبور</Label>
                  <Input 
                    id="login-password" 
                    name="password"
                    type="password" 
                    value={loginData.password}
                    onChange={handleLoginChange}
                    className="text-right"
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "در حال ورود..." : "ورود"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleRegister}>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-right">
                  <Label htmlFor="register-username">نام کاربری</Label>
                  <Input 
                    id="register-username" 
                    name="username"
                    type="text" 
                    value={registerData.username}
                    onChange={handleRegisterChange}
                    className="text-right"
                    required
                  />
                </div>
                <div className="space-y-2 text-right">
                  <Label htmlFor="register-email">ایمیل</Label>
                  <Input 
                    id="register-email" 
                    name="email"
                    type="email" 
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    className="text-right"
                    required
                  />
                </div>
                <div className="space-y-2 text-right">
                  <Label htmlFor="register-password">رمز عبور</Label>
                  <Input 
                    id="register-password" 
                    name="password"
                    type="password" 
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    className="text-right"
                    required
                  />
                </div>
                <div className="space-y-2 text-right">
                  <Label htmlFor="register-confirm-password">تکرار رمز عبور</Label>
                  <Input 
                    id="register-confirm-password" 
                    name="confirmPassword"
                    type="password" 
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    className="text-right"
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "در حال ثبت‌نام..." : "ثبت‌نام"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Login;
