import dotty from 'dotty';

/**
 * Writes provided value in some object with resolving dot-separated paths
 * For example, `foo.bar` will be resolved correctly, and provided value
 * will be added into `object.foo.bar` property
 *
 * @type values object
 */
const useDeepPut = (target: object, property: string, value: any) => {
  return dotty.put(this.changes, property, value);
};

export default useDeepPut;
