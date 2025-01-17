import { Request, Response } from 'express';
import { User } from './userModel';
import { UserService } from './model-manager';

export async function createUser(req: Request, res: Response) {
  const user: User = req.body;
  const result = UserService.createUser(user);

  if ('error' in result) {
    res.status(400).json({ message: result.error });
  } else {
    res.status(201).json(result);
  }
}

