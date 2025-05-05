import AudioPlayer from './components/AudioPlayer';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Audio Visualizer
        </h1>
        <AudioPlayer />
      </div>
    </main>
  );
} 