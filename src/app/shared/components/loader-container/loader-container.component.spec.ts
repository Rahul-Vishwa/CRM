import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderContainerComponent } from './loader-container.component';

describe('LoaderContainerComponent', () => {
  let component: LoaderContainerComponent;
  let fixture: ComponentFixture<LoaderContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoaderContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
