import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, Trash2, Upload, Video } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const mockPhotos = [
  { id: 1, label: "Layered Gold Necklace", bg: "#F5E6C8" },
  { id: 2, label: "Crystal Drop Earrings", bg: "#C8E6F5" },
  { id: 3, label: "Bridal Kundan Set", bg: "#F5C8E6" },
  { id: 4, label: "Minimal Gold Band", bg: "#C8F5E0" },
  { id: 5, label: "Statement Bracelet", bg: "#E6C8F5" },
  { id: 6, label: "Pearl Choker Set", bg: "#F5D4C8" },
];

const mockVideos = [
  { id: 1, label: "Collection Reel 2024", bg: "#1a1a2e" },
  { id: 2, label: "Bridal Showcase", bg: "#16213e" },
  { id: 3, label: "Export Gallery Tour", bg: "#0f3460" },
];

const CARD = "bg-white rounded-lg shadow-md border border-gray-100";

export default function AdminMedia() {
  const [photos, setPhotos] = useState(mockPhotos);
  const [videos] = useState(mockVideos);
  const [isDragging, setIsDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    toast.success(`${files.length} file(s) uploaded successfully`);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const deletePhoto = (id: number) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
    toast.success("Photo removed");
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <p className="section-label mb-1">Assets</p>
        <h1
          className="font-serif text-3xl"
          style={{ color: "var(--gold)", fontWeight: 300 }}
        >
          Media Library
        </h1>
      </div>

      {/* Upload Zone */}
      <motion.div
        className={`${CARD} p-6`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h2 className="font-serif text-base font-medium text-gray-800 mb-3">
          Upload Files
        </h2>
        <div
          data-ocid="media.dropzone"
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onClick={() => fileRef.current?.click()}
          onKeyDown={(e) => e.key === "Enter" && fileRef.current?.click()}
          className="border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-all duration-200"
          style={{
            borderColor: isDragging ? "#C6A55C" : "#e5e7eb",
            backgroundColor: isDragging ? "#C6A55C08" : "#fafafa",
          }}
        >
          <Upload size={28} className="mx-auto mb-3 text-gray-400" />
          <p className="text-sm font-medium text-gray-700">
            Drag & drop files here or click to browse
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Supports JPG, PNG, WEBP, MP4 — Max 50MB per file
          </p>
          <Button
            data-ocid="media.upload_button"
            className="mt-4 text-xs"
            style={{ backgroundColor: "#C6A55C", color: "#fff" }}
            onClick={(e) => {
              e.stopPropagation();
              fileRef.current?.click();
            }}
          >
            <Upload size={13} className="mr-1.5" /> Select Files
          </Button>
          <input
            ref={fileRef}
            type="file"
            multiple
            accept="image/*,video/*"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
      </motion.div>

      {/* Media Grid */}
      <motion.div
        className={`${CARD} overflow-hidden`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
      >
        <Tabs defaultValue="photos">
          <div className="flex items-center justify-between px-5 pt-4 pb-0 border-b border-gray-100">
            <TabsList className="bg-gray-50 h-8">
              <TabsTrigger
                value="photos"
                data-ocid="media.photos_tab"
                className="text-xs h-7 data-[state=active]:bg-white data-[state=active]:text-[#C6A55C]"
              >
                <Image size={12} className="mr-1.5" /> Photos ({photos.length})
              </TabsTrigger>
              <TabsTrigger
                value="videos"
                data-ocid="media.videos_tab"
                className="text-xs h-7 data-[state=active]:bg-white data-[state=active]:text-[#C6A55C]"
              >
                <Video size={12} className="mr-1.5" /> Videos ({videos.length})
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="photos" className="p-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {photos.map((photo, i) => (
                <motion.div
                  key={photo.id}
                  data-ocid={`media.item.${i + 1}`}
                  className="relative group rounded-md overflow-hidden aspect-square cursor-pointer"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                >
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: photo.bg }}
                  >
                    <p
                      className="text-xs text-center px-2 text-gray-600 font-medium"
                      style={{ fontSize: "0.65rem" }}
                    >
                      {photo.label}
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => deletePhoto(photo.id)}
                      className="p-1.5 rounded-full bg-red-500 text-white"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos" className="p-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {videos.map((video, i) => (
                <motion.div
                  key={video.id}
                  data-ocid={`media.item.${i + 1}`}
                  className="relative group rounded-md overflow-hidden aspect-video cursor-pointer"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, delay: i * 0.06 }}
                >
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: video.bg }}
                  >
                    <div className="text-center">
                      <Video
                        size={24}
                        className="mx-auto mb-1"
                        style={{ color: "#C6A55C" }}
                      />
                      <p className="text-xs text-white/70">{video.label}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
