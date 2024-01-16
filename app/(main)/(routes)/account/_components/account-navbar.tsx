'use client';

import Image from 'next/image'
import FriendRequest from './friend-request'
import { useEffect, useState } from 'react';
import { useConvex, useMutation } from 'convex/react';
import { useUser } from '@clerk/nextjs';
import { api } from '@/convex/_generated/api';
import { PrefetchRSCPathnameNormalizer } from 'next/dist/server/future/normalizers/request/prefetch-rsc';

const AccountNavbar = () => {
    const { user } = useUser();
    const convex = useConvex();

    // @ts-ignore
    const getImageUrl = useMutation(api.user.getImageUrl);

    // @ts-ignore
    const convexUserId: Id<"user"> = localStorage.getItem("convexUserId");

    const [query, setQuery] = useState<string>('');
    const [people, setPeople] = useState<any[]>([]);

    useEffect(() => {
        let ignore = false;
        if (user) {
            convex.query(api.user.searchForPeople, { id: convexUserId, query })
                .then(data => {
                    if (!ignore) {
                        data.forEach((single: any) => {
                            // @ts-ignore
                            const imgUrl = getImageUrl({ id: convexUserId, imageId: single.imageId })
                                .then((result: any) => {
                                    if (data.length !== 0 && !people.includes((peep: any) => peep.username === single.username)) {
                                        setPeople(prev => [...prev, {
                                            imageUrl: result,
                                            firstName: single.firstName,
                                            lastname: single.lastName,
                                            username: single.username,
                                        }]);
                                    }
                                })
                        })
                        if (data.length === 0) {
                            setPeople([])
                        }
                    }
                })
                .catch(error => {
                    console.log(error);
                });

        }
        return () => { ignore = true }
    }, [query]);

    useEffect(() => {
        console.log(people)
    }, [people])

    return (
        <div className="w-full pt-5 flex">
            <FriendRequest setQuery={setQuery} people={people} />
            <div className="w-2/6 flex justify-center items-center">
                <Image
                    src="/assets/logo.svg"
                    alt="flexbox-logo"
                    width={137}
                    height={30}
                    className='justify-items-center'
                />
            </div>
            <div className='w-2/6'></div>
        </div>
    )
}

export default AccountNavbar