import { Router } from "express";

export default interface RouterPattern {
    router: Router;
    setUpRoutes(): void;
    getRouter(): Router;
}