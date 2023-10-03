import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

@Injectable()
export class HttpService {
  async get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    try {
      const response = await axios.get(url, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async post(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    try {
      const response = await axios.post(url, data, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any): void {
    let message: string;
    let statusCode: number;

    if (error.response) {
      message = error.response.data.message || error.response.statusText;
      statusCode = error.response.status;
    } else if (error.request) {
      message = 'No response received from the server.';
      statusCode = HttpStatus.REQUEST_TIMEOUT;
    } else {
      message = error.message;
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    throw new HttpException(message, statusCode);
  }
}
