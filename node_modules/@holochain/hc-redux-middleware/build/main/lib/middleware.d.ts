import { Middleware, AnyAction } from 'redux';
export declare const holochainMiddleware: (hcWc: Promise<{
    call: (callStr: string) => (params: any) => Promise<string>;
    close: () => Promise<any>;
    ws: any;
}>) => Middleware<{}, any, import("redux").Dispatch<AnyAction>>;
