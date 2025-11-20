import { TestBed } from '@angular/core/testing';
import { ProjectsService } from './projects.service';
import { Router } from '@angular/router';

describe('ProjectsService navigation', () => {
  let service: ProjectsService;
  let navigateByUrlSpy: jasmine.Spy;

  beforeEach(() => {
    const routerStub = { navigateByUrl: jasmine.createSpy('navigateByUrl') } as Partial<Router>;
    TestBed.configureTestingModule({
      providers: [
        ProjectsService,
        { provide: Router, useValue: routerStub }
      ]
    });
    service = TestBed.inject(ProjectsService);
    const router = TestBed.inject(Router);
    navigateByUrlSpy = (router.navigateByUrl as jasmine.Spy);
  });

  it('opens external links in new tab', () => {
    spyOn(window, 'open');
    service.navigateToProject({ id: 'x', title: 't', category: 'c', imageUrl: '', projectPath: 'https://example.com' });
    expect(window.open).toHaveBeenCalled();
  });

  it('navigates to internal route starting with /', () => {
    service.navigateToProject({ id: 'y', title: 't', category: 'c', imageUrl: '', projectPath: '/typing-game' });
    expect(navigateByUrlSpy).toHaveBeenCalledWith('/typing-game');
  });
});

