import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatoriosAnualComponent } from './relatorios-anual.component';

describe('RelatoriosAnualComponent', () => {
  let component: RelatoriosAnualComponent;
  let fixture: ComponentFixture<RelatoriosAnualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatoriosAnualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatoriosAnualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
