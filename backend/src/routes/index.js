import { Router } from "express";

const indexRouter = Router();

const routes = [
  {
    path: "/auth",
    route: (await import("./AuthRoutes/index.js")).default,
  },
  {
    path: "/settings",
    route: (await import("./Settings/index.js")).default,
  },
  // {
  //     path:'/campaings',
  //     route:(await import("./Langgraphs/index.js")).default
  // }
];

routes.forEach((cur_route) => {
  indexRouter.use(cur_route.path, cur_route.route);
});

export default indexRouter;
