import 'dotenv/config';
import { setup, startApp } from './_core/app';
import { environment } from './environment/environment';
import './environment/validation';

async function bootstrap(): Promise<void> {
    process.stdout.write('\x1Bc');
    environment.root = __dirname;

    const app = await setup(__dirname);

    startApp(app);
}

bootstrap();
