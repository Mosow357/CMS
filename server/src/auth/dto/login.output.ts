import { UserDTO } from './userDTO';

export class LoginOutput {
  token: string;
  expiredAt: Date;
  user: UserDTO;
}
