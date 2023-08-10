import { UnauthorizedError } from "@/errors";

const checkPermissions = (requestUser: IUser, resourceUserId: string) => {
  if (requestUser.role === "admin") return;
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new UnauthorizedError("Not authorized to access this route");
};

export default checkPermissions;
