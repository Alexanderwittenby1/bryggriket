import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: "xv6e9c1o",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

// Image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  if (!source) return null;
  console.log("Generating URL for source:", source);
  return builder.image(source);
}