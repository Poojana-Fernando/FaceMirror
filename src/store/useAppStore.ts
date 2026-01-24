import { create } from 'zustand';

export type Mood = 'neutral' | 'happy' | 'sad' | 'angry' | 'calm' | 'stressed';

export interface Song {
    id: string;
    title: string;
    artist: string;
    thumbnailUrl: string;
    youtubeUrl: string;
}

interface AppState {
    mood: Mood;
    setMood: (mood: Mood) => void;
    isCamGranted: boolean;
    setCamGranted: (status: boolean) => void;
    playlist: Song[];
    setPlaylist: (songs: Song[]) => void;
    isProcessing: boolean;
    setIsProcessing: (status: boolean) => void;
    isCameraOn: boolean;
    setCameraOn: (status: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
    mood: 'neutral',
    setMood: (mood) => set({ mood }),
    isCamGranted: false,
    setCamGranted: (status) => set({ isCamGranted: status }),
    playlist: [],
    setPlaylist: (songs) => set({ playlist: songs }),
    isProcessing: true,
    setIsProcessing: (status) => set({ isProcessing: status }),
    isCameraOn: true,
    setCameraOn: (status: boolean) => set({ isCameraOn: status }),
}));
