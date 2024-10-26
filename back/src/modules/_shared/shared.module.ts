import { Global, Module } from '@nestjs/common';
import { JwtTokenService } from 'src/modules/_shared/jwt.service';

@Global()
@Module({
    providers: [JwtTokenService],
    exports: [JwtTokenService],
})
export class SharedModule {}
