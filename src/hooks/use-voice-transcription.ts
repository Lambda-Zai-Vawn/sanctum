
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

type UseVoiceTranscriptionProps = {
  onTranscriptionEnd: (text: string) => void;
};

export const useVoiceTranscription = ({ onTranscriptionEnd }: UseVoiceTranscriptionProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcript, setTranscript] = useState('');
  
  const recognitionRef = useRef<any>(null);
  const finalTranscriptRef = useRef('');

  const processFinalTranscript = useCallback(() => {
    const finalTranscript = finalTranscriptRef.current.trim();
    if (finalTranscript) {
      onTranscriptionEnd(finalTranscript);
    }
    finalTranscriptRef.current = '';
    setIsTranscribing(false);
  }, [onTranscriptionEnd]);


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
      setTranscript('');
      finalTranscriptRef.current = '';
    };

    recognition.onend = () => {
      setIsListening(false);
      processFinalTranscript();
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      setIsTranscribing(false);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscriptRef.current += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      setTranscript(finalTranscriptRef.current + interimTranscript);
    };

    return () => {
      if (recognition) {
        recognition.onend = null; // Prevent onend from firing on unmount
        recognition.stop();
      }
    };
  }, [processFinalTranscript]);

  const start = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
    }
  };

  const stop = () => {
    if (recognitionRef.current && isListening) {
        setIsTranscribing(true); // Indicate that we are processing the result
        recognitionRef.current.stop();
        // The onend event will now handle the final transcript processing.
    }
  };

  return { isListening, isTranscribing, transcript, start, stop };
};
