import { Component } from '../../types/component.types.js';
import Application from '../../app/application.js';
import { Container } from 'inversify';
import { LoggerInterface } from '../logger/logger.interface.js';
import LoggerService from '../logger/logger.service.js';
import { ConfigInterface } from '../config/config.interface.js';
import ConfigService from '../config/config.service.js';

export const applicationContainer = new Container();
applicationContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
applicationContainer.bind<LoggerInterface>(Component.LoggerInterface).to(LoggerService).inSingletonScope();
applicationContainer.bind<ConfigInterface>(Component.ConfigInterface).to(ConfigService).inSingletonScope();
