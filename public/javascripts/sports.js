function switchVid(element)
{
    let iframe = document.getElementById("yt-frame");
    let id_frame = iframe.src.substring(iframe.src.lastIndexOf("/")+1);
    iframe.src = "https://www.youtube.com/embed/" + element.alt;
    element.alt = id_frame;
    element.src = "https://i.ytimg.com/vi/" + id_frame + "/default.jpg";
}