import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { isCreatorGuard } from '../guard/isCreator.guard';
import { isAuthGuard } from '../guard/isAuth.guard';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}


  @UseGuards(isCreatorGuard)
  @UseGuards(isAuthGuard)
  @Post()
  create(@Body() createStatusDto: CreateStatusDto) {
    return this.statusService.create(createStatusDto);
  }

  
  @Get()
  findAll() {
    return this.statusService.findAll();
  }

  @UseGuards(isCreatorGuard)
  @UseGuards(isAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusService.findOne(id);
  }

  @UseGuards(isCreatorGuard)
  @UseGuards(isAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    return this.statusService.update(id, updateStatusDto);
  }

  @UseGuards(isCreatorGuard)
  @UseGuards(isAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusService.remove(id);
  }
}
