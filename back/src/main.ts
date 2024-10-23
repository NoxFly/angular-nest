import 'dotenv/config';
import { setup, startApp } from './_core/app';
import { environment } from './environment/environment';
import './environment/validation';

declare const module: any;

async function bootstrap(): Promise<void> {
    process.stdout.write('\x1Bc');
    environment.root = __dirname;

    const app = await setup(__dirname);

    startApp(app);

    if(!environment.production && module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}

bootstrap();
