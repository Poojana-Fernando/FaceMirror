import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import type { Mood } from "../store/useAppStore";

export class FaceAnalysisService {
    private faceLandmarker: FaceLandmarker | null = null;
    private lastVideoTime = -1;
    private moodHistory: Mood[] = [];
    private readonly HISTORY_SIZE = 10; // Number of frames to smooth over

    async initialize() {
        const filesetResolver = await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
        );
        this.faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
            baseOptions: {
                modelAssetPath: "/models/face_landmarker.task",
                delegate: "GPU"
            },
            outputFaceBlendshapes: true,
            outputFacialTransformationMatrixes: false,
            runningMode: "VIDEO",
            numFaces: 1
        });
    }

    detect(video: HTMLVideoElement): Mood | null {
        if (!this.faceLandmarker) return null;

        // Only detect if video has new frame
        if (video.currentTime === this.lastVideoTime) return null;
        this.lastVideoTime = video.currentTime;

        const startTimeMs = performance.now();
        const result = this.faceLandmarker.detectForVideo(video, startTimeMs);

        if (result.faceBlendshapes && result.faceBlendshapes.length > 0 && result.faceBlendshapes[0].categories) {
            return this.analyzeMood(result.faceBlendshapes[0].categories);
        }
        return null;
    }

    private analyzeMood(blendshapes: any[]): Mood {
        // Helper to find score
        const getScore = (name: string) => blendshapes.find(s => s.categoryName === name)?.score || 0;

        const smile = (getScore('mouthSmileLeft') + getScore('mouthSmileRight')) / 2;
        const frown = (getScore('mouthFrownLeft') + getScore('mouthFrownRight')) / 2;
        const browDown = (getScore('browDownLeft') + getScore('browDownRight')) / 2;
        const browInnerUp = getScore('browInnerUp');
        const eyeWide = (getScore('eyeWideLeft') + getScore('eyeWideRight')) / 2;

        // Simple Heuristics
        let detected: Mood = 'neutral';
        let maxScore = 0;

        // Happy
        if (smile > 0.4 && smile > maxScore) {
            detected = 'happy';
            maxScore = smile;
        }

        // Sad
        const sadScore = (frown + browInnerUp) / 2;
        if (sadScore > 0.3 && sadScore > maxScore) {
            detected = 'sad';
            maxScore = sadScore;
        }

        // Angry
        if (browDown > 0.4 && browDown > maxScore) {
            detected = 'angry';
            maxScore = browDown;
        }

        // Stressed (Simulated by high eye wideness + brow tension)
        const stressScore = (eyeWide + browInnerUp) / 2;
        if (stressScore > 0.4 && stressScore > maxScore) {
            detected = 'stressed';
            maxScore = stressScore;
        }

        // Calm (Low activity)
        const activity = smile + frown + browDown + browInnerUp + eyeWide;
        if (activity < 0.2 && maxScore < 0.2) {
            detected = 'calm';
        } else if (detected === 'neutral' && activity > 0.2) {
            // Fallback if generic movement but not strong emotion
            detected = 'neutral';
        }

        return this.smoothMood(detected);
    }

    private smoothMood(current: Mood): Mood {
        this.moodHistory.push(current);
        if (this.moodHistory.length > this.HISTORY_SIZE) {
            this.moodHistory.shift();
        }

        // Return the most frequent mood in history
        const counts: Record<string, number> = {};
        let maxCount = 0;
        let dominant = current;

        for (const m of this.moodHistory) {
            counts[m] = (counts[m] || 0) + 1;
            if (counts[m] > maxCount) {
                maxCount = counts[m];
                dominant = m;
            }
        }

        return dominant;
    }
}

export const faceAnalysisService = new FaceAnalysisService();
