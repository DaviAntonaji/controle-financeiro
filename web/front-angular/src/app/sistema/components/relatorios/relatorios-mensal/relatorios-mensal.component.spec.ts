import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatoriosMensalComponent } from './relatorios-mensal.component';

describe('RelatoriosMensalComponent', () => {
  let component: RelatoriosMensalComponent;
  let fixture: ComponentFixture<RelatoriosMensalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatoriosMensalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatoriosMensalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
