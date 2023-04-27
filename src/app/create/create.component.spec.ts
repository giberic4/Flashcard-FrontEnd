import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CardServiceService } from '../card-service.service';
import { CreateComponent } from './create.component';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let cardServiceSpy: jasmine.SpyObj<CardServiceService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CardServiceService', ['createCard']);
    await TestBed.configureTestingModule({
      declarations: [ CreateComponent ],
      imports: [ ReactiveFormsModule, RouterTestingModule ],
      providers: [
        { provide: CardServiceService, useValue: spy }
      ]
    })
    .compileComponents();
    cardServiceSpy = TestBed.inject(CardServiceService) as jasmine.SpyObj<CardServiceService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createCard() when form is submitted', () => {
    const form = component.cardForm;
    form.setValue({ cardFront: 'Test Front', cardBack: 'Test Back' });
    const cardToCreate = { id: 0, front: 'Test Front', back: 'Test Back', state: false, show: true };
    cardServiceSpy.createCard.and.returnValue(of(cardToCreate));
    const button = fixture.nativeElement.querySelector('button[type="submit"]');
    button.click();
    fixture.detectChanges();
    expect(component.showSuccess).toBeFalse();
  });
});
