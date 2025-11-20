import type { Request, Response } from "express";
export declare function createProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function listProducts(req: Request, res: Response): Promise<void>;
export declare function bestSelling(_req: Request, res: Response): Promise<void>;
export declare function getProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function updateProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function deleteProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=product.controller.d.ts.map