import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { Config } from "@netlify/edge-functions"

export const edgeConfig: Config = {
  path: "/hello",
  onError: "bypass"
}
const bootstrap = () => bootstrapApplication(AppComponent, config);


export default bootstrap;
