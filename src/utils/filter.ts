export const notEmpty = <T>(element: T | null | undefined): element is T => {
  return element !== null && element !== undefined
}