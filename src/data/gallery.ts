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
    isFeatured: true,
  },
  {
    id: "3",
    title: "Winter Fest GDGC",
    location: "NITJ",
    date: "February 05, 2025",
    aspectRatio: "portrait",
    isFeatured: true,
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
    aspectRatio: "landscape",
  },
  {
    id: "7",
    title: "Maa Vaishno Devi",
    location: "Katra",
    date: "June 26, 2025",
    aspectRatio: "big-square",
  },
  {
    id: "8",
    title: "Annam Ai Office",
    location: "IIT Ropar",
    date: "June 23, 2025",
    aspectRatio: "landscape",
  },
  {
    id: "9",
    title: "Curo Mall",
    location: "Jalandhar City",
    date: "June 07, 2025",
    aspectRatio: "landscape",
  },
  {
    id: "10",
    title: "MBD Mall",
    location: "Jalandhar City",
    date: "June 18, 2025",
    aspectRatio: "square",
  },
  {
    id: "11",
    title: "Haveli",
    location: "Jalandhar City",
    date: "June 07, 2025",
    aspectRatio: "portrait",
  },
  {
    id: "12",
    title: "ISKCON",
    location: "Chandigarh",
    date: "June 23, 2025",
    aspectRatio: "portrait",
    isFeatured: true,
  },
  {
    id: "13",
    title: "B Plan Competition",
    location: "NITJ",
    date: "April 30, 2025",
    aspectRatio: "portrait",
    isFeatured: true,
  },
  {
    id: "14",
    title: "Exam Prep",
    location: "4th Semester",
    date: "June 01, 2025",
    aspectRatio: "portrait",
  },
  {
    id: "15",
    title: "Agri-Tech Event",
    location: "Startup Mahakumbh",
    date: "April 05, 2025",
    aspectRatio: "portrait",
  },
  {
    id: "16",
    title: "Team Apogee",
    location: "Space Club NITJ",
    date: "August 23, 2024",
    aspectRatio: "big-square",
    isFeatured: true,
  },
  {
    id: "17",
    title: "Ideathon",
    location: "Organized by IOTA",
    date: "September 01, 2024",
    aspectRatio: "big-square",
  },
  {
    id: "18",
    title: "Theatre",
    location: "PVR Jalandhar",
    date: "September 15, 2024",
    aspectRatio: "portrait",
  },
  {
    id: "19",
    title: "Work Mode",
    location: "LSM Hackathon",
    date: "January 19, 2025",
    aspectRatio: "square",
  },
];

// Sort gallery items by date in descending order (newest first)
export const galleryItems: GalleryItem[] = unsortedGalleryItems.sort((a, b) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  return dateB.getTime() - dateA.getTime();
});
