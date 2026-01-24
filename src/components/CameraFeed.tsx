import { useEffect, useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { useAppStore } from '../store/useAppStore';
import { faceAnalysisService } from '../services/faceAnalysis';
import { Camera, RefreshCw, CameraOff } from 'lucide-react';
import clsx from 'clsx';

const CameraFeed: React.FC = () => {
    const webcamRef = useRef<Webcam>(null);
    const { setMood, setCamGranted, setIsProcessing, mood, isCameraOn, setCameraOn } = useAppStore();
    const [modelLoaded, setModelLoaded] = useState(false);
    const requestRef = useRef<number | null>(null);

    useEffect(() => {
        const loadModel = async () => {
            try {
                await faceAnalysisService.initialize();
                setModelLoaded(true);
                setIsProcessing(false);
            } catch (error) {
                console.error("Failed to load face model", error);
                setIsProcessing(false);
            }
        };
        loadModel();
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [setIsProcessing]);

    const detect = useCallback(() => {
        if (!isCameraOn) return;

        if (
            webcamRef.current &&
            webcamRef.current.video &&
            webcamRef.current.video.readyState === 4 &&
            modelLoaded
        ) {
            const video = webcamRef.current.video;
            const detectedMood = faceAnalysisService.detect(video);
            if (detectedMood) {
                setMood(detectedMood);
            }
        }
        requestRef.current = requestAnimationFrame(detect);
    }, [modelLoaded, setMood, isCameraOn]);

    useEffect(() => {
        if (modelLoaded && isCameraOn) {
            requestRef.current = requestAnimationFrame(detect);
        }
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [detect, modelLoaded, isCameraOn]);

    const handleUserMedia = () => {
        setCamGranted(true);
    };

    const handleUserMediaError = () => {
        setCamGranted(false);
        alert('Camera access denied. Please enable camera permission.');
        setCameraOn(false);
    };

    const getMoodColor = (m: string) => {
        switch (m) {
            case 'happy': return 'text-yellow-400 border-yellow-400';
            case 'sad': return 'text-blue-400 border-blue-400';
            case 'angry': return 'text-red-500 border-red-500';
            case 'calm': return 'text-green-400 border-green-400';
            case 'stressed': return 'text-orange-500 border-orange-500';
            default: return 'text-gray-400 border-gray-400';
        }
    };

    const toggleCamera = () => {
        setCameraOn(!isCameraOn);
        // If turning off, reset mood to neutral
        if (isCameraOn) {
            setMood('neutral');
        }
    };

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center bg-black overflow-hidden rounded-2xl border border-gray-800 shadow-2xl group">
            {!modelLoaded && isCameraOn && (
                <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/80 text-white">
                    <div className="flex flex-col items-center gap-2">
                        <RefreshCw className="animate-spin w-8 h-8 text-brand-accent" />
                        <p>Loading AI Model...</p>
                    </div>
                </div>
            )}

            {isCameraOn ? (
                <Webcam
                    ref={webcamRef}
                    audio={false}
                    mirrored={true}
                    onUserMedia={handleUserMedia}
                    onUserMediaError={handleUserMediaError}
                    className="w-full h-full object-cover"
                    videoConstraints={{
                        facingMode: 'user',
                        width: 1280,
                        height: 720
                    }}
                />
            ) : (
                <div className="flex flex-col items-center gap-4 text-gray-400">
                    <div className="w-20 h-20 rounded-full bg-gray-900 flex items-center justify-center border border-gray-800">
                        <CameraOff className="w-8 h-8 text-gray-600" />
                    </div>
                    <p className="text-sm font-medium">Camera is turned off</p>
                    <button
                        onClick={toggleCamera}
                        className="px-6 py-2 bg-brand-accent text-white rounded-full font-medium text-sm hover:bg-brand-accent/90 transition-colors"
                    >
                        Turn On Camera
                    </button>
                </div>
            )}

            {/* Controls Overlay */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex items-center gap-4">
                {/* Mood Indicator (Only visible if Camera is On) */}
                {isCameraOn && (
                    <div className={clsx("glass-panel px-6 py-2 rounded-full border border-white/10 backdrop-blur-md bg-black/40 flex items-center gap-2 font-bold uppercase tracking-widest transition-colors duration-500", getMoodColor(mood))}>
                        <Camera className="w-5 h-5" />
                        <span>{mood}</span>
                    </div>
                )}

                {/* Camera Toggle Button */}
                <button
                    onClick={toggleCamera}
                    className="p-3 rounded-full glass-panel border border-white/10 bg-black/40 text-white hover:bg-white/10 transition-colors backdrop-blur-md"
                    title={isCameraOn ? "Turn Camera Off" : "Turn Camera On"}
                >
                    {isCameraOn ? <CameraOff className="w-5 h-5" /> : <Camera className="w-5 h-5" />}
                </button>
            </div>


            {/* Privacy Indicator */}
            {isCameraOn && (
                <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-black/50 backdrop-blur px-3 py-1 rounded-full text-xs text-gray-400 border border-white/5">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span>Secure & Private • On-device Processing</span>
                </div>
            )}
        </div>
    );
};

export default CameraFeed;
