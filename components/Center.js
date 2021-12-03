import { ChevronDownIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistState, playlistIdState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";

const colors = [
    "from-indigo-500",
    "from-purple-500",
    "from-pink-500",
    "from-red-500",
    "from-yellow-500",
    "from-green-500",
    "from-blue-500",
];

function Center() {
    const { data: session } = useSession();
    const [color, setColor] = useState(null);
    const playlistId = useRecoilValue(playlistIdState);
    const [playlist, setPlaylist] = useRecoilState(playlistState);
    const spotifyApi = useSpotify();

    useEffect(() => {
        setColor(colors[Math.floor(Math.random() * colors.length)]);
    }, [playlistId]);

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi
                .getPlaylist(playlistId)
                .then((res) => {
                    setPlaylist(res.body);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [spotifyApi, playlistId]);

    return (
        <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
            <header className="absolute top-5 right-8">
                <div
                    className="flex items-center bg-black text-white space-x-3
                    opacity-90 hover:opacity-80 cursor-pointer rounded-full
                    p-1 pr-2"
                    onClick={signOut}
                >
                    <img
                        className="rounded-full w-10 h-10"
                        src={
                            session?.user.picture ||
                            "https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg"
                        }
                        alt="i'm here"
                    ></img>
                    <h2>{session?.user.name}</h2>
                    <ChevronDownIcon className="h-5 w-5" />
                </div>
            </header>

            <section
                className={`flex items-end space-x-7 bg-gradient-to-b
                to-black ${color} h-80 text-white p-8`}
            >
                <img
                    className="h-44 w-44 shadow-2xl"
                    src={playlist?.images?.[0].url}
                ></img>
                <div>
                    <p>PLAYLIST</p>
                    <h2 className="text-2xl md:text-3xl xl:text-5xl font-bold">
                        {playlist?.name}
                    </h2>
                </div>
            </section>

            <div>
                <Songs />
            </div>
        </div>
    );
}

export default Center;
