"use client"

import { Music } from '@/store/songs.store'
import React from 'react'
import SongItem from './SongItem';
import useOnPlay from '@/store/hooks/useOnPlay';

interface SongsPageProps {
    songs: Music[];
}

const SongsPage: React.FC<SongsPageProps> = ({ songs }) => {

    const onPlay = useOnPlay(songs);


    if (songs.length === 0) {
        return (
            <div className='mt-4 text-neutral-400'>
                No Songs Available.
            </div>
        )
    }

    return (
        <div className='mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {songs.map((item) => (

                <SongItem
                    key={item.id}
                    onClick={(id: number) => onPlay(id.toString())}
                    data={item}
                    id={item.id}
                />
            ))}
        </div>
    )

}

export default SongsPage