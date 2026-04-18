export const extractContent = async ({ type, url }) => {
  if (type === "youtube") {
    return `YouTube video: ${url}`
  }

  if (type === "article") {
    return `Article: ${url}`
  }

  if (type === "tweet") {
    return `Tweet: ${url}`
  }

  if (type === "pdf") {
    return `PDF: ${url}`
  }

  if (type === "image") {
    return `Image: ${url}`
  }

  return url
}
