import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDirectoryContainerComponent } from './employee-directory-container.component';

describe('EmployeeDirectoryContainerComponent', () => {
  let component: EmployeeDirectoryContainerComponent;
  let fixture: ComponentFixture<EmployeeDirectoryContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeDirectoryContainerComponent]
    });
    fixture = TestBed.createComponent(EmployeeDirectoryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
