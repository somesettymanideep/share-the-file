import manjunatha from "@/assets/sea-project-manjunatha-constructions.jpg.asset.json";
import sarika from "@/assets/sea-project-sarika-estate.jpg.asset.json";
import ramko from "@/assets/sea-project-ramko-heights.jpg.asset.json";
import krishnaSindhura from "@/assets/sea-project-krishna-sindhura-hospital.jpg.asset.json";
import gangadhar from "@/assets/sea-project-gangadhar-estate.jpg.asset.json";
import kishoreJain from "@/assets/sea-project-kishore-jain-kms-infra.jpg.asset.json";

export interface SeaProject {
  title: string;
  description: string;
  image: string;
  alt: string;
}

export const SEA_PROJECTS: SeaProject[] = [
  {
    title: "Manjunatha Constructions",
    description:
      "A four-level residence wrapped in colour-blocked perforated screens and climbing vines that filter light and cool the interiors.",
    image: manjunatha.url,
    alt: "Manjunatha Constructions residence with colour-blocked perforated screens",
  },
  {
    title: "Sarika Estate",
    description:
      "A gated villa community beside the highway, anchored by a tiled-roof convention centre, a parking court and a landscaped entry.",
    image: sarika.url,
    alt: "Sarika Estate gated villa community with tiled-roof convention centre",
  },
  {
    title: "Ramko Heights",
    description:
      "A stilt-parking apartment tower with dark framed bays, glazed balconies, warm timber soffits and an illuminated vertical signature.",
    image: ramko.url,
    alt: "Ramko Heights apartment tower with glazed balconies",
  },
  {
    title: "Krishna Sindhura Hospital",
    description:
      "A multi-block healthcare campus joined by a glazed atrium and a sky-garden podium, planned around a clear, calm arrival.",
    image: krishnaSindhura.url,
    alt: "Krishna Sindhura Hospital campus with glazed atrium",
  },
  {
    title: "Gangadhar Estate",
    description:
      "A slender tower whose sculpted slab edges sweep across the façade, glowing warm against the evening sky.",
    image: gangadhar.url,
    alt: "Gangadhar Estate tower with sculpted slab edges at dusk",
  },
  {
    title: "Kishore Jain KMS Infra",
    description:
      "Stepped residential terraces with continuous planted balconies that give every home a green edge.",
    image: kishoreJain.url,
    alt: "Kishore Jain KMS Infra stepped terraces with planted balconies",
  },
];
