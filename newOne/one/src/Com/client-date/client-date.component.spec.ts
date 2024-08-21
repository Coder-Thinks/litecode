import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDateComponent } from './client-date.component';

describe('ClientDateComponent', () => {
  let component: ClientDateComponent;
  let fixture: ComponentFixture<ClientDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientDateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
