import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import toast from "react-hot-toast";
import * as Icons from "@/public/assets/icons/Icons";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ActionTooltip } from "@/components/action-tooltip";

const FriendRequest = ({ setQuery, people }: { setQuery: Dispatch<SetStateAction<string>>, people: any[] }) => {
    const sendFrendRequest = useMutation(api.user.sendFriendRequest);
    const getImageUrl = useMutation(api.user.getImageUrl);

    const friendRequest = (username: string) => {
        // @ts-ignore
        const convexUserId: Id<"user"> = localStorage.getItem("convexUserId");

        // @ts-ignore
        const promise = sendFrendRequest({ id: convexUserId, username })
            .then(() => {
                toast.success(
                    <p>
                        Friend request sent to <b>@{username}</b>
                    </p>
                    ,
                    {
                        style: {
                            background: "#1a1a1a",
                            color: "#fcfcfc",
                            textAlign: "center",
                        },
                        position: "bottom-center",
                        duration: 4000,
                    }
                );
            })

    }

    return (
        <div className="w-2/6 flex items-center justify-start ml-4">
            <div className="w-96 relative">
                <Input className={cn(
                    people.length > 0 && "rounded-b-none"
                )} iconSrc={Icons.Search} placeholder="Search for people..." onChange={(e) => setQuery(e.target.value)} />
                {people.length > 0 && (
                    <div className="absolute bg-input_bg rounded-b-3xl w-full flex flex-col p-4 space-y-2 border-t-2 border-gray/25">
                        {people.map((peep: any, i: number) => (
                            <div key={i} className="text-white_text p-4 rounded-xl bg-black_third transition-all hover:bg-black_main flex items-center w-full h-20">
                                <div className="w-3/12 flex items-center justify-start">
                                    <Image
                                        src={peep.imageUrl}
                                        width={48}
                                        height={48}
                                        alt="avatar"
                                        className="rounded-full w-12 h-12 object-cover border-2 border-red"
                                    />
                                </div>
                                <div className="flex flex-col justify-between w-6/12 items-start">
                                    <div>
                                        <span>{peep.firstName}</span>
                                        <span>{peep.lastName}</span>
                                    </div>
                                    <span>@{peep.username}</span>
                                </div>
                                <div className="w-3/12 flex items-center justify-end">
                                    <ActionTooltip side="right" align="center" label="Add Friend">
                                        <Button onClick={() => friendRequest(peep.username)}>
                                            <Plus className="w-4 h-4 text-white_text" />
                                        </Button>
                                    </ActionTooltip>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
}

export default FriendRequest;