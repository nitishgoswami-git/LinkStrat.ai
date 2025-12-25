import { Router } from "express";

const indexRouter = Router();

const routes = [
    {
        path: '/auth/linkedin',
        route: (await import("./LinkedInAuth/index.js")).default
    },
    {
        path:'/auth/google',
        route:(await import("./GoogleAuth/index.js")).default
    }

]

routes.forEach((cur_route) => {
    indexRouter.use(cur_route.path, cur_route.route)
})

export default indexRouter

