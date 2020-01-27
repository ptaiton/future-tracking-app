import { Recipe, Ingredient } from '../types/Recipe'

export const convertIngredientsQuantity = (numberOfPersons: number, recipe: Recipe): Ingredient[] => {
  return Object.values(recipe.ingredients).map(ingredient => ({
    ...ingredient,
    quantity: Math.round(ingredient.quantity / recipe.numberOfPersons * numberOfPersons * 10) / 10
  }))
}