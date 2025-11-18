import { Body, Query, Controller, Get, Patch, Post, HttpCode, HttpStatus, UseGuards, Request} from '@nestjs/common';
import { AuthServerService } from './auth-server.service';
import { UserSignup } from '../entity/userSignUp.dto';
import { ApiTags, ApiQuery, ApiOperation, ApiResponse, ApiBody, ApiHeader, ApiBearerAuth } from '@nestjs/swagger';
import { UserSignIn } from '../entity/signin.dto';
import { BaseAuthGuard } from './guards/baseauth.guard';

@Controller("auth")
export class AuthServerController {
  constructor(private readonly authServerService: AuthServerService) {}

  @Post('create-new')
  @ApiOperation({summary:'Creates new user'})
  @ApiBody({
    type: UserSignup,
    examples: {
      default: {
        value: {
          email: 'john@example.com',
          fName: 'AALOK',
          lName: 'JHA',
          netId:'aalokvault',
          password: 'P@ssw0rd123',
          role: 'guest'
        },
      },
    },
  })
  async createUser(@Body() user:UserSignup){
    const result = await this.authServerService.createUser(user)
    if(result){
      console.log(`user ${user.netId} was created`)
      return 'created'
    }
    console.log(`user ${user.netId} already exists`)
    return 'not created'
    
  }

  @Get('get-all')
  getAllUser(){
    return this.authServerService.getAllUser()
  }

  @Patch('load-mock-data')
  @ApiOperation({summary:'Loads Mockup User Credentials'})
  loadMockUserCred(){
    return this.authServerService.loadMockUserCred()
  }

  @Get('find-user')
  @ApiOperation({summary:"Searches if a user is there or not"})
  @ApiQuery({ name: 'netId', required: true, type: String })
  findOne(@Query('netId') netId: string){
    return this.authServerService.findOne(netId);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: UserSignIn,
    examples: {
      default: {
        value: {
          netId:'axjh03',
          password: 'P@ssw0rd123',
        },
      },
    },
  })
  signIn(@Body() userData:UserSignIn){
    return this.authServerService.signin(userData.netId, userData.password)
  }

  // Test BaseAuthGuard
  @UseGuards(BaseAuthGuard)
  @Get('test-baseauth')
  @ApiOperation({ summary: 'Test BaseAuthGuard - returns the JWT payload' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Returns the logged-in user payload' })
  testBaseAuth(@Request() req) {
    return req.user;
  }

  @Get('check-bcrypt-password')
  @ApiQuery({ name: 'password', required: true, type: String })
  @ApiQuery({ name: 'netId', required: true, type: String })
  checkPassword(@Query('netId') netId: string, 
                @Query('password') password:string){
    return this.authServerService.checkPassword(netId, password)
  }
}
