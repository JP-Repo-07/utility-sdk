// jwt-manager.ts
import { sign, verify, SignOptions } from "jsonwebtoken";

export class JWTManager {

  private secret: string;
  private options: SignOptions

  constructor(secret?: string, options?: SignOptions) {
    if (!secret) {
      throw new Error("Missing secret key!")
    }
    this.secret = secret;
    this.options = options || {}
  }

  // decodes the payload from a JWT token
  // returns the payload as a JSON object or null if decoding fails
  public decodePayload(token: string): Record<string, any> | null {
    try {

      const payload = token.split(".")
      if (payload.length < 2) {
        throw new Error("JWT malformed")
      }
      const decode = Buffer.from(payload[1], 'base64').toString('utf-8')
      const json = JSON.parse(decode)

      return json

    } catch (error) {
      console.error("JWT decode error:", error);
      return null;
    }

  }

  // signs a payload with the secret key and returns a JWT token
  // options can include expiration time, algorithm, etc.
  public sign(payload: object, options?: SignOptions): string | null {
    try {
      const mergedOptions = { ...this.options, ...options }
      return sign(payload, this.secret, mergedOptions)
    } catch (error) {
      console.error("JWT error:", error);
      return null
    }
  }

  // verifies a JWT token with the secret key
  // returns true if the token is valid, false otherwise
  public verify(token: string, secret: string): boolean {
    try {
      verify(token, secret)
      return true
    } catch (error) {
      console.error("JWT error:", error);
      return false
    }
  }

  // refreshes a JWT token using the refresh token
  // returns a new token or null if the refresh fails
  public refreshToken(refreshToken: string, expiresIn: string = '15m'): string | null {
    try {
      const decoded = verify(refreshToken, this.secret) as Record<string, any>
      const { iat, exp, nbf, ...data } = decoded

      return sign(data, this.secret, { expiresIn: expiresIn } as SignOptions)
    } catch (error) {
      console.error("JWT error:", error);
      return null
    }
  }

  // validates a refresh token and returns the decoded payload or null if validation fails
  public validateRefreshToken(refreshToken: string): Record<string, any> | null {
    try {

      return verify(refreshToken, this.secret) as Record<string, any>

    } catch (error) {
      console.error("JWT error:", error);
      return null
    }
  }

  // handles a refresh request by validating the refresh token and returning a new token
  // returns an object with success status, new token, and error message if any
  public handleRefreshRequest(refreshToken: string, expiresIn: string = '15m'): Record<string, any> | null {
    try {

      const decoded = this.validateRefreshToken(refreshToken)

      if (!decoded) {
        return {
          success: false,
          token: "",
          error: "JWT malformed"
        }
      }

      const newToken = this.refreshToken(refreshToken, expiresIn)

      if (!newToken) {
        return {
          success: false,          
          token: "",
          error: "Something went wrong, cannot create token"
        }
      }

      return {
        success: true,
        token: newToken,
        error: ""
      }

    } catch (error) {
      console.error("JWT error:", error);
      return null
    }
  }

}
