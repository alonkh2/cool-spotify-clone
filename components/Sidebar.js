import {
    HeartIcon,
    HomeIcon,
    LibraryIcon,
    PlusCircleIcon,
    RssIcon,
    SearchIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";

function Sidebar() {
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [playlists, setPlaylists] = useState([]);
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi
                .getUserPlaylists()
                .then((res) => {
                    setPlaylists(res.body.items);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [session, spotifyApi]);
    return (
        <div
            className="text-[#404347] p-5
        text-xs lg:text-sm border-r border-[#292b2e30]
        overflow-y-scroll scrollbar-hide h-screen sm:max-w-[12rem] lg:max-w-[15rem]
        hidden md:inline-flex"
        >
            <div className="space-y-4">
                <button className="option">
                    <HomeIcon className="icon" />
                    <p>Home</p>
                </button>
                <button className="option">
                    <SearchIcon className="icon" />
                    <p>Search</p>
                </button>
                <button className="option">
                    <LibraryIcon className="icon" />
                    <p>Your Library</p>
                </button>

                <hr className="border-t-[0.1px] border-[#292b2e30]" />

                <button className="option">
                    <PlusCircleIcon className="icon" />
                    <p>Create Playlist</p>
                </button>
                <button className="option">
                    <HeartIcon className="icon" />
                    <p>Liked Songs</p>
                </button>
                <button className="option">
                    <RssIcon className="icon" />
                    <p>Your Episodes</p>
                </button>

                <hr className="border-t-[0.1px] border-[#292b2e30]" />

                {playlists.map((playlist) => (
                    <p
                        onClick={() => setPlaylistId(playlist.id)}
                        className="cursor-pointer hover:text-white"
                        key={playlist.id}
                    >
                        {playlist.name}
                    </p>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
