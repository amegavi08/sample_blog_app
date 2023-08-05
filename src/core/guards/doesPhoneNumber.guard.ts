import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { UsersService } from "src/modules/users/users.service";

@Injectable()
export class DoesUserNumberExist implements CanActivate {
    constructor (private readonly userService: UsersService) {}

    canActivate(context: ExecutionContext
        ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    async validateRequest(request) {
        const userphoneNumber = await this.userService.findOneByPhonenumber(request.body.phonenumber);
        if (userphoneNumber) {
            throw new ForbiddenException('This phone number already exist');
        }
        return true;
    }

}