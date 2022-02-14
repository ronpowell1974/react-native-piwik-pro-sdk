function validateInt(value: number) {
  if (!Number.isInteger(value)) {
    throw new Error('Parameter must be an integer number');
  }
}

function validateCustomKeyValue(
  customKeyValue?: CustomDimensions | CustomVariables
) {
  if (!customKeyValue) {
    return;
  }

  Object.entries(customKeyValue).forEach(([key, _]) => {
    const id = parseInt(key, 10);
    if (key !== id.toString()) {
      throw new Error('ID (key) must be an integer');
    }

    if (id < 1) {
      throw new Error('ID (key) must be an integer greater than 0');
    }
  });
}

function validateVisitorId(visitorId: string) {
  if (!/^[0-9a-f]{16}$/.test(visitorId)) {
    throw new Error(
      `Visitor ID ${visitorId} has invalid format. The format must match the regular expression: ^[0-9a-f]{16}$`
    );
  }
}

export { validateInt, validateCustomKeyValue, validateVisitorId };
