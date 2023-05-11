import { Router } from 'express';
import { spawn } from 'node:child_process';
import { join } from 'node:path';
import { getConfigSync } from '../../utils/config';
import auth from '../middleware/auth';

const config = getConfigSync();

const actionRouter = Router();

actionRouter.post('/update', auth, (request, response) => {
  const proc = spawn('npm', ['run', 'update'], {
    cwd: join(__dirname, '..', '..', '..'),
  });

  proc.on('exit', () => {
    response.sendStatus(200);
  });

  proc.on('error', (err) => {
    response.send(err).sendStatus(500);
  });
});

actionRouter.post('/restart', auth, (request, response) => {
  const args = config.commands.restart.split(' ');
  const proc = spawn(args.shift(), args, {
    cwd: join(__dirname, '..', '..', '..', '..'),
  });

  proc.on('exit', () => {
    response.sendStatus(200);
  });

  proc.on('error', (err) => {
    response.send(err).sendStatus(500);
  });
});

actionRouter.post('/stop', auth, (request, response) => {
  const args = config.commands.stop.split(' ');
  const proc = spawn(args.shift(), args, {
    cwd: join(__dirname, '..', '..', '..', '..'),
  });

  proc.on('exit', () => {
    response.sendStatus(200);
  });

  proc.on('error', (err) => {
    response.send(err).sendStatus(500);
  });
});

actionRouter.post('/kill', auth, (request, response) => {
  response.sendStatus(200);
  process.exit(0);
});

export default actionRouter;
