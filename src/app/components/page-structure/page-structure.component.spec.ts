import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PageStructureComponent} from './page-structure.component';

describe('PageStructureComponent', () => {
  let component: PageStructureComponent;
  let fixture: ComponentFixture<PageStructureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageStructureComponent]
    });
    fixture = TestBed.createComponent(PageStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
