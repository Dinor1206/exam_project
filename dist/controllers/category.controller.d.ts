import type { Request, Response } from "express";
export declare function createCategory(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function listCategories(_req: Request, res: Response): Promise<void>;
export declare function getCategory(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function updateCategory(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function deleteCategory(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=category.controller.d.ts.map