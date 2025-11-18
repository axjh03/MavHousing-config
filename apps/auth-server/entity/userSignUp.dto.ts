import { IsEmail, IsNotEmpty, IsOptional, IsEnum} from "class-validator"
import { ValidatePassword } from "common/validator/validatePasswordSec.decorator"
import { Role } from "./role.enum"
import { ApiProperty } from "@nestjs/swagger"

export class UserSignup{

    @ApiProperty()
    @IsNotEmpty()
    readonly fName:string

    @ApiProperty()
    @IsOptional()
    readonly mName?:string

    @ApiProperty()
    @IsNotEmpty()
    readonly lName:string

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    readonly email:string

    @ApiProperty()
    @IsNotEmpty()
    readonly netId:string
    
    @ApiProperty()
    @IsNotEmpty()
    @ValidatePassword() // Custom Decorator that Validates based on UTA Password requirements
    password:string    

    @ApiProperty()
    @IsEnum(Role)
    readonly role: Role // Defaults to undefined

}