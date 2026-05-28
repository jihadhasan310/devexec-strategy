import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Devexec Strategy",
    short_name: "Devexec",
    description:
      "AI systems, cloud architectures, blockchain protocols, and SaaS platforms — engineered for scale.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0C10",
    theme_color: "#0A0C10",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
