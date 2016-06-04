import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { ApplicationNameAppComponent } from '../app/application-name.component';

beforeEachProviders(() => [ApplicationNameAppComponent]);

describe('App: ApplicationName', () => {
  it('should create the app',
      inject([ApplicationNameAppComponent], (app: ApplicationNameAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'application-name works!\'',
      inject([ApplicationNameAppComponent], (app: ApplicationNameAppComponent) => {
    expect(app.title).toEqual('application-name works!');
  }));
});
