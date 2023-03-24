import { LoginAdminDto } from './dto/login-admin.dto';
import { PassThrough } from 'stream';
import { Admin, AdminDocument, AdminSchema } from './schemas/admin.schema';
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import {Response} from 'express'
import { UpdatePasswordDto } from './dto/update_password-admin.dto';
@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
  private readonly jwtService: JwtService) {}

  async updatePass(id: string, updatePasswordDto: UpdatePasswordDto){
    const {old_password,new_password,confirm_password} = updatePasswordDto

    
    const admin = await this.findOneById(id)
    
    const isPassTrue = await bcrypt.compare(old_password,admin.hashed_password)
    if(!isPassTrue){
      throw new BadRequestException('eski parol notugri')
    }
    
    if(new_password !== confirm_password){
      throw new BadRequestException('Parolni birxil kiriting')
    }
    const newHashedPass = await bcrypt.hash(new_password,7)
    return this.adminModel.findByIdAndUpdate(id,{hashed_password: newHashedPass}, {new: true}).exec()
  }


  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const {user_name, password} = createAdminDto
const hashed_password = await bcrypt.hash(password,7)

    const createdAdmin = new this.adminModel({
      user_name,
      hashed_password
    });
    return createdAdmin.save();
  }

 async findAll(): Promise<Admin[]> {
    const admins = await this.adminModel.find()
    return admins;
  }

  findOneByUserName(user_name: string) {
    return this.adminModel.findOne({user_name}).exec()
  }

  findOneById(id: string) {
    return this.adminModel.findById(id).exec()
  }

  update(id: string, updateAdminDto: UpdateAdminDto) {
     
    return this.adminModel.findByIdAndUpdate(id, updateAdminDto, {new: true}).exec()
  }

  remove(id: string) {
    return this.adminModel.findByIdAndDelete(id)
  }

  async login(loginAdminDto: LoginAdminDto, res: Response) {
    const {user_name,password } = loginAdminDto;

    const admin = await this.adminModel.findOne({user_name}).exec()
    
    if(!admin){
      throw new BadRequestException('Bunday admin yuq')
    }

    const isMatchPass = await bcrypt.compare(password, admin.hashed_password)
    
    if(!isMatchPass){
      throw new BadRequestException('Pass notugri')
    }

    const token = await this.getToken(admin)
    const hashed_token = await bcrypt.hash(token.refresh_token,7);
    console.log();
    

    const updateAdmin = await this.adminModel.findByIdAndUpdate(admin._id,{
      hashed_token: hashed_token}, {new:true})

      res.cookie('refresh_token', token.refresh_token),{
        maxAge: 15*24*60*60*1000,
        httpOnly: true
      }

      const response = {
        message: "User Registered",
        user: updateAdmin,
        token
      }

      return response

  }

  async getToken(admin: AdminDocument) {
    const jwtPayload = {
      id: admin.id,
      is_active: admin.is_active, 
      is_creator: admin.is_creator, 
    };

    const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(jwtPayload, {
          secret: process.env.ACCESS_TOKEN_KEY,
          expiresIn: process.env.ACCESS_TOKEN_TIME
        }),
        this.jwtService.signAsync(jwtPayload, {
          secret: process.env.REFRESH_TOKEN_KEY,
          expiresIn: process.env.REFRESH_TOKEN_TIME
        })
    ])
    return {
      access_token: accessToken,
        refresh_token: refreshToken
    }
  }

  async logout(refresh_token: string, res: Response) {
    const adminDataFromToken = await this.jwtService.verify(refresh_token, {
      secret: process.env.REFRESH_TOKEN_KEY
    })

    if(!adminDataFromToken){
      throw new ForbiddenException("User not founded")
    }

    const updateAdmin = await this.adminModel.findByIdAndUpdate(adminDataFromToken.id,
      {hashed_token: null}, {new: true})

      res.clearCookie('refresh_token');

      const response = {
        message: 'Loguot successfull',
        admin: updateAdmin
      }

      return response
  }

}
