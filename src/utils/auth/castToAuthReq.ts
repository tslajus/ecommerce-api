import { Request } from "express";

function castToAutReq(req: Request): AuthenticatedRequest {
  return req as unknown as AuthenticatedRequest;
}
export default castToAutReq;
