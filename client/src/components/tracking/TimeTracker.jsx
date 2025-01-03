import React, { useEffect, useState } from 'react';

const TimeTracker = () => {
  const [sessionId, setSessionId] = useState(null);
  const [accumulatedTime, setAccumulatedTime] = useState(0);

  useEffect(() => {
    const existingSessionId = sessionStorage.getItem('sessionId');
    if (existingSessionId) {
      setSessionId(existingSessionId);
    } else {
      const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('sessionId', newSessionId);
      setSessionId(newSessionId);
    }

    const storedTime = parseInt(sessionStorage.getItem('accumulatedTime')) || 0;
    setAccumulatedTime(storedTime);

    const lastTimestamp = parseInt(sessionStorage.getItem('lastTimestamp')) || Date.now();
    
    const timeElapsedSinceLastTimestamp = Math.floor((Date.now() - lastTimestamp) / 1000);
    const newAccumulatedTime = storedTime + timeElapsedSinceLastTimestamp;
    
    setAccumulatedTime(newAccumulatedTime);
    sessionStorage.setItem('accumulatedTime', newAccumulatedTime.toString());
    sessionStorage.setItem('lastTimestamp', Date.now().toString());

    const interval = setInterval(() => {
      setAccumulatedTime(prevTime => {
        const newTime = prevTime + 30;
        sessionStorage.setItem('accumulatedTime', newTime.toString());
        sessionStorage.setItem('lastTimestamp', Date.now().toString());
        console.log(`Total time spent on site: ${newTime} seconds`);
        return newTime;
      });
    }, 30000);

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

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [sessionId, accumulatedTime]);

  return null;
};

export default TimeTracker;