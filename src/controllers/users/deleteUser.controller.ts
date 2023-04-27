import { Request, Response } from "express";
import deleteUserService from "../../services/users/deleteUser.service";

const deleteUserController = async (req: Request, res: Response) => {
  try {
    const loggedUserId = req.user.id;

    const userId = String(req.params.id);

    if (loggedUserId !== userId) {
      throw new Error("You do not have permission to delete this user.");
    }

    await deleteUserService(userId);

    res.status(204).send();
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

export default deleteUserController;
