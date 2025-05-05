'use client';

import LiveAudioPlayer from './LiveAudioPlayer';

const Navbar = () => {
  return (
    <>
      <nav className="bg-gray-900 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-xl font-bold">Audio Visualizer</div>
          <div className="flex items-center space-x-4">
            <a href="/" className="hover:text-blue-400 transition-colors">Home</a>
            <a href="/about" className="hover:text-blue-400 transition-colors">About</a>
          </div>
        </div>
      </nav>
      {/* <LiveAudioPlayer /> */}
    </>
  );
};

export default Navbar; 