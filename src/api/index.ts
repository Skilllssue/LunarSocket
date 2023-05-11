import { Express } from 'express';
import { readFileSync } from 'node:fs';
import * as http from 'node:http';
import * as https from 'node:https';
import { initConfig } from '../utils/config';
import initAPI from './api';

const config = initConfig();

export default function createServer(): http.Server | https.Server {
  let server: http.Server | https.Server;
  let app: Express;

  if (config.api.enabled) app = initAPI();

  if (config.server.secure) {
    server = https.createServer(
      {
        cert: readFileSync(config.server.certificates.cert),
        key: readFileSync(config.server.certificates.key),
      },
      app
    );
  } else server = http.createServer(app);

  server.listen(config.server.port);

  return server;
}
