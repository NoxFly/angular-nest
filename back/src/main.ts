import 'dotenv/config';
import 'src/environment/validation';
import { setup, startApp } from 'src/_core/app';
import { environment } from 'src/environment/environment';

declare const module: any;

async function bootstrap(): Promise<void> {
    environment.root = __dirname;

    const app = await setup();

    startApp(app);

    if(!environment.production && module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}

bootstrap();
