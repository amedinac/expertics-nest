import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { compare, encrypt } from './utils/handleBcrypt';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ){}

    public async register(registerAuthDto:RegisterAuthDto){
        const { password, ...user } = registerAuthDto;

        const userParse = {
            ...user, password: await encrypt(password)
        }
        return this.userModel.create(userParse);
    }

    public async login(loginAuthDto:LoginAuthDto){

        const { password } = loginAuthDto;

        const userExist = await this.userModel.findOne({email: loginAuthDto.email});
        if(!userExist) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
        
        const isCheck = compare(password, userExist.password);
        if(!isCheck) throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);

        return userExist;
    }
}
