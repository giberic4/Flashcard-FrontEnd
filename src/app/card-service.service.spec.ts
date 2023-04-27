import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CardServiceService } from './card-service.service';
import { card } from './Models/card';
import { HttpErrorResponse } from '@angular/common/http';

describe('CardServiceService', () => {
  let service: CardServiceService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CardServiceService],
    });
    service = TestBed.inject(CardServiceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllCards', () => {
    it('should return an Observable of cards', () => {
      const mockCards: card[] = [
        { id: 1, front: 'Test Front', back: 'Test Back', state: false, show: true },
        { id: 2, front: 'Another Front', back: 'Another Back', state: true, show: false },
      ];
      service.getAllCards().subscribe((cards) => {
        expect(cards).toEqual(mockCards);
      });
      const req = httpTestingController.expectOne(`${service.apiRoot}Cards`);
      expect(req.request.method).toEqual('GET');
      req.flush(mockCards);
    });

  });

  describe('createCard', () => {
    it('should create a card', () => {
      const mockCard: card = { id: 1, front: 'Test Front', back: 'Test Back', state: false, show: true };
      service.createCard(mockCard).subscribe((card) => {
        expect(card).toEqual(mockCard);
      });
      const req = httpTestingController.expectOne(`${service.apiRoot}Card/create`);
      expect(req.request.method).toEqual('POST');
      req.flush(mockCard);
    });


  });

})