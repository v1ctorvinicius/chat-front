// // src/auth/domain/useCases/AuthenticateUserUseCase.ts

// import { AuthService } from '../services'; 
// import type {AuthToken} from '../models/authToken';

// class AuthenticateUserUseCase {

//   private static instance: AuthenticateUserUseCase;

//   constructor(private authService: AuthService) {} // Injeta o serviço de autenticação

//   async execute(token: string): Promise<AuthToken> {
//     try {
//       // Chama o método de autenticação do serviço de autenticação
//       const user = await this.authService.authenticate(token);
      
//       // Gera um token de autenticação para o usuário autenticado
//       const authToken = this.authService.generateToken(user);
      
//       // Retorna o token de autenticação
//       return authToken;
//     } catch (error) {
//       // Em caso de erro, lança uma exceção para ser tratada pela camada de apresentação
//       throw new Error('Failed to authenticate user');
//     }
//   }

//   static getInstance(): AuthenticateUserUseCase {
//     if (!AuthenticateUserUseCase.instance) {
//       AuthenticateUserUseCase.instance = new AuthenticateUserUseCase(new AuthService());
//     }
//     return AuthenticateUserUseCase.instance;
//   }
// }

// export authenticateWithGoogle
