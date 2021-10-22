function validateInt(value: number) {
  if (!Number.isInteger(value)) {
    throw new Error('Parameter must be an integer number');
  }
}

export { validateInt };
