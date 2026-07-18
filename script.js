const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
document.getElementById('year').textContent = new Date().getFullYear();

const nativeVideoObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const video = entry.target;

    if (entry.isIntersecting) {
      video.play().catch(() => {});
      return;
    }

    video.pause();
  });
}, { threshold: 0.12 });

document.querySelectorAll('[data-native-preview]').forEach((video) => {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  nativeVideoObserver.observe(video);
});

window.setupYouTubeSegmentLoop?.('casquette-preview', 30);
