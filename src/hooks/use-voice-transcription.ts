
"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

// Define the shape of the speech recognition event
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

// Extend the Window interface to include webkitSpeechRecognition
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

/**
 * @typedef VoiceTranscriptionResult
 * @property {boolean} isListening - Whether the recognition service is currently active.
 * @property {string} transcript - The real-time transcribed text from the microphone.
 * @property {() => void} start - Function to start the voice transcription.
 * @property {() => void} stop - Function to manually stop the voice transcription.
 */

/**
 * A custom hook for real-time voice transcription using the Web Speech API.
 * It provides the listening state, the live transcript, and controls to start/stop transcription.
 *
 * @returns {VoiceTranscriptionResult} An object with transcription state and controls.
 */
export const useVoiceTranscription = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  
  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('Speech Recognition API is not supported in this browser.');
      return;
    }
    
    recognitionRef.current = new SpeechRecognition();
    const recognition = recognitionRef.current;
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = '';
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            const transcriptPiece = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcriptPiece;
            } else {
                interimTranscript += transcriptPiece;
            }
        }
        
        // Use the interim transcript for live updates
        setTranscript(current => (current.substring(0, current.length - interimTranscript.length) + finalTranscript + interimTranscript).trim());
        
        // Debounce the stop action
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            if (isListening) {
                stop();
            }
        }, 2000); // Stop after 2 seconds of silence
    };

    return () => {
      if (recognition) {
        recognition.stop();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Starts the speech recognition service.
   * Resets the transcript and begins listening for input.
   */
  const start = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript('');
      recognitionRef.current.start();
    }
  };

  /**
   * Manually stops the speech recognition service.
   */
  const stop = () => {
    if (recognitionRef.current && isListening) {
        recognitionRef.current.stop();
    }
  };

  return { isListening, transcript, start, stop };
};
