import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import {Response} from 'express'
import { CookieGetter } from '../Decorator/cookieGetter.decoartor';
import { isAuthGuard } from '../guard/isAuth.guard';
import { isCreatorGuard } from '../guard/isCreator.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // @Post('updatepassword')
  // update

  @UseGuards(isCreatorGuard)
  @UseGuards(isAuthGuard)
  @Post('create')
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }


  @UseGuards(isCreatorGuard)
  @UseGuards(isAuthGuard)
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get('username/:username')
  findOneByUserName(@Param('username') user_name: string) {
    return this.adminService.findOneByUserName(user_name);
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.adminService.findOneById(id);
  }

  @UseGuards(isCreatorGuard)
  @UseGuards(isAuthGuard)
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id, updateAdminDto);
  }

  @UseGuards(isCreatorGuard)
  @UseGuards(isAuthGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }

  @Post('login')
  login(@Body() loginAdminDto: LoginAdminDto,
  @Res({passthrough: true}) res: Response) {
    return this.adminService.login(loginAdminDto, res)
  }

  @Post('logout')
  logout(
    @CookieGetter('refresh_token') Cookie_refresh_token: string,
    @Res({passthrough: true}) res: Response
  ){
    return this.adminService.logout(Cookie_refresh_token, res)
  }
}
