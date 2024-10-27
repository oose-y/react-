// types/micro-cors.d.ts
declare module 'micro-cors' {
  import { RequestHandler } from 'micro';
  import { IncomingMessage, ServerResponse } from 'http';

  type CorsOptions = {
    origin?: string;
    allowMethods?: string[];
    allowHeaders?: string[];
    exposeHeaders?: string[];
    maxAge?: number;
    credentials?: boolean;
  };

  function microCors(options?: CorsOptions): (handler: (req: IncomingMessage, res: ServerResponse) => void) => RequestHandler;

  export = microCors;
}
