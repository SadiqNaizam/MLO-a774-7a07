import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from '@/components/ui/button';
import { PlayCircle, ListMusic } from 'lucide-react'; // Icons for play and view tracks

interface AlbumArtCardProps {
  albumId: string | number;
  title: string;
  artist: string;
  imageUrl: string;
  releaseYear?: string | number;
  onPlayAlbum?: (albumId: string | number) => void;
  onViewAlbum?: (albumId: string | number) => void; // e.g. navigate to album detail page
  className?: string;
}

const AlbumArtCard: React.FC<AlbumArtCardProps> = ({
  albumId,
  title,
  artist,
  imageUrl,
  releaseYear,
  onPlayAlbum,
  onViewAlbum,
  className,
}) => {
  console.log("Rendering AlbumArtCard:", title);

  return (
    <Card className={`w-full max-w-[200px] bg-neutral-800 border-neutral-700 text-white group overflow-hidden rounded-lg shadow-lg hover:bg-neutral-700 transition-all duration-300 ${className}`}>
      <CardHeader className="p-0 relative">
        <AspectRatio ratio={1 / 1} className="bg-neutral-700">
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={`Album art for ${title}`}
            className="object-cover w-full h-full rounded-t-lg group-hover:scale-105 transition-transform duration-300"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
        {onPlayAlbum && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-2 right-2 bg-green-500 hover:bg-green-600 text-white rounded-full h-10 w-10 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300 shadow-md"
            onClick={() => onPlayAlbum(albumId)}
            aria-label={`Play album ${title}`}
          >
            <PlayCircle className="h-6 w-6" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="p-3 space-y-1">
        <CardTitle
            className="text-sm font-semibold truncate hover:underline cursor-pointer"
            onClick={onViewAlbum ? () => onViewAlbum(albumId) : undefined}
        >
            {title}
        </CardTitle>
        <CardDescription className="text-xs text-neutral-400 truncate">
          {artist} {releaseYear && `• ${releaseYear}`}
        </CardDescription>
      </CardContent>
      {/* Optional: Could add a small explicit "View Album" button if needed, or more details in CardFooter */}
    </Card>
  );
};

export default AlbumArtCard;