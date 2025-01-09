import { Controller, Post, Req, Res } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    @Post('logout')
    async logout(@Req() req: any, @Res() res: any) {
        // Clear the cookie or token (if stored in cookies)
        res.clearCookie('authToken'); // Adjust this if you use cookies for auth
        return res.status(200).send({ message: 'Logout successful' });
    }
}
