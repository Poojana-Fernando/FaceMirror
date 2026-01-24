// React import removed for JSX transform
import CameraFeed from './components/CameraFeed';
import SongList from './components/SongList';
import { Github, Linkedin } from 'lucide-react';


/* 
 * Main Application Layout
 */
function App() {
  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 flex flex-col gap-6">
      <header className="flex items-center justify-between pb-2 border-b border-white/10">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-accent to-brand-secondary">
            MoodMirror
          </h1>
          <p className="text-gray-500 text-xs tracking-wider uppercase mt-1">Real-time AI Emotion Music Mapper</p>
        </div>

        {/* Optional decorative element */}
        <div className="flex gap-2 text-xs text-gray-600">
          <span className="px-2 py-1 rounded bg-dark-800 border border-dark-700">v1.0.0</span>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-140px)]">
        {/* Left Panel: Camera */}
        <div className="w-full h-full min-h-[400px]">
          <CameraFeed />
        </div>

        {/* Right Panel: Songs */}
        <div className="w-full h-full min-h-[400px]">
          <SongList />
        </div>
      </main>


      <footer className="py-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <div>
          Created by <span className="text-white font-medium">Poojana Fernando</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/poojana-fernando-0b1282378"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-accent transition-colors flex items-center gap-2"
          >
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://github.com/Poojana-Fernando"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-2"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>
        </div>
      </footer>
    </div >
  );
}

export default App;
