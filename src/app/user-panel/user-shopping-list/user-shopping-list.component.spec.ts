import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserShoppingListComponent } from './user-shopping-list.component';

describe('UserShoppingListComponent', () => {
  let component: UserShoppingListComponent;
  let fixture: ComponentFixture<UserShoppingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserShoppingListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserShoppingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
