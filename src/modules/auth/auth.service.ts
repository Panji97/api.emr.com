import { model } from '../../models'
import { usersAttributes } from '../../models/users'

export class AuthenticationService {
  async register(payload: usersAttributes) {
    const [instance] = await model.users.upsert({
      email: payload.email,
      password: payload.password
    })

    return instance
  }
}
