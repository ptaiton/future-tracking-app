export enum Unit {
  G = 'g',
  KG = 'kg',
  ML = 'ml',
  L = 'l',
  UNIT = 'unit',
}

export interface Ingredient {
  id: string
  name: string
  quantity: number
  unit: Unit
}

export interface Step {
  id: string
  stepNumber: number
  description: string
}

export interface Recipe {
  id: string
  name: string
  image: string
  numberOfPersons: number
  ingredients: { [uuid: string]: Ingredient }
  steps: { [uuid: string]: Step }
}