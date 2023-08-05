import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { UsersService } from "src/modules/users/users.service";

@Injectable()
export class DoesUserNameExist implements CanActivate {
    constructor (private readonly userService: UsersService) {}

    canActivate(context: ExecutionContext
        ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    async validateRequest(request) {
        const userName = await this.userService.findOneByUsername(request.body.username);
        if (userName) {
            throw new ForbiddenException('This username already exist');
        }
        return true;
    }

}