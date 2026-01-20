
export interface Ingredient {
  item: string;
  amount: string;
}

export interface Recipe {
  name: string;
  description: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  ingredients: Ingredient[];
  instructions: string[];
  chefTips: string[];
  /* Updated to support the artistic spiciness levels used in the recipes data */
  spicinessLevel: 'Murmure' | 'Éclat' | 'Passion' | 'Fournaise Dorée';
}

export interface AppState {
  recipe: Recipe | null;
  imageUrl: string | null;
  loading: boolean;
  error: string | null;
}
