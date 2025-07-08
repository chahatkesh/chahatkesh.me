import { GalleryItem } from "~/components/gallery";

// Importing a static image for the gallery item
import item1 from "~/assets/images/gallery/image.png";

export const galleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "Startup Mahakumbh, Delhi",
    date: "April 4, 2025",
    image: item1,
    aspectRatio: "big-square",
    priority: true,
  },
];
