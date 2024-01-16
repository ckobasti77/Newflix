"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction, useEffect, useState, } from "react";
import { fetchSerieSeason } from "@/tmdb-api/api";

interface SerieSidebarProps {
    serie: any;
    currentSeasonId: any;
    setCurrentSeasonId: Dispatch<SetStateAction<any>>
    currentEpisodeId: any;
    setCurrentEpisodeId: Dispatch<SetStateAction<any>>;
    episodeSeasonId: any;
    setEpisodeSeasonId: Dispatch<SetStateAction<any>>;
}
const SerieSidebar = ({
    serie,
    currentEpisodeId,
    setCurrentEpisodeId,
    currentSeasonId,
    setCurrentSeasonId,
    episodeSeasonId,
    setEpisodeSeasonId
}: SerieSidebarProps) => {

    // const [currentSeasonId, setCurrentSeasonId] = useState<any>(1);
    // const [currentEpisodeId, setCurrentEpisodeId] = useState<any>(1);
    const [currentSeason, setCurrentSeason] = useState<any>();
    const [currentSeasonEpisodes, setcurrentSeasonEpisodes] = useState<any>();

    useEffect(() => {
        const getSeason = async () => {
            await fetchSerieSeason(serie.serie.id, currentSeasonId)
                .then((res: any) => {
                    setCurrentSeason({ ...res });
                    setcurrentSeasonEpisodes({ ...res }.episodes)
                })
        }
        getSeason();
    }, []);

    useEffect(() => {
        const getSeason = async () => {
            await fetchSerieSeason(serie.serie.id, currentSeasonId)
                .then((res: any) => {
                    setCurrentSeason({ ...res });
                    setcurrentSeasonEpisodes({ ...res }.episodes)
                })
        }
        getSeason();
    }, [currentSeasonId]);

    useEffect(() => {
        console.log(currentSeasonEpisodes)
    }, [currentSeasonEpisodes]);

    return (
        <div className="w-[300px] rounded-3xl bg-input_bg px-6 py-3 sticky top-5 max-h-screen overflow-y-scroll custom-scrollbar">
            <Accordion type="single" collapsible className="w-full">
                {serie.serie.seasons.map((season: any, i: number) => (
                    <AccordionItem key={i} onClick={() => setCurrentSeasonId(i + 1)} value={`item-${i + 1}`} className="border-b-[3px] border-b-[#242424]">
                        <AccordionTrigger className="text-white_text">Season {i + 1}</AccordionTrigger>
                        <AccordionContent>
                            {currentSeasonId === i + 1 && (
                                <>
                                    {currentSeasonEpisodes?.map((episode: any, j: number) => (
                                        <div className="flex first-line:mb-1.5 items-center space-x-2 custom-checkbox" key={j + 1}>
                                            <input type="checkbox" checked={currentEpisodeId === episode.id} onChange={() => {
                                                setCurrentEpisodeId(j + 1);
                                                setEpisodeSeasonId(currentSeasonId)
                                            }} value={episode.id} name={episode.id} id={episode.id} className="hidden ring-gray peer season" />
                                            <Label
                                                htmlFor={episode.id}
                                                className="checkbox-label peer-checked:text-white_text transition-all text-base font-normal leading-none"
                                            >
                                                Episode {j + 1}
                                            </Label>
                                        </div>
                                    ))}
                                </>
                            )}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}

export default SerieSidebar;
