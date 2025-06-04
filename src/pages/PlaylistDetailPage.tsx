import React from 'react';
import { useParams } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Header from '@/components/layout/Header';
import FooterPlayer from '@/components/layout/Footer';
import PlaylistHeader from '@/components/PlaylistHeader';
import SongListItem from '@/components/SongListItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { PlayIcon, ShuffleIcon } from 'lucide-react';

const placeholderPlaylist = {
  id: 'pl123',
  title: 'Chill Vibes Mix',
  description: 'A collection of smooth tracks to relax and unwind.',
  creatorName: 'MusicApp Bot',
  creatorAvatarUrl: 'https://picsum.photos/seed/avatar2/40/40',
  coverImageUrl: 'https://picsum.photos/seed/playlistcover1/400/400',
  songCount: 5,
  totalDuration: '18 min',
  followers: 1200,
  isLiked: true,
};

const placeholderSongs = [
  { id: 'psong1', title: 'Ocean Calm', artist: 'Aqua Marine', album: 'Deep Blue', duration: '3:30', imageUrl: 'https://picsum.photos/seed/psong1/40/40', trackNumber: 1 },
  { id: 'psong2', title: 'Forest Whisper', artist: 'Sylva', album: 'Green Tones', duration: '4:02', imageUrl: 'https://picsum.photos/seed/psong2/40/40', trackNumber: 2 },
  { id: 'psong3', title: 'Starry Night', artist: 'Celeste', album: 'Cosmos', duration: '3:50', imageUrl: 'https://picsum.photos/seed/psong3/40/40', trackNumber: 3 },
  { id: 'psong4', title: 'Gentle Breeze', artist: 'Aura', album: 'Elements', duration: '3:15', imageUrl: 'https://picsum.photos/seed/psong4/40/40', trackNumber: 4 },
  { id: 'psong5', title: 'Quietude', artist: 'Paz', album: 'Stillness', duration: '3:23', imageUrl: 'https://picsum.photos/seed/psong5/40/40', trackNumber: 5 },
];

const PlaylistDetailPage: React.FC = () => {
  const { playlistId } = useParams<{ playlistId: string }>();
  console.log('PlaylistDetailPage loaded for playlistId:', playlistId);

  // In a real app, fetch playlist details and songs based on playlistId
  const playlist = { ...placeholderPlaylist, id: playlistId || placeholderPlaylist.id };
  const songs = placeholderSongs;

  const handlePlayPlaylist = (id: string | number) => console.log('Play playlist:', id);
  const handleLikeToggle = (id: string | number) => console.log('Toggle like for playlist:', id);
  const handlePlaySong = (songId: string | number) => console.log('Play song:', songId);

  return (
    <div className="flex h-screen bg-neutral-900 text-white overflow-hidden">
      <NavigationMenu className="w-64 flex-shrink-0 shadow-lg" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userName="Demo User" userAvatarUrl="https://github.com/shadcn.png" showSearch={false} />
        <ScrollArea className="flex-1 pb-[100px]"> {/* No horizontal padding, PlaylistHeader has its own */}
          <PlaylistHeader
            {...playlist}
            onPlayPlaylist={handlePlayPlaylist}
            onLikeToggle={handleLikeToggle}
          />
          <div className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6" onClick={() => handlePlayPlaylist(playlist.id)}>
                <PlayIcon className="mr-2 h-5 w-5 fill-current" /> Play
              </Button>
              <Button variant="outline" className="text-white border-neutral-500 hover:border-white hover:text-white rounded-full px-6">
                <ShuffleIcon className="mr-2 h-5 w-5" /> Shuffle
              </Button>
              {/* More actions like Add to queue, Share, etc. */}
            </div>
            
            <div className="space-y-1">
              {/* Song list headers (optional, SongListItem is self-descriptive) */}
              <div className="grid grid-cols-[auto,1fr,auto,auto] md:grid-cols-[2rem,1fr,1fr,auto,auto] gap-4 px-2 py-1 text-xs text-neutral-400 border-b border-neutral-700 mb-2 items-center">
                <span className="text-center">#</span>
                <span>TITLE</span>
                <span className="hidden md:block">ALBUM</span>
                <span className="hidden md:block text-right">OPTIONS</span>
                <span className="text-right">DURATION</span>
              </div>
              {songs.map((song, index) => (
                <SongListItem
                  key={song.id}
                  {...song}
                  trackNumber={index + 1}
                  onPlayPause={handlePlaySong}
                  className="hover:bg-neutral-800/80"
                />
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
      <FooterPlayer
         onNextTrack={() => console.log("Next Track from Playlist")}
         onPreviousTrack={() => console.log("Previous Track from Playlist")}
      />
    </div>
  );
};

export default PlaylistDetailPage;