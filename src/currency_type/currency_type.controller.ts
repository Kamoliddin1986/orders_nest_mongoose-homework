import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CurrencyTypeService } from './currency_type.service';
import { CreateCurrencyTypeDto } from './dto/create-currency_type.dto';
import { UpdateCurrencyTypeDto } from './dto/update-currency_type.dto';
import { isCreatorGuard } from '../guard/isCreator.guard';
import { isAuthGuard } from '../guard/isAuth.guard';

@Controller('currency-type')
export class CurrencyTypeController {
  constructor(private readonly currencyTypeService: CurrencyTypeService) {}

  @UseGuards(isCreatorGuard)
  @UseGuards(isAuthGuard)
  @Post()
  create(@Body() createCurrencyTypeDto: CreateCurrencyTypeDto) {
    return this.currencyTypeService.create(createCurrencyTypeDto);
  }

  @Get()
  findAll() {
    return this.currencyTypeService.findAll();
  }


  @UseGuards(isCreatorGuard)
  @UseGuards(isAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.currencyTypeService.findOne(id);
  }


  @UseGuards(isCreatorGuard)
  @UseGuards(isAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCurrencyTypeDto: UpdateCurrencyTypeDto) {
    return this.currencyTypeService.update(id, updateCurrencyTypeDto);
  }


  @UseGuards(isCreatorGuard)
  @UseGuards(isAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.currencyTypeService.remove(id);
  }
}
