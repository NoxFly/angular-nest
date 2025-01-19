import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AcceptHeaderMiddleware } from 'src/middlewares/requests.middleware';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
    imports: [
        AuthModule,
        UsersModule,
    ],
})
export class AppModule implements NestModule {
    public configure(consumer: MiddlewareConsumer): void {
        consumer.apply(AcceptHeaderMiddleware).forRoutes('*');
    }
}
