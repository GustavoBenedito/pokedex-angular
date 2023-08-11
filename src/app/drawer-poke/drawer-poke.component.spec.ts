import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerPokeComponent } from './drawer-poke.component';

describe('DrawerPokeComponent', () => {
  let component: DrawerPokeComponent;
  let fixture: ComponentFixture<DrawerPokeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawerPokeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawerPokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
