import { HttpException, HttpStatus } from '@nestjs/common';

import { CodeExceptionEnum, MessageExceptionEnum } from '@app/common/enums';

export class HttpExternalException extends HttpException {
  readonly errorCode: CodeExceptionEnum;

  constructor() {
    super(MessageExceptionEnum.EXTERNAL, HttpStatus.INTERNAL_SERVER_ERROR);

    this.errorCode = CodeExceptionEnum.EXTERNAL;
  }
}
