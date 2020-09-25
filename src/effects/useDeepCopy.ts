import { getSnapshot } from 'mobx-state-tree';

/**
 * Makes deep copy of provided entity.
 *
 * @type entity MST Tree Node
 */
const useDeepCopy = entity => {
  const snapshot = getSnapshot(entity);

  return JSON.parse(
    JSON.stringify(snapshot)
  );
};

export default useDeepCopy;
