import { IsNotEmpty,IsString,IsDate} from "class-validator";

export class MedicalDto{
    @IsString()
    @IsNotEmpty()
    diagnosis:string;
    @IsString()
    @IsNotEmpty()
    note:string;
    @IsString()
    date:Date;
}