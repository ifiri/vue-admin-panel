import useConfig from './useConfig';

/**
 * Returns routes from routes repository
 */
const useRoutes = () => {
  const resolveRouteComponentFor = route => {
    if (!route.component) {
      throw new Error('Provided route haven\'t any components');
    }

    // @todo возможно, переместить путь ко вьюхам в конфиг.
    // с другой стороны, это та часть архитектуры, что нечасто меняется.
    // нужно протестировать динамический путь совместно с [request]
    return () => import(
      /* webpackChunkName: "[request]" */ `@/views/${route.component}.vue`
    );
  };

  const configRoutes = useConfig('system.routing.routes');

  if (configRoutes) {
    const routes = [] as any;

    for (const routeIndex in configRoutes) {
      const routeData = configRoutes[routeIndex];

      routes.push({
        ...routeData,

        component: resolveRouteComponentFor(routeData),
      });
    }

    return routes;
  }

  throw new Error('Config haven\'t any routes');
};

export default useRoutes;
