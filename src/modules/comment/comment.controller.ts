import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { Controller } from '../../common/controller/controller.js';
import { Component } from '../../types/component.types.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { CommentServiceInterface } from './comment-service.interface.js';
import { StatusCodes } from 'http-status-codes';
import CommentResponse from './response/comment.response.js';
import { fillDTO } from '../../utils/common.js';

@injectable()
export default class CommentController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/:offerId', method: HttpMethod.Post, handler: this.create});
  }

  public async index(req: Request, res: Response): Promise<void> {
    // ВОПРОС: КАК правильно описать тип для offerID
    // Код обработчика
    // const offerId: string = req.query.offerId;

    // if (!offerId) {
    //   this.logger.error('Parameter OfferId is undefined');
    //   return;
    // }

    // const comments = await this.commentService.findByOfferId(offerId);
    // const categoryResponse = fillDTO(CategoryResponse, categories);
    // this.send(res, StatusCodes.OK, categoryResponse);
  }

  public create(_req: Request, _res: Response): void {
    // Код обработчика
  }
}
