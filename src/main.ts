import { applicationContainer } from './common/container/container.js';
import Application from './app/application.js';
import { Component } from './types/component.types.js';

const application = applicationContainer.get<Application>(Component.Application);
await application.init();
