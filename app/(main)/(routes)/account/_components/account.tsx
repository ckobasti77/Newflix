'use client'

import { useUser } from "@clerk/nextjs";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useContext, useEffect, useState } from "react";
import UploadPhoto from "./upload-photo";
import AccountContext from "../_context/account-context";
import FullName from "./full-name";
import Username from "./username";
import FriendRequest from "./friend-request";
import { Id } from "@/convex/_generated/dataModel";

const Account = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    const convex = useConvex();
    // @ts-ignore
    const getImageUrl = useMutation(api.user.getImageUrl);

    // @ts-ignore
    const { setImageUrl, setFullName, setUsername } = useContext(AccountContext);

    // @ts-ignore
    const convexUserId: Id<"user"> = localStorage.getItem("convexUserId");

    useEffect(() => {
        let ignore = false;
        if (user) {
            convex.query(api.user.getUser, { userId: user.id })
                .then(userData => {
                    if (userData && !ignore) {
                        // @ts-ignore
                        const imgUrl = getImageUrl({ id: userData._id, imageId: userData.imageId }).then(result => setImageUrl(result));
                        setFullName(`${userData.firstName} ${userData.lastName}`);
                        setUsername(userData.username ? userData.username : "");
                    }
                })
                .catch(error => {
                    console.log(error);
                });

        }
        return () => { ignore = true }
    }, [user, convex]);

    if (!isLoaded || !isSignedIn || !user) {
        return null;
    }

    return (
        <div className="flex flex-col items-center gap-y-4 justify-center my-6">
            <UploadPhoto />
            <FullName />
            <Username />
        </div>
    );
}

export default Account;