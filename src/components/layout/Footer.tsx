import React, { useState, useEffect, useRef } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Maximize2, Heart, ListMusic, Repeat, Shuffle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CurrentTrack {
  id: string;
  title: string;
  artist: string;
  albumArtUrl: string;
  durationSeconds: number; // Total duration in seconds
  audioUrl: string; // URL to the audio file
}

interface FooterPlayerProps {
  initialTrack?: CurrentTrack;
  // Callbacks for player events
  onTrackEnd?: () => void;
  onNextTrack?: () => void;
  onPreviousTrack?: () => void;
}

const FooterPlayer: React.FC<FooterPlayerProps> = ({
  initialTrack,
  onTrackEnd,
  onNextTrack,
  onPreviousTrack
}) => {
  const [currentTrack, setCurrentTrack] = useState<CurrentTrack | null>(initialTrack || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0-100
  const [currentTime, setCurrentTime] = useState(0); // in seconds
  const [volume, setVolume] = useState(50); // 0-100
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false); // Example state
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (initialTrack) {
      setCurrentTrack(initialTrack);
      setProgress(0);
      setCurrentTime(0);
      // If audioUrl changes, update src and potentially play
      if (audioRef.current && initialTrack.audioUrl) {
        audioRef.current.src = initialTrack.audioUrl;
        if (isPlaying) {
           audioRef.current.play().catch(e => console.error("Error playing audio:", e));
        }
      }
    }
  }, [initialTrack]);


  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setCurrentTime(audio.currentTime);
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };
    const handleTrackEnd = () => {
      setIsPlaying(false);
      if (onTrackEnd) onTrackEnd();
      // Implement repeat logic or auto-play next if desired
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleTrackEnd);
    audio.volume = isMuted ? 0 : volume / 100;

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleTrackEnd);
    };
  }, [volume, isMuted, onTrackEnd]);

  const togglePlayPause = () => {
    if (!currentTrack || !audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Error playing audio:", e));
    }
    setIsPlaying(!isPlaying);
    console.log(isPlaying ? "Pausing" : "Playing", currentTrack.title);
  };

  const handleSeek = (newProgress: number[]) => {
    if (!currentTrack || !audioRef.current || !audioRef.current.duration) return;
    const newTime = (newProgress[0] / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress(newProgress[0]);
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume[0]);
    if (audioRef.current) {
      audioRef.current.volume = newVolume[0] / 100;
    }
    setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
        audioRef.current.volume = !isMuted ? 0 : volume / 100;
    }
  };
  
  const formatTime = (seconds: number): string => {
    const flooredSeconds = Math.floor(seconds);
    const min = Math.floor(flooredSeconds / 60);
    const sec = flooredSeconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  console.log("Rendering FooterPlayer. Current track:", currentTrack?.title);

  // Dummy track for UI rendering if no initialTrack
  const displayTrack = currentTrack || {
    id: '0', title: 'No Song Playing', artist: 'Select a song', albumArtUrl: '/placeholder.svg', durationSeconds: 0, audioUrl: ''
  };

  return (
    <footer className="bg-neutral-900 text-white border-t border-neutral-700 p-3 fixed bottom-0 left-0 right-0 z-50 h-[90px] flex items-center justify-between">
      <audio ref={audioRef} />
      {/* Left: Track Info */}
      <div className="flex items-center space-x-3 w-1/4 min-w-[200px]">
        {displayTrack.albumArtUrl && (
          <AspectRatio ratio={1/1} className="w-14 h-14 rounded overflow-hidden">
            <img src={displayTrack.albumArtUrl} alt={displayTrack.title} className="w-full h-full object-cover" />
          </AspectRatio>
        )}
        <div>
          <p className="text-sm font-medium truncate">{displayTrack.title}</p>
          <p className="text-xs text-neutral-400 truncate">{displayTrack.artist}</p>
        </div>
        <Button variant="ghost" size="icon" className={cn("ml-2 h-8 w-8 text-neutral-400 hover:text-white", isLiked && "text-green-500 hover:text-green-400")} onClick={() => setIsLiked(!isLiked)}>
            <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
        </Button>
      </div>

      {/* Center: Player Controls & Progress */}
      <div className="flex flex-col items-center flex-grow max-w-2xl mx-4">
        <div className="flex items-center space-x-2 mb-1">
          <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white h-8 w-8" onClick={() => setIsShuffle(!isShuffle)}>
            <Shuffle className={cn("h-4 w-4", isShuffle && "text-green-500")} />
          </Button>
          <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white h-8 w-8" onClick={onPreviousTrack}>
            <SkipBack className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-white text-black hover:bg-neutral-200 rounded-full h-9 w-9 mx-1"
            onClick={togglePlayPause}
            disabled={!currentTrack}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-current" />}
          </Button>
          <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white h-8 w-8" onClick={onNextTrack}>
            <SkipForward className="h-5 w-5" />
          </Button>
           <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white h-8 w-8" onClick={() => setIsRepeat(!isRepeat)}>
            <Repeat className={cn("h-4 w-4", isRepeat && "text-green-500")} />
          </Button>
        </div>
        <div className="flex items-center w-full space-x-2">
          <span className="text-xs text-neutral-400 w-10 text-right">{formatTime(currentTime)}</span>
          <Slider
            defaultValue={[0]}
            value={[progress]}
            max={100}
            step={1}
            onValueChange={handleSeek}
            className="flex-grow [&>span:first-child]:h-1 [&>span:first-child>span]:bg-green-500"
            disabled={!currentTrack || !currentTrack.durationSeconds}
          />
          <span className="text-xs text-neutral-400 w-10 text-left">{formatTime(currentTrack?.durationSeconds || 0)}</span>
        </div>
      </div>

      {/* Right: Volume & Other Controls */}
      <div className="flex items-center space-x-2 w-1/4 justify-end min-w-[150px]">
        <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white h-8 w-8">
            <ListMusic className="h-4 w-4" /> {/* Queue */}
        </Button>
        <Button variant="ghost" size="icon" onClick={toggleMute} className="text-neutral-400 hover:text-white h-8 w-8">
          {isMuted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </Button>
        <Slider
          defaultValue={[50]}
          value={[isMuted ? 0 : volume]}
          max={100}
          step={1}
          onValueChange={handleVolumeChange}
          className="w-24 [&>span:first-child]:h-1 [&>span:first-child>span]:bg-white"
        />
         <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white h-8 w-8">
            <Maximize2 className="h-4 w-4" /> {/* Fullscreen / Lyrics? */}
        </Button>
      </div>
    </footer>
  );
};

export default FooterPlayer;