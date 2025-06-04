import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, PlusCircle, Ellipsis, Heart } from 'lucide-react'; // Example icons
import { cn } from '@/lib/utils';

interface SongListItemProps {
  songId: string | number;
  title: string;
  artist: string;
  album?: string;
  duration: string; // e.g., "3:45"
  imageUrl?: string; // Small thumbnail for the song
  isPlaying?: boolean;
  isCurrent?: boolean; // Is this the currently active song in a list
  isLiked?: boolean;
  trackNumber?: number;
  onPlayPause?: (songId: string | number) => void;
  onLikeToggle?: (songId: string | number) => void;
  onAddToQueue?: (songId: string | number) => void;
  onOptionsClick?: (songId: string | number, event: React.MouseEvent) => void;
  className?: string;
}

const SongListItem: React.FC<SongListItemProps> = ({
  songId,
  title,
  artist,
  album,
  duration,
  imageUrl,
  isPlaying = false,
  isCurrent = false,
  isLiked = false,
  trackNumber,
  onPlayPause,
  onLikeToggle,
  onAddToQueue,
  onOptionsClick,
  className,
}) => {
  console.log("Rendering SongListItem:", title, "- IsPlaying:", isPlaying);

  return (
    <div
      className={cn(
        "flex items-center p-2 pr-4 space-x-3 hover:bg-neutral-800/70 rounded-md group transition-colors",
        isCurrent ? "bg-neutral-700/50 text-green-400" : "text-neutral-300",
        className
      )}
    >
      {trackNumber !== undefined && (
        <div className="w-6 text-right text-sm text-neutral-400 group-hover:hidden">
          {isCurrent && isPlaying ? <Pause className="h-4 w-4 text-green-400 animate-pulse" /> : <span>{trackNumber}</span>}
        </div>
      )}
      {onPlayPause && (
         <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8 text-neutral-300 hover:text-white",
              trackNumber !== undefined ? "hidden group-hover:flex" : "flex"
            )}
            onClick={() => onPlayPause(songId)}
            aria-label={isPlaying && isCurrent ? `Pause ${title}` : `Play ${title}`}
          >
            {isPlaying && isCurrent ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
      )}

      {imageUrl && (
        <img src={imageUrl} alt={album || title} className="h-10 w-10 rounded object-cover" />
      )}

      <div className="flex-1 min-w-0">
        <p className={cn("text-sm font-medium truncate", isCurrent ? "text-green-400" : "text-white")}>{title}</p>
        <p className="text-xs text-neutral-400 truncate">{artist}</p>
      </div>

      {album && <p className="hidden md:block text-sm text-neutral-400 truncate w-1/4 hover:underline cursor-pointer">{album}</p>}

      <div className="flex items-center space-x-2 ml-auto">
        {onLikeToggle && (
            <Button variant="ghost" size="icon" className={cn("h-8 w-8 text-neutral-400 hover:text-white hidden group-hover:flex", isLiked && "text-green-500 hover:text-green-400")} onClick={() => onLikeToggle(songId)}>
                <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
            </Button>
        )}
        <span className="text-sm text-neutral-400 w-10 text-right">{duration}</span>
        {onOptionsClick && (
            <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-400 hover:text-white hidden group-hover:flex" onClick={(e) => onOptionsClick(songId, e)}>
                <Ellipsis className="h-4 w-4" />
            </Button>
        )}
      </div>
    </div>
  );
};

export default SongListItem;