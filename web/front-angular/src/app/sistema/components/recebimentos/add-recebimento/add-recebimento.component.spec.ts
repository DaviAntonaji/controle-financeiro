import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecebimentoComponent } from './add-recebimento.component';

describe('AddRecebimentoComponent', () => {
  let component: AddRecebimentoComponent;
  let fixture: ComponentFixture<AddRecebimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRecebimentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRecebimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
