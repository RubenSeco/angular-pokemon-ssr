import { TestBed } from "@angular/core/testing";
import { routes } from "./app.routes";
import { provideRouter } from "@angular/router";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

describe('AppRoutes', () => {

  let router: Router;
  let location: Location;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes)
      ]
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should navigate to "about" redirects to "/about"', async () => {

    await router.navigate(['about']);
    expect(location.path()).toEqual('/about');
  });

  it('should navigate to "unknown-page" redirects to "about"', async () => {

    await router.navigate(['unknown-page']);
    expect(location.path()).toEqual('/about');
  });

  it('should load the proper component', async () => {

    const aboutRoute = routes.find(route => route.path === 'about');
    const aboutComponent = await aboutRoute!.loadComponent!() as any;
    expect(aboutComponent.default.name).toBe("AboutPageComponent");
  });


});
