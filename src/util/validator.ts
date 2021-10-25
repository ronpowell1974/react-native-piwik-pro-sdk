function validateInt(value: number) {
  if (!Number.isInteger(value)) {
    throw new Error('Parameter must be an integer number');
  }
}

function validateCustomDimensions(customDimensions?: CustomDimensions) {
  if (!customDimensions) {
    return;
  }

  Object.entries(customDimensions).forEach(([key, _]) => {
    const dimensionId = parseInt(key, 10);
    if (key !== dimensionId.toString()) {
      throw new Error('Dimension ID must be an integer');
    }

    if (dimensionId < 1) {
      throw new Error('Dimension ID must be an integer greater than 0');
    }
  });
}

export { validateInt, validateCustomDimensions };
