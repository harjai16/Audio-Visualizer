import AudioPlayer from './components/AudioPlayer';
import LiveAudioPlayer from './components/LiveAudioPlayer';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Audio Visualizer
        </h1>
        <AudioPlayer />
      </div>
   <div className="mt-[50px]" >  <LiveAudioPlayer /></div>
    </main>
     
  );
} 