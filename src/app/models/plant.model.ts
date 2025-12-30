export interface Plant {
  id: number;
  common_name: string;
  scientific_name: string;
  family: string;
  image_url: string;

  // Opcionales
  year?: number;
  author?: string;
  status?: string;
  rank?: string;
  bibliography?: string;
  genus?: string;
  synonyms?: string[];
}
