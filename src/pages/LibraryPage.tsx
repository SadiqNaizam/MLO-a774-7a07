import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Header from '@/components/layout/Header';
import FooterPlayer from '@/components/layout/Footer';
import AlbumArtCard from '@/components/AlbumArtCard';
import SongListItem from '@/components/SongListItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const libraryPlaylists = [
  { id: 'libPl1', title: 'My Workout Mix', artist: 'Demo User', imageUrl: 'https://picsum.photos/seed/libPl1/200/200', releaseYear: 'Playlist' },
  { id: 'libPl2', title: 'Road Trip Anthems', artist: 'Demo User', imageUrl: 'https://picsum.photos/seed/libPl2/200/200', releaseYear: 'Playlist' },
];
const libraryLikedSongs = [
  { id: 'liked1', title: 'Favorite Tune', artist: 'Known Artist', album: 'Greatest Hits', duration: '3:55', imageUrl: 'https://picsum.photos/seed/liked1/40/40', isLiked: true },
  { id: 'liked2', title: 'Another Banger', artist: 'DJ Spin', album: 'Club Life', duration: '4:20', imageUrl: 'https://picsum.photos/seed/liked2/40/40', isLiked: true },
];
const libraryArtists = [ // Using AlbumArtCard structure for artists
  { id: 'artist1', title: 'Globetrotter Beats', artist: 'Artist', imageUrl: 'https://picsum.photos/seed/artist1/200/200', releaseYear: 'Followed Artist' },
  { id: 'artist2', title: 'Melody Maker', artist: 'Artist', imageUrl: 'https://picsum.photos/seed/artist2/200/200', releaseYear: 'Followed Artist' },
];
const libraryAlbums = [
  { id: 'libAlbum1', title: 'Classic Rock Hits', artist: 'Various Artists', imageUrl: 'https://picsum.photos/seed/libAlbum1/200/200', releaseYear: '1998' },
  { id: 'libAlbum2', title: 'Indie Discoveries', artist: 'Emerging Talents', imageUrl: 'https://picsum.photos/seed/libAlbum2/200/200', releaseYear: '2024' },
];

const LibraryPage: React.FC = () => {
  console.log('LibraryPage loaded');
  const handlePlayItem = (id: string | number, type: string) => console.log(`Play ${type}:`, id);
  const handleViewItem = (id: string | number, type: string) => console.log(`View ${type}:`, id);

  return (
    <div className="flex h-screen bg-neutral-900 text-white overflow-hidden">
      <NavigationMenu className="w-64 flex-shrink-0 shadow-lg" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userName="Demo User" userAvatarUrl="https://github.com/shadcn.png" showSearch={false} />
        <ScrollArea className="flex-1 p-6 pb-[100px]">
          <h1 className="text-3xl font-bold mb-6 text-white">Your Library</h1>
          <Tabs defaultValue="playlists" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6 bg-neutral-800">
              <TabsTrigger value="playlists">Playlists</TabsTrigger>
              <TabsTrigger value="songs">Liked Songs</TabsTrigger>
              <TabsTrigger value="artists">Artists</TabsTrigger>
              <TabsTrigger value="albums">Albums</TabsTrigger>
            </TabsList>
            <TabsContent value="playlists">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {libraryPlaylists.map(item => <AlbumArtCard key={item.id} {...item} albumId={item.id} onPlayAlbum={(id) => handlePlayItem(id, 'playlist')} onViewAlbum={(id) => handleViewItem(id, 'playlist')} />)}
              </div>
            </TabsContent>
            <TabsContent value="songs">
              <div className="space-y-1">
                {libraryLikedSongs.map((song, idx) => <SongListItem key={song.id} {...song} trackNumber={idx+1} onPlayPause={(id) => handlePlayItem(id, 'song')} />)}
              </div>
            </TabsContent>
            <TabsContent value="artists">
               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {libraryArtists.map(item => <AlbumArtCard key={item.id} {...item} albumId={item.id} onPlayAlbum={(id) => handlePlayItem(id, 'artist')} onViewAlbum={(id) => handleViewItem(id, 'artist')} />)}
              </div>
            </TabsContent>
            <TabsContent value="albums">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {libraryAlbums.map(item => <AlbumArtCard key={item.id} {...item} albumId={item.id} onPlayAlbum={(id) => handlePlayItem(id, 'album')} onViewAlbum={(id) => handleViewItem(id, 'album')} />)}
              </div>
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </div>
      <FooterPlayer 
        onNextTrack={() => console.log("Next Track from Library")}
        onPreviousTrack={() => console.log("Previous Track from Library")}
      />
    </div>
  );
};

export default LibraryPage;