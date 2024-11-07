import { User } from '../entities/user.entity'

interface UserRepository {
  findById(id: string): Promise<User | null>
  findAll(): Promise<User[]>
  save(user: User): Promise<void>
}

export class ApiUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    const response = await fetch(`/api/users/${id}`)

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return new User(data)
  }

  async findAll(): Promise<User[]> {
    const response = await fetch('/api/users')
    const data = await response.json()
    return data.map((item: any) => new User(item))
  }

  async save(user: User): Promise<void> {
    const method = user.id ? 'PUT' : 'POST'
    const url = `/api/users${user.id ? `/${user.id}` : ''}`

    await fetch(url, {
      method,
      body: JSON.stringify(user.props),
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
