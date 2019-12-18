export interface Ingredient {
  id: string
  name: string
  quantity: number
  unit: 'g' | 'kg' | 'ml' | 'l' | 'unit'
}

export interface Step {
  id: string
  description: string
}

export interface Recipe {
  id: string
  name: string
  numberOfPersons: number
}