import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalCampeonatoComponent } from './final-campeonato.component';

describe('FinalCampeonatoComponent', () => {
  let component: FinalCampeonatoComponent;
  let fixture: ComponentFixture<FinalCampeonatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalCampeonatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalCampeonatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
