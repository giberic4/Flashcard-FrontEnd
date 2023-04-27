import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from './dashboard.component';
import { CardServiceService } from '../card-service.service';
import { card, defaultCard } from '../Models/card';
import { of } from 'rxjs';



describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let cardServiceSpy: jasmine.SpyObj<CardServiceService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CardServiceService', ['getAllCards', 'updateCard']);
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, FormsModule, ReactiveFormsModule ],
      declarations: [ DashboardComponent ],
      providers: [
        FormBuilder,
        CardServiceService,
        { provide: CardServiceService, useValue: spy },
      ]    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    cardServiceSpy = TestBed.inject(CardServiceService) as jasmine.SpyObj<CardServiceService>;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call CardServiceService.getAllCards() on init and update the cards array', () => {
    const expectedCards = [{id : 1, front : 'test1', back : 'card1', state : false, show : true}, {id : 2, front : 'test2', back : 'card2', state : false, show : true}];
    cardServiceSpy.getAllCards.and.returnValue(of(expectedCards));
    component.ngOnInit();
    expect(cardServiceSpy.getAllCards).toHaveBeenCalled();
    expect(component.cards).toEqual(expectedCards);
    expect(component.finishedloading).toBe(true);
  });
  
  it('should flip the state of a card', () => {
    const testCard : card = { id: 1, front: 'test', back: 'card', state: false, show: true };
    component.flip(testCard);
    expect(testCard.state).toBe(true);
    component.flip(testCard);
    expect(testCard.state).toBe(false);
  });
  
  it('should reset selected card and updateSelected flag', () => {
    component.selected = {id: 1, front: 'front', back: 'back', state: false, show: true};
    component.updateSelected = true;
    component.closeUpddateCard();
    expect(component.selected).toEqual(defaultCard);
    expect(component.updateSelected).toBeFalse();
  });

  it('should update the selected card when updateCard() is called', () => {
    const updatedCard: card = { id: 1, front: 'Updated Front', back: 'Updated Back', state: false, show: true };
    component.selected = { id: 1, front: 'Test Front', back: 'Test Back', state: false, show: true };
    component.updateCard(updatedCard);
    expect(component.selected).toEqual(updatedCard);
    expect(component.updateSelected).toBeTrue();
  });


});
