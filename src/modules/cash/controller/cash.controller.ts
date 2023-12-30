import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CashService } from '../domain/cash.service';
import { CreateCashDto } from './dto/create-cash.dto';
import { UpdateCashDto } from './dto/update-cash.dto';

@Controller('cash')
export class CashController {
  constructor(private readonly cashService: CashService) {}
}
