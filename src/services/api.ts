import axios from 'axios'
import mock from './mock'
import { Ingredient, Step, Recipe } from '../types/Recipe'
import { log } from './log'

interface RawRecipe {
  id: string
  name: string
  image: string
  numberOfPersons: number
  ingredients: Ingredient[]
  steps: Step[]
}

const BASE_URL = 'http://localhost:8080'

export const get = <T>(path: string) => {
  log(`Request to ${path}`)
  return axios
    .get<T>(`${BASE_URL}/${path}`)
    .then(response => response.data)
}

export const post = <T>(path: string, payload: any) => {
  log(`Request to ${path}`)
  return axios
    .post<T>(`${BASE_URL}/${path}`, payload)
    .then(response => response.data)
}

export const getRecipes = (): Promise<Recipe[]> => {
  const get = <T>(_: string) => new Promise<RawRecipe[]>((resolve, reject) => setTimeout(() => resolve(mock), 200))

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