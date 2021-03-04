import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';

class UserController {

  async create(req: Request, res: Response) {
    const { first_name, last_name, email, password_hash } = req.body

    const userRepository = getCustomRepository(UserRepository);

    const userAlreadyExists = await userRepository.findOne({
      email
    });

    if (userAlreadyExists) {
      return res.status(400).json({
        error: "User already exists!"
      })
    }

    const user = userRepository.create({
      first_name, last_name, email, password_hash
    })

    try {
      await userRepository.save(user);
      return res.json(user);
    } catch (error) {
      return res.status(400).json({ erro: error })
    }
  }

  async show(req: Request, res: Response) {
    const userRepository = getCustomRepository(UserRepository);

    const all = await userRepository.find();

    return res.status(200).json(all);
  }

  async put(req: Request, res: Response) {
    const { id } = req.params
    const { first_name, last_name } = req.body

    const userRepository = getCustomRepository(UserRepository);

    try {
      const userUpdated = await userRepository.update(
        { id },
        { first_name, last_name }
      )
      return res.status(200).json(userUpdated)
    } catch (error) {
      return res.status(300).json({ error: "Can not update user" })
    }

  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    const userRepository = getCustomRepository(UserRepository);

    const userExists = await userRepository.findOne({ id })

    if (!userExists) {
      return res.status(300).json({ error: 'User not exist' })
    }

    const deletedUser = await userRepository.delete({ id })

    return res.status(200).json({ success: 'Successful deleted user' })
  }

}

export { UserController };
