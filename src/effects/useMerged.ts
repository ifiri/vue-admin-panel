/**
 * Merges provided object with it's default.
 *
 * @type entity object
 * @type default object
 */
const useMerged = (current: object, defaults: object) => {
  const merged = {
    ...current,
  };

  for (const fieldName in defaults) {
    const fieldValue = defaults[fieldName];

    if (!merged[fieldName]) {
      merged[fieldName] = fieldValue;
    }
  }

  return merged;
};

export default useMerged;
