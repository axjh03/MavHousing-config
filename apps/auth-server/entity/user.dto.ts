import { IsEmail, IsNotEmpty, } from "class-validator"
import {validatePasswordSec} from "../../../common/validator/password.validator"

export class UserSignUp{

    @IsNotEmpty()
    readonly fName:string

    readonly mName:string

    @IsNotEmpty()
    readonly lname:string
    
    @IsEmail()
    @IsNotEmpty()
    readonly email:string
    
    @IsNotEmpty()
    @validatePasswordSec()
    readonly password:string

}