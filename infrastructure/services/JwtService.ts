import * as jwt from 'jsonwebtoken'
import { User } from '../../core/entities/User'
import { config } from '../../config/config'

export class JwtService {
    private readonly secret: string

    constructor() {
        this.secret = config.jwtSecret || 'your-secret-key'
    }

    generateToken(user: User): string {
        return jwt.sign({ userId: user.id, email: user.email }, this.secret, { expiresIn: '1h' })
    }

    verifyToken(token: string): any {
        return jwt.verify(token, this.secret)
    }
}
