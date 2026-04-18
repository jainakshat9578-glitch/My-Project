export function detectType(item) {

  // file upload detect
  if(item.file){
    if(item.file.type.startsWith("image")) return "image";
    if(item.file.type.startsWith("video")) return "video";
  }

  const text = `${item.title || ""} ${item.url || ""} ${item.content || ""}`
    .toLowerCase()
    .trim();

  // video
  if (
    text.includes("youtube.com") ||
    text.includes("youtu.be") ||
    text.includes("vimeo.com")
  ) {
    return "video";
  }

  // image
  if (/\.(jpg|jpeg|png|gif|webp)/.test(text)) {
    return "image";
  }

  // url
  if (text.includes("http://") || text.includes("https://")) {
    return "url";
  }

  return "text";
}


