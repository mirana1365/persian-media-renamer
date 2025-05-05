
import React from "react";
import { FileImage, FileVideo } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilePreviewProps {
  files: File[];
  customName: string;
}

const FilePreview = ({ files, customName }: FilePreviewProps) => {
  if (files.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium mb-4">پیش‌نمایش فایل‌ها</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {files.map((file, index) => {
          const isImage = file.type.startsWith('image/');
          const isVideo = file.type.startsWith('video/');
          const fileUrl = URL.createObjectURL(file);
          
          // Generate a preview name
          const fileExtension = file.name.split('.').pop();
          const newFileName = customName 
            ? `${customName}${files.length > 1 ? ` ${index + 1}` : ''}.${fileExtension}`
            : file.name;
          
          return (
            <div 
              key={`${file.name}-${index}`}
              className="border rounded-lg overflow-hidden bg-background"
            >
              <div className="relative aspect-square flex items-center justify-center bg-muted">
                {isImage && (
                  <img 
                    src={fileUrl} 
                    alt={file.name}
                    className="object-cover h-full w-full"
                    onLoad={() => URL.revokeObjectURL(fileUrl)}
                  />
                )}
                
                {isVideo && (
                  <video 
                    src={fileUrl}
                    className="object-cover h-full w-full"
                    controls
                    onLoadedMetadata={() => URL.revokeObjectURL(fileUrl)}
                  />
                )}
                
                {!isImage && !isVideo && (
                  <div className="flex flex-col items-center justify-center p-4">
                    {file.type.startsWith('image/') ? (
                      <FileImage className="h-12 w-12 text-muted-foreground" />
                    ) : (
                      <FileVideo className="h-12 w-12 text-muted-foreground" />
                    )}
                  </div>
                )}
              </div>
              
              <div className="p-3">
                <p 
                  className={cn(
                    "text-sm truncate", 
                    customName ? "text-primary font-medium" : "text-muted-foreground"
                  )}
                  title={newFileName}
                >
                  {newFileName}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilePreview;
