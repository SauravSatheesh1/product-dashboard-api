import * as jwt from 'jsonwebtoken'
import { User } from '../../core/entities/User'

export class JwtService {
    private readonly secret: string

    constructor() {
        this.secret = process.env.JWT_SECRET || 'your-secret-key'
    }

    generateToken(user: User): string {
        return jwt.sign({ userId: user.id, email: user.email }, this.secret, { expiresIn: '1h' })
    }

    verifyToken(token: string): any {
        return jwt.verify(token, this.secret)
    }
}
