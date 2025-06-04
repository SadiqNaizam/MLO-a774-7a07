import React from 'react';
import { useParams } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Header from '@/components/layout/Header';
import FooterPlayer from '@/components/layout/Footer';
import AlbumArtCard from '@/components/AlbumArtCard';
import SongListItem from '@/components/SongListItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { UserPlus, CheckCircle } from 'lucide-react';

const placeholderArtist = {
  id: 'art789',
  name: 'Celestial Echoes',
  bio: 'Celestial Echoes crafts ethereal soundscapes that transport listeners to other dimensions. With a blend of ambient textures and haunting melodies, their music is an exploration of dreams and the cosmos.',
  bannerImageUrl: 'https://picsum.photos/seed/artistbanner1/1200/300',
  profileImageUrl: 'https://picsum.photos/seed/artistprofile1/200/200',
  isFollowed: false,
};

const artistTopTracks = [
  { id: 'trackA1', title: 'Nebula Dreams', artist: 'Celestial Echoes', album: 'Cosmic Suite', duration: '5:12', imageUrl: 'https://picsum.photos/seed/trackA1/40/40' },
  { id: 'trackA2', title: 'Stardust Memories', artist: 'Celestial Echoes', album: 'Cosmic Suite', duration: '4:30', imageUrl: 'https://picsum.photos/seed/trackA2/40/40' },
  { id: 'trackA3', title: 'Lunar Tides', artist: 'Celestial Echoes', album: 'Moon Phases', duration: '6:01', imageUrl: 'https://picsum.photos/seed/trackA3/40/40' },
];

const artistAlbums = [
  { id: 'albumX1', title: 'Cosmic Suite', artist: 'Celestial Echoes', imageUrl: 'https://picsum.photos/seed/albumX1/200/200', releaseYear: '2022' },
  { id: 'albumX2', title: 'Moon Phases', artist: 'Celestial Echoes', imageUrl: 'https://picsum.photos/seed/albumX2/200/200', releaseYear: '2020' },
  { id: 'albumX3', title: 'Solar Flares EP', artist: 'Celestial Echoes', imageUrl: 'https://picsum.photos/seed/albumX3/200/200', releaseYear: '2023' },
];

const ArtistDetailPage: React.FC = () => {
  const { artistId } = useParams<{ artistId: string }>();
  console.log('ArtistDetailPage loaded for artistId:', artistId);
  const [isFollowed, setIsFollowed] = React.useState(placeholderArtist.isFollowed);

  // In a real app, fetch artist details based on artistId
  const artist = { ...placeholderArtist, id: artistId || placeholderArtist.id, name: artistId ? `Artist ${artistId}` : placeholderArtist.name };

  const handlePlaySong = (songId: string | number) => console.log('Play song:', songId);
  const handlePlayAlbum = (albumId: string | number) => console.log('Play album:', albumId);
  const handleViewAlbum = (albumId: string | number) => console.log('View album:', albumId);
  const toggleFollow = () => {
    setIsFollowed(!isFollowed);
    console.log(isFollowed ? 'Unfollowed artist:' : 'Followed artist:', artist.id);
  }

  return (
    <div className="flex h-screen bg-neutral-900 text-white overflow-hidden">
      <NavigationMenu className="w-64 flex-shrink-0 shadow-lg" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userName="Demo User" userAvatarUrl="https://github.com/shadcn.png" showSearch={false} />
        <ScrollArea className="flex-1 pb-[100px]">
          {/* Artist Banner Section */}
          <div className="relative h-60 md:h-80 -mx-0">
            <img src={artist.bannerImageUrl} alt={`${artist.name} banner`} className="w-full h-full object-cover opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <span className="text-xs uppercase text-neutral-300">Artist</span>
                <h1 className="text-4xl md:text-6xl font-bold text-white mt-1">{artist.name}</h1>
            </div>
          </div>
          
          <div className="p-6 md:p-8 space-y-8">
            {/* Artist Info & Actions */}
            <section className="flex items-center justify-between">
              <Button 
                onClick={toggleFollow} 
                variant={isFollowed ? "secondary" : "outline"}
                className="border-neutral-500 hover:border-white rounded-full px-5 py-2"
              >
                {isFollowed ? <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> : <UserPlus className="mr-2 h-4 w-4" />}
                {isFollowed ? 'Following' : 'Follow'}
              </Button>
              {/* Other actions like Share, options menu */}
            </section>

            {artist.bio && (
                <section>
                    <h2 className="text-xl font-semibold mb-2 text-white">Biography</h2>
                    <p className="text-neutral-300 text-sm leading-relaxed">{artist.bio}</p>
                </section>
            )}

            {/* Top Tracks Section */}
            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">Top Tracks</h2>
              <div className="space-y-1">
                {artistTopTracks.map((song, index) => (
                  <SongListItem
                    key={song.id}
                    {...song}
                    trackNumber={index + 1}
                    onPlayPause={handlePlaySong}
                  />
                ))}
              </div>
            </section>

            {/* Albums Section */}
            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">Albums</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {artistAlbums.map(album => (
                  <AlbumArtCard
                    key={album.id}
                    {...album}
                    onPlayAlbum={handlePlayAlbum}
                    onViewAlbum={handleViewAlbum}
                  />
                ))}
              </div>
            </section>

            {/* Related Artists Section (Placeholder) */}
            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">Related Artists</h2>
              <p className="text-neutral-400">Related artists would be displayed here.</p>
            </section>
          </div>
        </ScrollArea>
      </div>
      <FooterPlayer 
         onNextTrack={() => console.log("Next Track from Artist Page")}
         onPreviousTrack={() => console.log("Previous Track from Artist Page")}
      />
    </div>
  );
};

export default ArtistDetailPage;