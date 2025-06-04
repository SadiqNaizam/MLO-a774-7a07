import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PlayCircle, Heart, Users, Clock3, ListMusic } from 'lucide-react'; // Example icons
import { cn } from '@/lib/utils';

interface PlaylistHeaderProps {
  playlistId: string | number;
  title: string;
  description?: string;
  creatorName: string;
  creatorAvatarUrl?: string;
  coverImageUrl: string;
  songCount: number;
  totalDuration: string; // e.g., "2 hr 30 min" or "45 songs, 3 hr 15 min"
  followers?: number;
  isLiked?: boolean;
  onPlayPlaylist?: (playlistId: string | number) => void;
  onLikeToggle?: (playlistId: string | number) => void;
  className?: string;
}

const PlaylistHeader: React.FC<PlaylistHeaderProps> = ({
  playlistId,
  title,
  description,
  creatorName,
  creatorAvatarUrl,
  coverImageUrl,
  songCount,
  totalDuration,
  followers,
  isLiked = false,
  onPlayPlaylist,
  onLikeToggle,
  className,
}) => {
  console.log("Rendering PlaylistHeader:", title);

  return (
    <header className={cn("flex flex-col md:flex-row items-center md:items-end gap-6 p-6 md:p-8 bg-gradient-to-b from-neutral-700 to-neutral-800/30 text-white rounded-t-lg", className)}>
      {/* Cover Image */}
      <div className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 flex-shrink-0 shadow-2xl rounded-md overflow-hidden">
        <img
          src={coverImageUrl || '/placeholder.svg'}
          alt={`Cover for ${title}`}
          className="w-full h-full object-cover"
          onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
        />
      </div>

      {/* Playlist Info */}
      <div className="flex flex-col gap-2 text-center md:text-left">
        <span className="text-xs font-semibold uppercase">Playlist</span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight break-words">
          {title}
        </h1>
        {description && <p className="text-sm text-neutral-300 mt-1 line-clamp-2">{description}</p>}

        <div className="flex items-center justify-center md:justify-start space-x-2 text-xs text-neutral-300 mt-2 flex-wrap">
          <Avatar className="h-6 w-6">
            <AvatarImage src={creatorAvatarUrl} alt={creatorName} />
            <AvatarFallback>{creatorName?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
          </Avatar>
          <span className="font-semibold text-white">{creatorName}</span>
          {followers !== undefined && (
            <>
              <span className="text-neutral-500">•</span>
              <span>{followers.toLocaleString()} likes</span>
            </>
          )}
          <span className="text-neutral-500">•</span>
          <span>{songCount} songs</span>
          <span className="text-neutral-500 hidden sm:inline">•</span>
          <span className="hidden sm:inline">{totalDuration}</span>
        </div>

         {/* Actions */}
        <div className="flex items-center space-x-3 mt-4 justify-center md:justify-start">
            {onPlayPlaylist && (
            <Button
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold"
                onClick={() => onPlayPlaylist(playlistId)}
            >
                <PlayCircle className="mr-2 h-6 w-6 fill-current" /> Play
            </Button>
            )}
            {onLikeToggle && (
            <Button variant="ghost" size="icon" className={cn("text-neutral-300 hover:text-white h-10 w-10", isLiked && "text-green-500 hover:text-green-400")} onClick={() => onLikeToggle(playlistId)}>
                <Heart className={cn("h-6 w-6", isLiked && "fill-current")} />
            </Button>
            )}
            {/* Could add more options button here */}
        </div>
      </div>
    </header>
  );
};

export default PlaylistHeader;