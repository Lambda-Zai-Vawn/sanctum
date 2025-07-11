
"use client";

import { useState, useEffect, useRef } from 'react';

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

type UseVoiceTranscriptionProps = {
  onTranscriptionEnd: (text: string) => void;
};

export const useVoiceTranscription = ({ onTranscriptionEnd }: UseVoiceTranscriptionProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcript, setTranscript] = useState('');
  
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check for browser support
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
      setTranscript(''); // Clear previous transcript
    };

    recognition.onend = () => {
      setIsListening(false);
      // isTranscribing will be set by the stop() function
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      setIsTranscribing(false);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript) {
        setTranscript(prev => prev + finalTranscript);
      }
    };

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const start = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
    }
  };

  const stop = () => {
    if (recognitionRef.current && isListening) {
        setIsTranscribing(true); // Indicate that we are processing the result
        recognitionRef.current.stop();
        // The onend event will fire, setting isListening to false.
        // After a short delay, we process the final transcript.
        setTimeout(() => {
            setTranscript(currentTranscript => {
                if (currentTranscript.trim()) {
                    onTranscriptionEnd(currentTranscript.trim());
                }
                return currentTranscript; // Keep the transcript in state for display
            });
            setIsTranscribing(false);
        }, 1000); // Delay to ensure all final results are processed
    }
  };

  return { isListening, isTranscribing, transcript, start, stop };
};
