(() => {
  let apiPromise;

  const loadYouTubeApi = () => {
    if (window.YT?.Player) return Promise.resolve(window.YT);
    if (apiPromise) return apiPromise;

    apiPromise = new Promise((resolve) => {
      const previousReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previousReady?.();
        resolve(window.YT);
      };

      const apiScript = document.createElement('script');
      apiScript.src = 'https://www.youtube.com/iframe_api';
      apiScript.async = true;
      document.head.append(apiScript);
    });

    return apiPromise;
  };

  window.setupYouTubeSegmentLoop = (frameId, duration) => {
    const frame = document.getElementById(frameId);
    if (!frame || !/^https?:$/.test(window.location.protocol)) return;

    const playerUrl = new URL(frame.src);
    playerUrl.searchParams.set('enablejsapi', '1');
    playerUrl.searchParams.set('origin', window.location.origin);
    playerUrl.searchParams.set('start', '0');
    playerUrl.searchParams.set('end', String(duration));

    frame.addEventListener('load', () => {
      loadYouTubeApi().then((YT) => {
        let player;
        let loopTimer;

        const clearLoop = () => window.clearTimeout(loopTimer);
        const scheduleLoop = () => {
          clearLoop();
          loopTimer = window.setTimeout(() => {
            player.seekTo(0, true);
            player.playVideo();
            scheduleLoop();
          }, Math.max(1000, duration * 1000 - 75));
        };

        player = new YT.Player(frameId, {
          events: {
            onReady: (event) => {
              event.target.mute();
              event.target.playVideo();
            },
            onStateChange: (event) => {
              if (event.data === YT.PlayerState.PLAYING) scheduleLoop();
              if (event.data === YT.PlayerState.PAUSED) clearLoop();
              if (event.data === YT.PlayerState.ENDED) {
                player.seekTo(0, true);
                player.playVideo();
                scheduleLoop();
              }
            },
          },
        });
      });
    }, { once: true });

    frame.src = playerUrl.toString();
  };
})();
