"use client"

import Image from 'next/image';
import Card from './Card';
interface AlbumProps {
    imageUrl: string;
    name?: string;
    artistName?: string;
}
const AlbumCard: React.FC<AlbumProps> = ({ imageUrl, name, artistName }) => {

    return (
        <Card className="mt-8 w-64 bg-yellow-800 transition duration-400 ease-in-out hover:bg-yellow-700" >
             <div className="relative h-48 w-full">
                <Image
                    src={imageUrl}
                    alt="Album cover"
                    className="object-cover rounded-t-lg"
                    layout="fill"
                />
            </div>
            <div className="p-4">
                <h2 className="text-lg font-semibold text-white">{name}</h2>
                <p className="text-gray-300">{artistName}</p>
            </div>
        </Card>
    );
}

export default AlbumCard;