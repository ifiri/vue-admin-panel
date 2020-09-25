/**
 * Gets properties of model and parse it recursively for all nested models
 * as well. Returns object with all properties and default values (empty strings)
 * for every of them.
 *
 * May be useful with forms, when empty field if no values provided is correct default.
 *
 * @type model types.model
 */
const useModelProps = model => {
  if (!model.properties) {
    throw new Error('Provided entity haven\'t any properties');
  }

  const props = {};

  for (const propName in model.properties) {
    const propValue = model.properties[propName];

    // Duck typing for check is current prop another model or not
    if (propValue && propValue.properties) {
      props[propName] = useModelProps(propValue);
    }

    props[propName] = props[propName] || '';
  }

  return props;
};

export default useModelProps;
