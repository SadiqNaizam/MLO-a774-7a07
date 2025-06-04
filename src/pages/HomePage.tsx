import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Header from '@/components/layout/Header';
import FooterPlayer from '@/components/layout/Footer';
import AlbumArtCard from '@/components/AlbumArtCard';
import SongListItem from '@/components/SongListItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const placeholderAlbums = [
  { id: 'album1', title: 'Synth Dreams', artist: 'Future Wave', imageUrl: 'https://picsum.photos/seed/album1/200/200', releaseYear: '2023' },
  { id: 'album2', title: 'Acoustic Nights', artist: 'Ella Harmony', imageUrl: 'https://picsum.photos/seed/album2/200/200', releaseYear: '2022' },
  { id: 'album3', title: 'Midnight Drive', artist: 'Urban Pulse', imageUrl: 'https://picsum.photos/seed/album3/200/200', releaseYear: '2023' },
  { id: 'album4', title: 'Cosmic Journey', artist: 'Orion Nebula', imageUrl: 'https://picsum.photos/seed/album4/200/200', releaseYear: '2021' },
  { id: 'album5', title: 'Lo-Fi Beats', artist: 'Chillhop Cafe', imageUrl: 'https://picsum.photos/seed/album5/200/200', releaseYear: '2024' },
];

const placeholderSongs = [
  { id: 'song1', title: 'Sunset Groove', artist: 'The Cavaliers', album: 'Summer Vibes', duration: '3:45', imageUrl: 'https://picsum.photos/seed/song1/40/40' },
  { id: 'song2', title: 'Rainy Day Thoughts', artist: 'Sophie Miles', album: 'Reflections', duration: '4:12', imageUrl: 'https://picsum.photos/seed/song2/40/40' },
  { id: 'song3', title: 'City Lights', artist: 'Metro Bloom', album: 'Urban Echoes', duration: '2:58', imageUrl: 'https://picsum.photos/seed/song3/40/40' },
];

const HomePage: React.FC = () => {
  console.log('HomePage loaded');

  const handlePlayAlbum = (albumId: string | number) => console.log('Play album:', albumId);
  const handleViewAlbum = (albumId: string | number) => console.log('View album:', albumId);
  const handlePlaySong = (songId: string | number) => console.log('Play song:', songId);

  return (
    <div className="flex h-screen bg-neutral-900 text-white overflow-hidden">
      <NavigationMenu className="w-64 flex-shrink-0 shadow-lg" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userName="Demo User" userAvatarUrl="https://github.com/shadcn.png" showSearch={false} />
        <ScrollArea className="flex-1 p-6 pb-[100px]">
          <div className="space-y-10">
            {/* Recently Played Section */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">Recently Played</h2>
              <div className="flex space-x-4 overflow-x-auto pb-2 -mx-2 px-2">
                {placeholderAlbums.slice(0, 3).map(album => (
                  <AlbumArtCard
                    key={album.id}
                    {...album}
                    onPlayAlbum={handlePlayAlbum}
                    onViewAlbum={handleViewAlbum}
                    className="flex-shrink-0 w-[180px]"
                  />
                ))}
              </div>
            </section>

            <Separator className="bg-neutral-700" />

            {/* New Releases Section */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">New Releases</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {placeholderAlbums.map(album => (
                  <AlbumArtCard
                    key={album.id}
                    {...album}
                    onPlayAlbum={handlePlayAlbum}
                    onViewAlbum={handleViewAlbum}
                  />
                ))}
              </div>
            </section>

            <Separator className="bg-neutral-700" />

            {/* Made for You Section (Example with SongListItems) */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">Made for You</h2>
              <div className="space-y-2">
                {placeholderSongs.map(song => (
                  <SongListItem
                    key={song.id}
                    {...song}
                    onPlayPause={handlePlaySong}
                    isLiked={Math.random() > 0.7}
                  />
                ))}
              </div>
            </section>
          </div>
        </ScrollArea>
      </div>
      <FooterPlayer 
        initialTrack={{
            id: 'dummy1',
            title: 'Ambient Dreams',
            artist: 'Serenity Studio',
            albumArtUrl: 'https://picsum.photos/seed/fp1/64/64',
            durationSeconds: 240,
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
        }}
        onNextTrack={() => console.log("Next Track")}
        onPreviousTrack={() => console.log("Previous Track")}
      />
    </div>
  );
};

export default HomePage;