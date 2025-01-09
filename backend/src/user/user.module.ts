import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Register the User schema with Mongoose
        MulterModule.register({
            dest: './uploads', // Save uploaded files in the "uploads" folder
        }),

        PassportModule.register({ defaultStrategy: 'jwt' }), // Add Passport.js support
        JwtModule.register({
            secret: process.env.JWT_SECRET, // Use your secret key
            signOptions: { expiresIn: '1h' },
        }),

    ],
    controllers: [UserController],
    providers: [UserService, JwtStrategy], // Include JwtStrategy
    exports: [UserService], // Export the service if needed in other modules
})
export class UserModule { }



