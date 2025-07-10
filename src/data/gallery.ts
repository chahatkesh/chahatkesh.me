import { GalleryItem } from "~/components/gallery";

const unsortedGalleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "Utkansh 2025",
    location: "NITJ",
    date: "April 13, 2025",
    aspectRatio: "portrait",
  },
  {
    id: "2",
    title: "Startup Mahakumbh",
    location: "Delhi",
    date: "April 4, 2025",
    aspectRatio: "big-square",
  },
  {
    id: "3",
    title: "Winter Fest GDGC",
    location: "NITJ",
    date: "February 05, 2024",
    aspectRatio: "portrait",
  },
  {
    id: "4",
    title: "20th Birthday",
    location: "Prayagraj",
    date: "November 05, 2024",
    aspectRatio: "big-square",
  },
  {
    id: "5",
    title: "Junior's Fresher",
    location: "NITJ",
    date: "October 21, 2024",
    aspectRatio: "portrait",
  },
  {
    id: "6",
    title: "Omaxe Mall",
    location: "Delhi",
    date: "August 15, 2024",
    aspectRatio: "big-square",
  },
  {
    id: "7",
    title: "Maa Vaishno Devi",
    location: "Katra",
    date: "June 26, 2025",
    aspectRatio: "big-square",
  },
];

// Sort gallery items by date in descending order (newest first)
export const galleryItems: GalleryItem[] = unsortedGalleryItems.sort((a, b) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  return dateB.getTime() - dateA.getTime();
});
