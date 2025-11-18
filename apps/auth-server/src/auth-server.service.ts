import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserSignup } from '../entity/userSignUp.dto';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { sampleUserCred } from './mock/sample_user_cred';
import bcrypt from 'node_modules/bcryptjs';

@Injectable()
export class AuthServerService {
  // Creating instance of JWT Service
  constructor(private jwtService:JwtService){}

  private userdb : UserSignup[] = []

  // CREATE
  async createUser(user:UserSignup):Promise<boolean>{
    if(await this.findOne(user.netId)){
      return false
    }

    // Hash the password with 10 rounds of salting and replace plain text password with hash
    user.password = await bcrypt.hash(user.password, 10)
    this.userdb.push(user)
    console.log(user)
    return true
  }

  async loadMockUserCred(){
    for(const user of sampleUserCred){
        user.password = await bcrypt.hash(user.password, 10)
        this.userdb.push(user)
    }
  }

  // READ
  getAllUser(){
    return this.userdb
  }  

  // UPDATE

  // DELETE

  // SEARCH
  async findOne(username:string):Promise<UserSignup | undefined>{
    return this.userdb.find(user => user.netId === username)
  }

  // AUTH STUFF
  async signin(netId:string, password:string){
    const user = await this.findOne(netId);
    if(user){
      if(user.password != password){
        throw new UnauthorizedException();
      }
      
      // Could add 10-digit UTA ID later... in the payload
      const payload = {username: user.netId,
        Role: user.role,
        jti:randomUUID() // ensures unique token per login
        }
      return {
        access_token: await this.jwtService.signAsync(payload)
      }
    }
  }

  // REMOVE LATER
  async checkPassword(netId:string, password:string){
    const userTemp = await this.findOne(netId)
    console.log(userTemp)
    if(userTemp){
      const isMatch = await bcrypt.compare(password, userTemp.password)
      if(isMatch){
        console.log("bcrypt password check worked!")
        return
      }
      else{
      console.log("maybe wrong password?")
      return
      }
    }
    return "not found"
  }
}
