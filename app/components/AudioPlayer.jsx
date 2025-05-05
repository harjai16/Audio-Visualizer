'use client';

import { useEffect, useRef, useState } from 'react';

const AudioPlayer = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);

  useEffect(() => {
    // Initialize audio context
    const initAudio = async () => {
      try {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 2048; // Increased for better visualization
        analyserRef.current.smoothingTimeConstant = 0.8;
      } catch (error) {
        console.error('Error initializing audio context:', error);
      }
    };

    initAudio();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioFile(url);
      
      // Reset audio context when new file is loaded
      if (audioContextRef.current && audioRef.current) {
        if (sourceRef.current) {
          sourceRef.current.disconnect();
        }
        setupAudio();
      }
    }
  };

  const togglePlay = async () => {
    if (!audioRef.current || !audioContextRef.current) return;

    try {
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      if (isPlaying) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
        visualize();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const visualize = () => {
    if (!canvasRef.current || !analyserRef.current) return;

    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext('2d');
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);

      analyserRef.current.getByteTimeDomainData(dataArray);

      canvasCtx.fillStyle = 'rgb(20, 20, 20)';
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = 'rgb(0, 255, 0)';
      canvasCtx.beginPath();

      const sliceWidth = canvas.width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * canvas.height / 2;

        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(canvas.width, canvas.height / 2);
      canvasCtx.stroke();
    };

    draw();
  };

  const setupAudio = () => {
    if (!audioRef.current || !audioContextRef.current) return;

    try {
      // Create new source
      sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
      
      // Connect the nodes
      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.connect(audioContextRef.current.destination);
    } catch (error) {
      console.error('Error setting up audio:', error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-gray-800 rounded-lg">
      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="text-white"
      />
      
      {audioFile && (
        <>
          <audio
            ref={audioRef}
            src={audioFile}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onMouseEnter={() => setIsPlaying(true)}
            onLoadedMetadata={setupAudio}
            // controls
            className="w-full max-w-md"
          />
          
          <button
            onClick={togglePlay}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>

          <canvas
            ref={canvasRef}
            width={800}
            height={200}
            className="w-full max-w-3xl bg-gray-900 rounded"
          />
        </>
      )}
    </div>
  );
};

export default AudioPlayer; 