import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Header from '@/components/layout/Header';
import FooterPlayer from '@/components/layout/Footer';
import AlbumArtCard from '@/components/AlbumArtCard';
import SongListItem from '@/components/SongListItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input'; // Though Header has Input, page type emphasizes it
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const initialAlbums = [
  { id: 's_album1', title: 'Found Beats', artist: 'Searcher', imageUrl: 'https://picsum.photos/seed/s_album1/200/200', releaseYear: '2023' },
  { id: 's_album2', title: 'Echoes in Silence', artist: 'Listener', imageUrl: 'https://picsum.photos/seed/s_album2/200/200', releaseYear: '2022' },
];
const initialSongs = [
  { id: 's_song1', title: 'Discovery Lane', artist: 'Explorer', album: 'New Paths', duration: '3:20', imageUrl: 'https://picsum.photos/seed/s_song1/40/40' },
  { id: 's_song2', title: 'Hidden Gem', artist: 'Curator', album: 'Collections', duration: '4:01', imageUrl: 'https://picsum.photos/seed/s_song2/40/40' },
];

const SearchPage: React.FC = () => {
  console.log('SearchPage loaded');
  const [searchQuery, setSearchQuery] = useState('');
  const [songs, setSongs] = useState(initialSongs);
  const [albums, setAlbums] = useState(initialAlbums);
  // In a real app, these would be fetched based on searchQuery

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    console.log('Searching for:', query);
    // Dummy filter logic
    if (query) {
        setSongs(initialSongs.filter(s => s.title.toLowerCase().includes(query.toLowerCase()) || s.artist.toLowerCase().includes(query.toLowerCase())));
        setAlbums(initialAlbums.filter(a => a.title.toLowerCase().includes(query.toLowerCase()) || a.artist.toLowerCase().includes(query.toLowerCase())));
    } else {
        setSongs(initialSongs);
        setAlbums(initialAlbums);
    }
  };
  
  const handlePlayAlbum = (albumId: string | number) => console.log('Play album:', albumId);
  const handleViewAlbum = (albumId: string | number) => console.log('View album:', albumId);
  const handlePlaySong = (songId: string | number) => console.log('Play song:', songId);

  return (
    <div className="flex h-screen bg-neutral-900 text-white overflow-hidden">
      <NavigationMenu className="w-64 flex-shrink-0 shadow-lg" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          userName="Demo User" 
          userAvatarUrl="https://github.com/shadcn.png" 
          showSearch={true} 
          onSearchChange={handleSearchChange}
        />
        <ScrollArea className="flex-1 p-6 pb-[100px]">
          {searchQuery && <h2 className="text-xl font-semibold mb-4">Results for "{searchQuery}"</h2>}
          {!searchQuery && <h2 className="text-xl font-semibold mb-4">Browse all or start typing to search...</h2>}
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-4 bg-neutral-800">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="songs">Songs</TabsTrigger>
              <TabsTrigger value="artists">Artists</TabsTrigger>
              <TabsTrigger value="albums">Albums</TabsTrigger>
              <TabsTrigger value="playlists">Playlists</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <h3 className="text-lg font-semibold my-2">Songs</h3>
              {songs.length > 0 ? songs.map(song => <SongListItem key={song.id} {...song} onPlayPause={handlePlaySong} />) : <p>No songs found.</p>}
              <h3 className="text-lg font-semibold my-4">Albums</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {albums.length > 0 ? albums.map(album => <AlbumArtCard key={album.id} {...album} onPlayAlbum={handlePlayAlbum} onViewAlbum={handleViewAlbum}/>) : <p>No albums found.</p>}
              </div>
            </TabsContent>
            <TabsContent value="songs">
              {songs.length > 0 ? songs.map(song => <SongListItem key={song.id} {...song} onPlayPause={handlePlaySong} />) : <p>No songs found.</p>}
            </TabsContent>
            <TabsContent value="artists">
              <p className="text-neutral-400">Artist results would show here (e.g., using AlbumArtCard or a dedicated ArtistCard).</p>
              {/* Example using AlbumArtCard for artists */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {albums.slice(0,2).map(album => <AlbumArtCard key={`artist-${album.id}`} albumId={album.id} title={album.artist} artist="Artist" imageUrl={`https://picsum.photos/seed/${album.artist}/200/200`} onPlayAlbum={handlePlayAlbum} onViewAlbum={handleViewAlbum} />)}
              </div>
            </TabsContent>
            <TabsContent value="albums">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {albums.length > 0 ? albums.map(album => <AlbumArtCard key={album.id} {...album} onPlayAlbum={handlePlayAlbum} onViewAlbum={handleViewAlbum} />) : <p>No albums found.</p>}
              </div>
            </TabsContent>
            <TabsContent value="playlists">
              <p className="text-neutral-400">Playlist results would show here (e.g., using AlbumArtCard).</p>
               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {albums.slice(0,1).map(album => <AlbumArtCard key={`playlist-${album.id}`} albumId={album.id} title="My Awesome Mix" artist="Demo User" imageUrl={`https://picsum.photos/seed/playlist-${album.id}/200/200`} onPlayAlbum={handlePlayAlbum} onViewAlbum={handleViewAlbum} />)}
              </div>
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </div>
      <FooterPlayer 
        onNextTrack={() => console.log("Next Track from Search")}
        onPreviousTrack={() => console.log("Previous Track from Search")}
      />
    </div>
  );
};

export default SearchPage;