import { useState, useEffect } from 'react';

export const AnimateClock = () => {
  const [isStopped, setIsStopped] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsStopped(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  if (isStopped) {
    return null;
  }

  return (
    <div>
      <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13.8327 8.83333C13.8327 12.0533 11.2193 14.6667 7.99935 14.6667C4.77935 14.6667 2.16602 12.0533 2.16602 8.83333C2.16602 5.61333 4.77935 3 7.99935 3C11.2193 3 13.8327 5.61333 13.8327 8.83333Z"
          stroke="#FD1B51"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          className={isStopped ? 'stopped-hand' : 'rotating-hand'}
          d="M8 5.33398V8.66732"
          stroke={isStopped ? '#FF0000' : '#FD1B51'}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path d="M6 1.33398H10" stroke="#FD1B51" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" />
      </svg>
    </div>
  );
};
