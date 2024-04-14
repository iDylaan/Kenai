// src/kenai/kenai.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class KenaiService {
  private readonly MODEL = 'Kenai';
  private readonly API_URL = 'http://localhost:11434/api/generate';

  async generate(prompt: string, context: any[], topK: number, topP: number, temp: number): Promise<{ response: string, context: any[] }> {
    try {
      const { data } = await axios.post(this.API_URL, {
        model: this.MODEL,
        prompt: prompt,
        context: context,
        options: {
          top_k: topK,
          temperature: topP,
          top_p: temp
        },
      }, {
        responseType: 'stream'
      });

      let response = '';
      for await (const chunk of data) {
        const parsedChunk = JSON.parse(chunk.toString());
        if (parsedChunk.error) {
          throw new Error(parsedChunk.error);
        }
        response += parsedChunk.response || '';
        if (parsedChunk.done) {
          return { response, context: parsedChunk.context || [] };
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new HttpException(`API error: ${error.response.statusText}`, error.response.status);
      } else {
        throw new HttpException(`Error generating text: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
