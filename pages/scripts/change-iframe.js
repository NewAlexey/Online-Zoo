const zooCameras = document.querySelector(".zoo_cameras");
zooCameras.addEventListener("click", changeiFrameVideo);

function changeiFrameVideo(e) {
  if (e && e.target && e.target.lastElementChild && e.target.lastElementChild.firstElementChild) {
    const iframe = e.target.lastElementChild.firstElementChild;
    const iframeUrl = iframe.src;
    const mainiFrame = document.querySelector(".iframe");
    const mainiFrameUrl = mainiFrame.src;
    iframe.src = mainiFrameUrl;
    mainiFrame.src = iframeUrl;
  } else return;
}
