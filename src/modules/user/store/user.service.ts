import type { User } from '../entities/user.entity'
import { ApiUserRepository } from './../repositories/user.repository'

export class UserService {
  constructor(private userRepository: ApiUserRepository) {}

  async getUser(id: string): Promise<User | null> {
    return this.userRepository.findById(id)
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.findAll()
  }

  async saveUser(user: User): Promise<void> {
    await this.userRepository.save(user)
  }
}
