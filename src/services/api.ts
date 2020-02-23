import { get, post } from '../utils/request'
import { Ingredient, Step, Recipe } from '../types/Recipe'

interface RawRecipe {
  id: string
  name: string
  image: string
  numberOfPersons: number
  ingredients: Ingredient[]
  steps: Step[]
}

export const getRecipes = (): Promise<Recipe[]> => {
  return get<RawRecipe[]>('recipes')
    .then(recipes => recipes.map(recipe => {
      const ingredients = recipe.ingredients.reduce((ingredients, ingredient) => ({
        ...ingredients,
        [ingredient.id]: ingredient
      }), {})

      const steps = recipe.steps.reduce((steps, step) => ({
        ...steps,
        [step.id]: step
      }), {})

      return { ...recipe, ingredients, steps }
    }))
}

export const generateCookbook = (recipeIds: string[], title: string) => {
  return post<Blob>('cookbook', { title, recipeIds }, {
    responseType: 'blob'
  }).then((pdf) => {
    const fileURL = URL.createObjectURL(pdf);
    window.open(fileURL);
  })
}