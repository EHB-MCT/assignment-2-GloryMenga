import React, { useEffect, useState } from 'react';

/**
 * TimeTracker Component
 *
 * This component tracks the total time a user spends on the website during a session.
 * It continuously updates and saves the accumulated time in session storage.
 * When the user leaves the site, it sends the total time spent to the backend.
 */
const TimeTracker = () => {
  const [sessionId, setSessionId] = useState(null);
  const [accumulatedTime, setAccumulatedTime] = useState(0);

  useEffect(() => {
    // Retrieve or generate a session ID and store it in session storage
    const existingSessionId = sessionStorage.getItem('sessionId');
    if (existingSessionId) {
      setSessionId(existingSessionId);
    } else {
      const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('sessionId', newSessionId);
      setSessionId(newSessionId);
    }

    // Load the accumulated time from session storage or default to 0
    const storedTime = parseInt(sessionStorage.getItem('accumulatedTime')) || 0;
    setAccumulatedTime(storedTime);

    // Retrieve last timestamp, calculate elapsed time since last visit
    const lastTimestamp = parseInt(sessionStorage.getItem('lastTimestamp')) || Date.now();
    const timeElapsedSinceLastTimestamp = Math.floor((Date.now() - lastTimestamp) / 1000);
    const newAccumulatedTime = storedTime + timeElapsedSinceLastTimestamp;
    
    // Update accumulated time and store it in session storage
    setAccumulatedTime(newAccumulatedTime);
    sessionStorage.setItem('accumulatedTime', newAccumulatedTime.toString());
    sessionStorage.setItem('lastTimestamp', Date.now().toString());

    // Interval to update the accumulated time every 30 seconds
    const interval = setInterval(() => {
      setAccumulatedTime(prevTime => {
        const newTime = prevTime + 30;
        sessionStorage.setItem('accumulatedTime', newTime.toString());
        sessionStorage.setItem('lastTimestamp', Date.now().toString());
        console.log(`Total time spent on site: ${newTime} seconds`);
        return newTime;
      });
    }, 30000);

    /**
     * Handles session tracking before the user leaves the page.
     * Uses the `keepalive` option to ensure the request completes.
     */
    const handleUnload = async () => {
      const finalPartialTime = Math.floor((Date.now() - parseInt(sessionStorage.getItem('lastTimestamp'))) / 1000);
      const finalTotalTime = accumulatedTime + finalPartialTime;
      
      try {
        await fetch('http://localhost:5000/api/timeSpent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId: sessionId,
            timeSpent: finalTotalTime,
            visitDate: new Date().toISOString()
          }),
          keepalive: true
        });
      } catch (error) {
        console.error('Error saving time:', error);
      }
    };

    // Add event listener to track time before the user leaves the page
    window.addEventListener('beforeunload', handleUnload);

    // Cleanup function: clear interval and remove event listener when component unmounts
    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [sessionId, accumulatedTime]);

  return null;
};

export default TimeTracker;