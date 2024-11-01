import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";

export class UserCredentials {
    @ApiProperty({
        required: true,
        description: 'The user login ID',
        example: 'john.doe@gmail.com',
        minLength: 3,
        maxLength: 128,
    })
    @IsString()
    public username: string;

    @ApiProperty({
        required: true,
        description: 'The user password',
        example: '1234',
        minLength: 3,
        maxLength: 128,
    })
    @IsString()
    public password: string;

    @ApiProperty({
        required: false,
        description: 'Remember the user login more than the current session',
        example: false,
    })
    @IsBoolean()
    public remember: boolean;
}
