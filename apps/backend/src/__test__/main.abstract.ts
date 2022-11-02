import request from 'supertest';
import { INestApplication } from '@nestjs/common';

import { IResponseError } from '@app/utils';

export interface IResponse<T> {
  status: number;
  headers: string[];
  body?:
    | IResponseError
    | {
        ok: boolean;
        result: T;
      };
}

export default abstract class MainAbstract {
  protected _app: INestApplication;
  protected _server;

  async get<T>(url: string, auth?: string): Promise<IResponse<T>> {
    let req = request(this._server).get(`/api${url}`);

    if (auth) {
      req = req.auth(auth, { type: 'bearer' });
    }

    return req;
  }

  async post<T>(
    url: string,
    data: object | string,
    auth?: string,
  ): Promise<IResponse<T>> {
    let req = request(this._server).post(`/api${url}`).send(data);

    if (auth) {
      req = req.auth(auth, { type: 'bearer' });
    }

    return req;
  }

  async put<T>(
    url: string,
    data: object | string,
    auth?: string,
  ): Promise<IResponse<T>> {
    let req = request(this._server).put(`/api${url}`).send(data);

    if (auth) {
      req = req.auth(auth, { type: 'bearer' });
    }

    return req;
  }
}
