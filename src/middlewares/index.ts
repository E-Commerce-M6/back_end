import ensureDataIsValidMiddleware from "./ensureDataIsValid.middleware";
import ensurePosterExistsMiddleware from "./ensurePosterExists.middleware";
import ensureEmailOrCpfNotUsedMiddleware from "./ensureEmailAndCpfNotUsed.middeware";
import ensureUserExistsMiddleware from "./ensureUserExists.middleware";
import ensureAuthMiddleware from "./ensureAuth.middleware";
import ensureIsSellerMiddleware from "./ensureIsSeller.middleware";
import ensurePostOwnerMiddleware from "./ensurePostOwner.middleware";

export {
  ensureDataIsValidMiddleware,
  ensurePosterExistsMiddleware,
  ensureEmailOrCpfNotUsedMiddleware,
  ensureAuthMiddleware,
  ensureIsSellerMiddleware,
  ensureUserExistsMiddleware,
  ensurePostOwnerMiddleware,
};
