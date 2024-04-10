import { User } from "../entities/user.entity";

export class UserDto {
    id: string;
    pseudo: string;
    email: string;
    password: string;

    // Map UserDto from User
    static fromUser(user: User) {
        const dto = new UserDto();
        dto.id = user.id;
        dto.pseudo = user.pseudo;
        dto.email = user.email;
        dto.password = user.password;
        return dto;
    }
  }
  