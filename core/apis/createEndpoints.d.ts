import type { EndpointBuilder } from '@reduxjs/toolkit/query';
import type { QueryDefinition, MutationDefinition } from '@reduxjs/toolkit/query';
export declare function createEndpoint<TReq = void, TRes = any>(build: EndpointBuilder<any, any, any>, url: string, method: 'GET', tags?: readonly string[]): QueryDefinition<TReq, any, any, TRes>;
export declare function createEndpoint<TReq = void, TRes = any>(build: EndpointBuilder<any, any, any>, url: string, method: 'POST' | 'PUT' | 'DELETE' | 'PATCH', tags?: readonly string[]): MutationDefinition<TReq, any, any, TRes>;
//# sourceMappingURL=createEndpoints.d.ts.map