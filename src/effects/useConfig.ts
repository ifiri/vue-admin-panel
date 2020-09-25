import dotty from 'dotty';
import config from '@/config';

/**
 * Returns entire config object or specific param from config,
 * if `paramPath` provided and param by provided path is exists.
 * If param or config cannot be found or path is incorrect,
 * exception will be thrown.
 *
 * @type mixed
 */
const useConfig = (paramPath?: string) => {
  // If config exists
  if (config && Object.keys(config)) {
    if (!Object.isFrozen(config)) {
      throw new Error('Config is non-frozen and possibly unsafe.');
    }

    // And if param path provided - search for specific param
    if (paramPath) {
      const param = dotty.get(config, paramPath);

      if (param) {
        return param;
      }

      throw new Error('Provided path incorrect or param not found');
    }

    // No param path provided - return entire config object
    return config;
  }

  throw new Error('Config not found or empty');
};

export default useConfig;
