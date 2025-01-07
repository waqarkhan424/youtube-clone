import FormInput from "@/components/shared/FormInput";

interface VideoUploadFormProps {
    title: string;
    description: string;
    video: File | null;
    thumbnail: File | null;
    setTitle: (value: string) => void;
    setDescription: (value: string) => void;
    setVideo: (file: File | null) => void;
    setThumbnail: (file: File | null) => void;
    onUpload: () => void;
}

const VideoUploadForm: React.FC<VideoUploadFormProps> = ({
    title,
    description,
    video,
    thumbnail,
    setTitle,
    setDescription,
    setVideo,
    setThumbnail,
    onUpload,
}) => {
    return (
        <div className="mb-6">
            <FormInput
                type="text"
                placeholder="Video Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <FormInput
                type="textarea"
                placeholder="Video Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <label className="block text-gray-700 mb-1" htmlFor="video-upload">
                Upload Video (MP4, AVI, etc.)
            </label>
            <FormInput
                id="video-upload"
                type="file"
                accept="video/*"
                onChange={(e) => setVideo((e.target as HTMLInputElement).files?.[0] || null)}
            />
            <label className="block text-gray-700 mb-1" htmlFor="thumbnail-upload">
                Upload Thumbnail (JPEG, PNG, etc.)
            </label>
            <FormInput
                id="thumbnail-upload"
                type="file"
                accept="image/*"
                onChange={(e) => setThumbnail((e.target as HTMLInputElement).files?.[0] || null)}
            />
            <button
                onClick={onUpload}
                className="px-4 py-2 bg-blue-500 text-white rounded-md mt-2"
            >
                Upload Video
            </button>
        </div>
    );
};

export default VideoUploadForm;
