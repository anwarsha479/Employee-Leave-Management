import { Body, Controller, Get, Post, Req, UseGuards, Put, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ChangePasswordDto } from './dto/change-password.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // Returns authenticated user information from the JWT payload.
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: any) {
    return req.user;
  }

  @Post('forgot-password')
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Put('change-password')
  @UseGuards(JwtAuthGuard)
  changePassword(
    @Req()
    req: Request & {
      user: {
        userId: string;
      };
    },
    @Body()
    changePasswordDto: ChangePasswordDto,
  ) {
    return this.authService.changePassword(
      req.user.userId,
      changePasswordDto,
    );
  }
}
