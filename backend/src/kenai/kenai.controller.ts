// src/kenai/kenai.controller.ts
import { Body, Controller, Post, Res, HttpStatus } from '@nestjs/common';
import { KenaiService } from './kenai.service';
import { Response } from 'express';
import { handleResponse, handleErrorResponse } from '../common/response.util';

@Controller('kenai')
export class KenaiController {
  constructor(private readonly kenaiService: KenaiService) { }

  @Post('generate')
  async generateText(@Res() res: Response, @Body() body: any) {
    try {
      const result = await this.kenaiService.generate(body.prompt, body.context || [], body.topK, body.topP, body.temp);
      const response = handleResponse({ response: result.response }, res.statusCode);
      res.status(200).json(response);
    } catch (error) {
      const response = handleErrorResponse(error.message, error.status || 500);
      res.status(response.status).json(response);
    }
  }
}
