import Role from "./role";

export default interface User {
  id: number;
  fio: string;
  description: string;
  login: string;
  roles: Role[];
  created_at: Date;
  updated_at?: Date;
  last_visit?: Date;
}

export class UserDto implements User {
  description = "";
  fio = "";
  id = 0;
  login = "";
  roles = [];
  created_at = new Date();
  updated_at?: Date;
  last_visit?: Date;
}
