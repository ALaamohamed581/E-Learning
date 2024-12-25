import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { AuthGuard } from 'src/common/gurds/authguard/authGuard.guard';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { QueryString } from 'src/common/typse/QueryString';

@Controller('admin/permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @UseGuards(AuthGuard('ADMIN'))
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get()
  findAll(
    @Query(new PaginationPipe())
    { limit, queryStr, skip, page, sort }: QueryString,
  ) {
    return this.permissionsService.findAll({
      limit,
      queryStr,
      skip,
      page,
      sort,
    });
  }
  @UseGuards(AuthGuard('ADMIN'))
  @Patch('assign/:entity/:id/:prmissoinId')
  assigPermisson(
    @Param('entity') entity: string,
    @Param('id') id: number,
    @Param('prmissoinId') prmissoinId: number,
  ) {
    console.log(entity, id, prmissoinId);
    this.permissionsService.assignPermission({ id, entity, prmissoinId });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionsService.update(+id, updatePermissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionsService.remove(+id);
  }
}
