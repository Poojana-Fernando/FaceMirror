import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { fetchSongsForMood } from '../services/musicService';
import { Play, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SongList: React.FC = () => {
    const { mood, playlist, setPlaylist } = useAppStore();

    useEffect(() => {
        let mounted = true;
        const loadSongs = async () => {
            const songs = await fetchSongsForMood(mood);
            if (mounted) setPlaylist(songs);
        };
        loadSongs();
        return () => { mounted = false; };
    }, [mood, setPlaylist]);

    const getGradient = (m: string) => {
        switch (m) {
            case 'happy': return 'from-yellow-400/20 to-orange-500/20';
            case 'sad': return 'from-blue-600/20 to-cyan-500/20';
            case 'angry': return 'from-red-600/20 to-orange-700/20';
            case 'calm': return 'from-green-400/20 to-emerald-600/20';
            case 'stressed': return 'from-purple-600/20 to-pink-600/20';
            default: return 'from-gray-700/20 to-gray-900/20';
        }
    };

    return (
        <div className="flex flex-col h-full bg-dark-800 p-6 rounded-2xl border border-gray-800 relative overflow-hidden">
            {/* Dynamic Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(mood)} transition-colors duration-1000 opacity-50`} />

            <div className="relative z-10 flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Your Vibe</h2>
                    <p className="text-gray-400 text-sm">AI curated playlist for <span className="text-white font-medium capitalize">{mood}</span> mood</p>
                </div>
                <div className="p-3 bg-white/5 rounded-full backdrop-blur-sm border border-white/10">
                    <Music className="w-6 h-6 text-brand-accent transform rotate-12" />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2 relative z-10 custom-scrollbar">
                <AnimatePresence mode="wait">
                    {playlist.map((song, index) => (
                        <motion.div
                            key={song.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ delay: index * 0.1 }}
                            className="group flex items-center gap-4 bg-black/40 hover:bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/5 hover:border-brand-accent/50 transition-all cursor-pointer"
                            onClick={() => window.open(song.youtubeUrl, '_blank')}
                        >
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                                <img src={song.thumbnailUrl} alt={song.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                                    <Play className="w-6 h-6 text-white opacity-80 group-hover:scale-125 transition-transform" fill="currentColor" />
                                </div>
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="text-white font-semibold truncate group-hover:text-brand-accent transition-colors">{song.title}</h3>
                                <p className="text-gray-400 text-sm truncate">{song.artist}</p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {playlist.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-48 text-gray-500 gap-2">
                        <p>Listening to your heartbeat...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SongList;
