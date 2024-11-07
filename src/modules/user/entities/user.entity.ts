interface UserProps {
  id: string
  name: string
  email: string
}

export class User {
  private props: UserProps

  constructor(props: UserProps) {
    this.props = props
  }

  get id(): string {
    return this.props.id
  }

  get name(): string {
    return this.props.name
  }

  get email(): string {
    return this.props.email
  }
}
