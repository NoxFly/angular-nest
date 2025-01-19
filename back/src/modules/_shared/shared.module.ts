import { Module } from '@nestjs/common';
import { JwtTokenService } from 'src/modules/_shared/services/jwt.service';

@Module({
    providers: [JwtTokenService],
    exports: [JwtTokenService],
})
export class SharedModule {}
