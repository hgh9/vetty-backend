import { Repository, DataSource, EntityRepository } from 'typeorm';
import { User } from '../entity/users.entity';
import { Inject } from '@nestjs/common';

@EntityRepository(User)
export class UsersRepository extends Repository<User>
{
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource
  ) {
    super(User, dataSource.createEntityManager());
  }
  
  async createUser(createUserDto) {
    const newUser = this.create(createUserDto);
    await this.save(newUser);
    return newUser;
  }
  
  async findOneByEmailAndPassword(loginUserDto) {
    return await this.findOneBy({
      email: loginUserDto.email,
      password: loginUserDto.password,
    });
  }
  
  async isUserDuplicate(email) {
    return !!(await this.findOneBy({ email }));
  }
}