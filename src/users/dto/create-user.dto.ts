import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsString()
    @IsNotEmpty()
    lastname: string;
    
    @IsEmail()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    password: string;
}
