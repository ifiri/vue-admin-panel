/**
 * Catch provided values and led it through sanitize flow
 *
 * @type values object
 */
const useSanitize = (values: object) => {
  const entries = Object.entries(values);

  const sanitized = entries.map(change => {
    const key = change[0];
    const value = change[1];

    if (value) {
      switch (key) {
        default:
          // ~
          break;
      }

      return change;
    }

    return null;
  });

  return Object.fromEntries(sanitized);
};

export default useSanitize;
