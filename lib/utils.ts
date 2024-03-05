import { type ClassValue, clsx } from "clsx";
import { ref } from "firebase/storage";
import { twMerge } from "tailwind-merge";
import { storage } from "./firebase";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomFilename() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomFilename = "";
  const length = 10; // Adjust the length of the filename as needed

  for (let i = 0; i < length; i++) {
    randomFilename += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return randomFilename;
}

// get firebase storage ref
export function getStorageRefFromDownloadURL(downloadURL: string) {
  try {
    // Get a reference to the file by its download URL
    const storageRef = ref(storage, downloadURL);
    return storageRef;
  } catch (error) {
    console.error("Error creating storage reference from download URL:", error);
    return null;
  }
}
