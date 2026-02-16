document.addEventListener("DOMContentLoaded", () => {
  const galleryGrid = document.getElementById("galleryGrid");

  if (!galleryGrid) {
    return;
  }

  const galleryDir = "./images/gallery/";
  const imageExt = /\.(avif|bmp|gif|jpe?g|png|svg|webp)$/i;
  const githubGalleryApi =
    "https://api.github.com/repos/BondoDev/bakashvili_site/contents/images/gallery?ref=main";

  const formatCaption = (filename) => {
    const withoutExt = filename.replace(/\.[^.]+$/, "");
    return withoutExt.replace(/[-_]+/g, " ").trim();
  };

  const renderImages = (imageUrls) => {
    galleryGrid.innerHTML = "";

    imageUrls.forEach((imageUrl, index) => {
      const imageName = decodeURIComponent(imageUrl.split("/").pop() || "Winery photo");
      const caption = formatCaption(imageName);

      const itemLink = document.createElement("a");
      itemLink.className = "gallery-item";
      itemLink.href = imageUrl;
      itemLink.target = "_blank";
      itemLink.rel = "noopener noreferrer";

      const img = document.createElement("img");
      img.src = imageUrl;
      img.alt = caption || `Bakashvili winery photo ${index + 1}`;
      img.loading = "lazy";

      itemLink.appendChild(img);
      galleryGrid.appendChild(itemLink);
    });
  };

  const getTimestampFromName = (url) => {
    const name = decodeURIComponent(url.split("/").pop() || "");

    // Matches patterns like: 2026-02-15 or 2026_02_15
    const dateMatch = name.match(/(20\d{2})[-_. ](\d{1,2})[-_. ](\d{1,2})/);
    if (!dateMatch) {
      return 0;
    }

    const year = Number(dateMatch[1]);
    const month = Number(dateMatch[2]);
    const day = Number(dateMatch[3]);
    const parsed = new Date(year, month - 1, day).getTime();
    return Number.isNaN(parsed) ? 0 : parsed;
  };

  const getImageTimestamp = async (url) => {
    try {
      const headResponse = await fetch(url, { method: "HEAD", cache: "no-store" });
      const lastModified = headResponse.headers.get("last-modified");

      if (lastModified) {
        const parsed = Date.parse(lastModified);
        if (!Number.isNaN(parsed)) {
          return parsed;
        }
      }
    } catch (error) {
      // Ignore HEAD failures and use filename fallback.
    }

    return getTimestampFromName(url);
  };

  const getImageUrlsFromDirectoryListing = async () => {
    const response = await fetch(galleryDir, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Could not open ${galleryDir}`);
    }

    const directoryHtml = await response.text();
    const parser = new DOMParser();
    const directoryDoc = parser.parseFromString(directoryHtml, "text/html");
    const baseUrl = new URL(galleryDir, window.location.href);

    return [...directoryDoc.querySelectorAll("a")]
      .map((link) => link.getAttribute("href") || "")
      .map((href) => href.split("?")[0].split("#")[0])
      .filter((href) => imageExt.test(href))
      .map((href) => new URL(href, baseUrl).href)
      .filter((url, index, all) => all.indexOf(url) === index);
  };

  const getImageUrlsFromGitHubApi = async () => {
    const response = await fetch(githubGalleryApi, { cache: "no-store" });

    if (!response.ok) {
      throw new Error("Could not read gallery from GitHub API");
    }

    const entries = await response.json();
    if (!Array.isArray(entries)) {
      return [];
    }

    return entries
      .filter((entry) => entry && entry.type === "file" && imageExt.test(entry.name || ""))
      .map((entry) => entry.download_url || entry.html_url || "")
      .filter(Boolean);
  };

  const loadGallery = async () => {
    try {
      let imageUrls = [];

      try {
        imageUrls = await getImageUrlsFromDirectoryListing();
      } catch (directoryError) {
        imageUrls = await getImageUrlsFromGitHubApi();
      }

      if (!imageUrls.length) {
        return;
      }

      const imagesWithMeta = await Promise.all(
        imageUrls.map(async (url, index) => ({
          url,
          index,
          timestamp: await getImageTimestamp(url),
        }))
      );

      imagesWithMeta.sort((a, b) => {
        if (b.timestamp !== a.timestamp) {
          return b.timestamp - a.timestamp;
        }
        // If timestamps are equal/missing, keep newest discovered first.
        return b.index - a.index;
      });

      renderImages(imagesWithMeta.map((item) => item.url));
    } catch (error) {
      // Keep page quiet if directory listing is unavailable.
    }
  };

  loadGallery();
});
