import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritosList } from './favoritos-list';

describe('FavoritosList', () => {
  let component: FavoritosList;
  let fixture: ComponentFixture<FavoritosList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoritosList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritosList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
