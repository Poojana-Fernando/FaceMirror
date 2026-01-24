import type { Mood, Song } from '../store/useAppStore';

const MOCK_DB: Record<Mood, Song[]> = {
    happy: [
        { id: 'h1', title: 'Happy', artist: 'Pharrell Williams', thumbnailUrl: 'https://img.youtube.com/vi/ZbZSe6N_BXs/0.jpg', youtubeUrl: 'https://music.youtube.com/watch?v=ZbZSe6N_BXs' },
        { id: 'h2', title: 'Can\'t Stop the Feeling!', artist: 'Justin Timberlake', thumbnailUrl: 'https://img.youtube.com/vi/ru0K8uYEZWw/0.jpg', youtubeUrl: 'https://music.youtube.com/watch?v=ru0K8uYEZWw' },
        { id: 'h3', title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', thumbnailUrl: 'https://img.youtube.com/vi/OPf0YbXqDm0/0.jpg', youtubeUrl: 'https://music.youtube.com/watch?v=OPf0YbXqDm0' },
    ],
    sad: [
        { id: 's1', title: 'Someone Like You', artist: 'Adele', thumbnailUrl: 'https://img.youtube.com/vi/hLQl3WQQoQ0/0.jpg', youtubeUrl: 'https://music.youtube.com/watch?v=hLQl3WQQoQ0' },
        { id: 's2', title: 'Fix You', artist: 'Coldplay', thumbnailUrl: 'https://img.youtube.com/vi/k4V3Mo61fJM/0.jpg', youtubeUrl: 'https://music.youtube.com/watch?v=k4V3Mo61fJM' },
        { id: 's3', title: 'All of Me', artist: 'John Legend', thumbnailUrl: 'https://img.youtube.com/vi/450p7goxZqg/0.jpg', youtubeUrl: 'https://music.youtube.com/watch?v=450p7goxZqg' },
    ],
    angry: [
        { id: 'a1', title: 'Break Stuff', artist: 'Limp Bizkit', thumbnailUrl: 'https://img.youtube.com/vi/ZpUYjpKg9KY/0.jpg', youtubeUrl: 'https://music.youtube.com/watch?v=ZpUYjpKg9KY' },
        { id: 'a2', title: 'In the End', artist: 'Linkin Park', thumbnailUrl: 'https://img.youtube.com/vi/eVTXPUF4Oz4/0.jpg', youtubeUrl: 'https://music.youtube.com/watch?v=eVTXPUF4Oz4' },
        { id: 'a3', title: 'Killing In The Name', artist: 'Rage Against The Machine', thumbnailUrl: 'https://img.youtube.com/vi/bWXazVhlyxQ/0.jpg', youtubeUrl: 'https://music.youtube.com/watch?v=bWXazVhlyxQ' },
    ],
    calm: [
        { id: 'c1', title: 'Weightless', artist: 'Marconi Union', thumbnailUrl: 'https://img.youtube.com/vi/UfcAVejslrU/0.jpg', youtubeUrl: 'https://music.youtube.com/watch?v=UfcAVejslrU' },
        { id: 'c2', title: 'Clair de Lune', artist: 'Claude Debussy', thumbnailUrl: 'https://img.youtube.com/vi/CvFH_6DNRCY/0.jpg', youtubeUrl: 'https://music.youtube.com/watch?v=CvFH_6DNRCY' },
        { id: 'c3', title: 'River Flows In You', artist: 'Yiruma', thumbnailUrl: 'https://img.youtube.com/vi/7maJOI3QMu0/0.jpg', youtubeUrl: 'https://music.youtube.com/watch?v=7maJOI3QMu0' },
    ],
    stressed: [
        { id: 'str1', title: 'Lo-Fi Beats to Relax/Study', artist: 'Lofi Girl', thumbnailUrl: 'https://img.youtube.com/vi/jfKfPfyJRdk/0.jpg', youtubeUrl: 'https://music.youtube.com/watch?v=jfKfPfyJRdk' },
        { id: 'str2', title: 'Strawberry Fields Forever', artist: 'The Beatles', thumbnailUrl: 'https://img.youtube.com/vi/HtUH9z_Oey8/0.jpg', youtubeUrl: 'https://music.youtube.com/watch?v=HtUH9z_Oey8' },
        { id: 'str3', title: 'Three Little Birds', artist: 'Bob Marley', thumbnailUrl: 'https://img.youtube.com/vi/LanCLS_hIo4/0.jpg', youtubeUrl: 'https://music.youtube.com/watch?v=LanCLS_hIo4' },
    ],
    neutral: [
        { id: 'n1', title: 'Blinding Lights', artist: 'The Weeknd', thumbnailUrl: 'https://img.youtube.com/vi/4NRXx6U8ABQ/0.jpg', youtubeUrl: 'https://music.youtube.com/watch?v=4NRXx6U8ABQ' },
        { id: 'n2', title: 'Levitating', artist: 'Dua Lipa', thumbnailUrl: 'https://img.youtube.com/vi/TUVcZfQe-Kw/0.jpg', youtubeUrl: 'https://music.youtube.com/watch?v=TUVcZfQe-Kw' },
    ],
};

export const fetchSongsForMood = async (mood: Mood): Promise<Song[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_DB[mood] || MOCK_DB.neutral;
};
