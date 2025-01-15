import { useRouter } from "next/navigation";
import useStore from "@/store/useStore";
import Typography from "../ui/typography";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";


const UserDropdown: React.FC = () => {
    const router = useRouter();


    // Access the user and signOut action from Zustand
    const user = useStore((state) => state.user);
    const signOut = useStore((state) => state.signOut);


    // Handle case when user or channels are not available
    if (!user || !user.channels?.length) return null;

    const { username, email, channels } = user;
    const { profilePic } = channels[0];
    const profilePicUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${profilePic}`;

    return (

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <img
                    src={profilePicUrl}
                    alt="Profile Picture"
                    className="w-9 h-9 rounded-full border cursor-pointer"
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <div className="p-4 flex items-center gap-2">
                    <img
                        src={profilePicUrl}
                        alt="Profile Picture"
                        className="w-9 h-9 rounded-full mx-auto"
                    />
                    <div className="text-left">

                        <Typography
                            variant="p"
                            size="sm"
                        >
                            {username}
                        </Typography>
                        <Typography
                            variant="p"
                            size="xs"
                            affects="muted"
                        >
                            {email}
                        </Typography>

                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/your-channel")}>
                    View Your Channel
                </DropdownMenuItem>
                <DropdownMenuItem onClick={signOut}>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>



    );
};

export default UserDropdown;
