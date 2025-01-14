import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";


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

        <Card>
            <CardHeader>
                <CardTitle>Manage and upload your videos</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            placeholder="Enter video title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Enter video description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div>
                        <Label htmlFor="video-upload">Upload Video </Label>
                        <Input
                            id="video-upload"
                            type="file"
                            accept="video/*"
                            onChange={(e) =>
                                setVideo((e.target as HTMLInputElement).files?.[0] || null)
                            }
                            placeholder="Upload video file"
                        />
                    </div>

                    <div>
                        <Label htmlFor="thumbnail-upload">Upload Thumbnail</Label>
                        <Input
                            id="thumbnail-upload"
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setThumbnail((e.target as HTMLInputElement).files?.[0] || null)
                            }
                            placeholder="Upload thumbnail image"
                        />
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={onUpload}>Upload</Button>
            </CardFooter>
        </Card>



    );
};

export default VideoUploadForm;
