// import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
 
class User {
  public id?: number;

  public email: string;

  public surname: string;
 
  public password: string;
}
 
export default User;