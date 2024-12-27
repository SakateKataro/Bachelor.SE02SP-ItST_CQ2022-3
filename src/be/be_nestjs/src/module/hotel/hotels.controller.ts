import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { Public } from '@/helpers/decorator/public';

import { HotelsService } from './hotels.service';

import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { SearchHotelDto } from './dto/search-hotel.dto';


@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) { }

  // API search khách sạn
  @Get('search')
  @Public()
  async findAvailableHotels(@Query() searchHotelDto: SearchHotelDto) {
    return await this.hotelsService.findAvailableHotels(searchHotelDto);
  }

  @Post()
  create(@Body() createHotelDto: CreateHotelDto) {
    return this.hotelsService.create(createHotelDto);
  }

  @Get()
  findAll() {
    return this.hotelsService.findAll();
  }

  // [GET]: /hotels/recommend-hotel
  @Get('recommended-hotel')
  @Public()
  async recommendedHotel() {
    return await this.hotelsService.getTopTenRatingHotel();
  }

  // [GET]: /hotels/:id
  @Get(':id')
  @Public()
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.hotelsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto) {
    return this.hotelsService.update(+id, updateHotelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelsService.remove(+id);
  }
}
