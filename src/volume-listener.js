const PERCENTAGE = 0.2;
let prevVolume = undefined;

async function bootstrap() {
  const mainVideo = document.querySelectorAll("#song-video video")[0];

  if (!mainVideo) {
    await new Promise((res) => setTimeout(res, 2000));
    bootstrap();
    return;
  }

  mainVideo.volume = mainVideo.volume * PERCENTAGE;

  mainVideo.addEventListener("volumechange", onVolumeChange, false);
  mainVideo.addEventListener("onplay", onVolumeChange, false);

  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === "attributes") {
        onVolumeChange({ currentTarget: mutation.target });
      }
    });
  });

  observer.observe(mainVideo, {
    attributes: true,
  });
}

function onVolumeChange(e) {
  const video = e.currentTarget;

  if (prevVolume * PERCENTAGE === video.volume) {
    return;
  }

  prevVolume = video.volume;
  video.volume = video.volume * PERCENTAGE;
}

bootstrap();
