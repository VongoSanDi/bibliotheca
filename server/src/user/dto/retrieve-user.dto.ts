export class RetrieveUserDto {
  user_id: number;
  username: string;
  email: string;
  password_hash: string;
  birth_date: Date;
  gender_id: number;
  country_id: number;
  last_login: Date;
}
