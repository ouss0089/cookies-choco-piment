
import { Recipe } from "../types";

export const signatureRecipes: Record<string, Recipe> = {
  kyoto: {
    name: "L'Ombre du Shogun",
    description: "Une rencontre mystique entre l'amertume du thé Matcha de cérémonie, la douceur du chocolat blanc et l'éclat volcanique du wasabi frais.",
    prepTime: "25 min",
    cookTime: "12 min",
    servings: 1,
    spicinessLevel: "Éclat",
    ingredients: [
      { item: "Beurre noisette infusé au Matcha", amount: "20g" },
      { item: "Chocolat blanc de couverture 35%", amount: "30g" },
      { item: "Sucre de canne blond", amount: "15g" },
      { item: "Farine de blé fine", amount: "40g" },
      { item: "Poudre de wasabi pur", amount: "1 pincée" },
      { item: "Éclats de graines de sésame noir", amount: "5g" }
    ],
    instructions: [
      "Crémer le beurre au Matcha avec le sucre jusqu'à obtenir une texture soyeuse.",
      "Incorporer délicatement la farine et la pointe de wasabi pour ne pas briser les arômes.",
      "Ajouter les pépites de chocolat blanc comme des perles de rosée.",
      "Former un disque parfait et parsemer de sésame noir avant une cuisson précise à 170°C."
    ],
    chefTips: [
      "Le wasabi doit être un murmure en fin de bouche, pas un cri.",
      "Laissez reposer la pâte 2h au froid pour cristalliser les saveurs du thé."
    ]
  },
  oaxaca: {
    name: "Le Souffle du Serpent à Plumes",
    description: "Un hommage aux racines du cacao. Chocolat noir 80%, cannelle de Ceylan et la chaleur fumée du piment Chipotle.",
    prepTime: "20 min",
    cookTime: "10 min",
    servings: 1,
    spicinessLevel: "Passion",
    ingredients: [
      { item: "Cacao pur d'origine Oaxaca", amount: "25g" },
      { item: "Piment Chipotle fumé", amount: "2g" },
      { item: "Sucre Muscovado", amount: "20g" },
      { item: "Fleur de sel", amount: "1 pincée" },
      { item: "Cannelle de Ceylan", amount: "1g" },
      { item: "Farine de maïs violet (optionnel)", amount: "35g" }
    ],
    instructions: [
      "Fondre le cacao à basse température pour préserver son caractère sauvage.",
      "Mélanger aux épices sèches : le piment doit colorer le sucre de ses notes fumées.",
      "Créer une pâte dense et obscure, presque tellurique.",
      "Cuire brièvement pour garder un cœur fondant comme de la lave."
    ],
    chefTips: [
      "Accompagnez d'un café noir corsé pour amplifier les notes fumées du Chipotle."
    ]
  },
  mumbai: {
    name: "L'Or des Indes",
    description: "Une étoffe de saveurs où le safran du Cachemire danse avec la cardamome verte sur un lit de pistaches torréfiées.",
    prepTime: "30 min",
    cookTime: "11 min",
    servings: 1,
    spicinessLevel: "Murmure",
    ingredients: [
      { item: "Pistaches d'Iran concassées", amount: "15g" },
      { item: "Pistils de safran", amount: "3" },
      { item: "Cardamome verte moulue", amount: "1g" },
      { item: "Miel d'acacia", amount: "10g" },
      { item: "Beurre de baratte", amount: "20g" },
      { item: "Farine de riz", amount: "30g" }
    ],
    instructions: [
      "Infuser le safran dans le beurre tiède jusqu'à ce qu'il devienne ambre.",
      "Mélanger au miel et à la farine de riz pour une texture sablée unique.",
      "Ajouter les pistaches pour le croquant, tel un tapis précieux.",
      "Cuire jusqu'à ce que les bords soient délicatement dorés."
    ],
    chefTips: [
      "Torréfiez vos pistaches à sec avant l'incorporation pour libérer leurs huiles."
    ]
  },
  paris: {
    name: "Le Baiser de la Bastille",
    description: "L'élégance parisienne : un chocolat au lait onctueux relevé par la force de caractère du piment d'Espelette AOP.",
    prepTime: "15 min",
    cookTime: "10 min",
    servings: 1,
    spicinessLevel: "Éclat",
    ingredients: [
      { item: "Chocolat au lait 40%", amount: "30g" },
      { item: "Piment d'Espelette AOP", amount: "3g" },
      { item: "Fleur de sel de Guérande", amount: "1g" },
      { item: "Beurre demi-sel", amount: "25g" },
      { item: "Sucre glace", amount: "15g" },
      { item: "Farine T45", amount: "45g" }
    ],
    instructions: [
      "Travailler le beurre demi-sel en pommade avec le sucre glace.",
      "Tamiser la farine avec le piment d'Espelette pour une répartition parfaite.",
      "Incorporer de larges pépites de chocolat au lait.",
      "Laisser la fleur de sel en surface pour un choc minéral à chaque bouchée."
    ],
    chefTips: [
      "Utilisez impérativement du piment AOP pour garantir le goût fruité typique."
    ]
  },
  marrakech: {
    name: "La Caravane de l'Atlas",
    description: "Un voyage dans les souks : dattes Medjool charnues, mélasse de grenade et un soupçon de harissa douce pour l'aventure.",
    prepTime: "35 min",
    cookTime: "13 min",
    servings: 1,
    spicinessLevel: "Murmure",
    ingredients: [
      { item: "Dattes Medjool hachées", amount: "20g" },
      { item: "Harissa douce artisanale", amount: "1/2 c.c." },
      { item: "Écorce d'orange confite", amount: "5g" },
      { item: "Amandes effilées", amount: "10g" },
      { item: "Sucre roux", amount: "15g" },
      { item: "Farine d'épeautre", amount: "40g" }
    ],
    instructions: [
      "Mélanger la harissa douce au sucre roux pour une base épicée et caramélisée.",
      "Ajouter les dattes qui apporteront une texture moelleuse et sucrée.",
      "Parfumer avec les écorces d'orange pour la fraîcheur.",
      "Décorer d'amandes effilées avant d'enfourner."
    ],
    chefTips: [
      "La harissa douce doit apporter une note fruitée, presque florale, sans brûler."
    ]
  },
  venise: {
    name: "Le Masque de Minuit",
    description: "Mystérieux et sombre. Un espresso serré mélangé à un cacao intense, piqué par le feu des petits piments Peperoncino.",
    prepTime: "20 min",
    cookTime: "9 min",
    servings: 1,
    spicinessLevel: "Passion",
    ingredients: [
      { item: "Café espresso lyophilisé", amount: "5g" },
      { item: "Cacao noir 90%", amount: "25g" },
      { item: "Peperoncino concassé", amount: "1g" },
      { item: "Liqueur d'Amaretto", amount: "1 trait" },
      { item: "Sucre de coco", amount: "20g" },
      { item: "Noisettes du Piémont", amount: "15g" }
    ],
    instructions: [
      "Dissoudre le café dans l'Amaretto pour une base aromatique puissante.",
      "Combiner au cacao et au sucre de coco.",
      "Ajouter le Peperoncino avec parcimonie : son feu doit être soudain.",
      "Inclure les noisettes entières pour le contraste des textures."
    ],
    chefTips: [
      "Cuisson très courte recommandée pour un aspect 'fudgy' irrésistible."
    ]
  },
  bangkok: {
    name: "La Perle du Siam",
    description: "L'équilibre thaïlandais : lait de coco soyeux, gingembre frais râpé et la force tranquille du piment oiseau.",
    prepTime: "25 min",
    cookTime: "11 min",
    servings: 1,
    spicinessLevel: "Fournaise Dorée",
    ingredients: [
      { item: "Lait de coco déshydraté", amount: "10g" },
      { item: "Gingembre frais râpé", amount: "5g" },
      { item: "Piment oiseau émincé", amount: "1/4" },
      { item: "Zeste de citronnelle", amount: "1g" },
      { item: "Farine de coco", amount: "20g" },
      { item: "Chocolat noir 70%", amount: "20g" }
    ],
    instructions: [
      "Mélanger la noix de coco et la citronnelle pour une base tropicale.",
      "Ajouter le gingembre et le piment oiseau pour une attaque vive.",
      "Lier avec les copeaux de chocolat noir.",
      "Former des petites sphères avant cuisson."
    ],
    chefTips: [
      "Retirez bien les graines du piment oiseau si vous craignez la chaleur excessive."
    ]
  },
  rio: {
    name: "Le Rythme de l'Amazonie",
    description: "Une explosion de vitalité. Fève tonka, noix du Brésil et le piment Malagueta pour une samba des papilles.",
    prepTime: "20 min",
    cookTime: "12 min",
    servings: 1,
    spicinessLevel: "Passion",
    ingredients: [
      { item: "Noix du Brésil", amount: "15g" },
      { item: "Fève tonka râpée", amount: "1/4" },
      { item: "Piment Malagueta en poudre", amount: "1g" },
      { item: "Sucre de canne complet", amount: "20g" },
      { item: "Beurre de cacao", amount: "15g" },
      { item: "Farine de manioc (fine)", amount: "30g" }
    ],
    instructions: [
      "Sabler la farine avec le beurre de cacao infusé à la Tonka.",
      "Intégrer le piment Malagueta pour sa chaleur persistante.",
      "Ajouter les noix du Brésil pour un croquant généreux.",
      "Cuire jusqu'à obtenir une couleur ambrée."
    ],
    chefTips: [
      "La tonka a des notes de vanille et d'amande amère qui adoucissent le piment."
    ]
  },
  budapest: {
    name: "La Rhapsodie Hongroise",
    description: "La noblesse du Paprika fumé de Szeged s'allie à un chocolat noir profond pour une partition audacieuse.",
    prepTime: "15 min",
    cookTime: "10 min",
    servings: 1,
    spicinessLevel: "Éclat",
    ingredients: [
      { item: "Paprika de Szeged fumé", amount: "4g" },
      { item: "Chocolat noir 85%", amount: "30g" },
      { item: "Noix de Grenoble", amount: "10g" },
      { item: "Mélange d'épices douces", amount: "1g" },
      { item: "Beurre clarifié", amount: "20g" },
      { item: "Farine de seigle", amount: "35g" }
    ],
    instructions: [
      "Mélanger le paprika fumé au beurre clarifié pour exalter ses pigments.",
      "Incorporer à la farine de seigle pour un goût rustique.",
      "Ajouter le chocolat noir et les noix.",
      "Façonner des cookies épais pour garder l'humidité."
    ],
    chefTips: [
      "Le paprika fumé apporte une note de cuir qui s'accorde divinement au cacao."
    ]
  },
  stockholm: {
    name: "L'Aurore Boréale",
    description: "Un contraste nordique : réglisse salée (Salmiakki) et sel marin sur un cookie au chocolat au lait velouté.",
    prepTime: "30 min",
    cookTime: "12 min",
    servings: 1,
    spicinessLevel: "Murmure",
    ingredients: [
      { item: "Réglisse salée concassée", amount: "10g" },
      { item: "Chocolat au lait caramel", amount: "25g" },
      { item: "Sel de mer fumé", amount: "1g" },
      { item: "Farine d'avoine", amount: "40g" },
      { item: "Sucre perlé", amount: "5g" },
      { item: "Beurre doux", amount: "20g" }
    ],
    instructions: [
      "Créer une pâte à base d'avoine et de beurre doux.",
      "Inclure les morceaux de réglisse salée : ils vont fondre légèrement.",
      "Ajouter les pépites de chocolat au caramel.",
      "Terminer par une pluie de sel fumé avant cuisson."
    ],
    chefTips: [
      "C'est une recette pour les amateurs de sensations umami et salées."
    ]
  }
};
