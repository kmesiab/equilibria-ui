import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FactFeedService } from './fact-feed-service.service';
import { Fact } from '../types/fact';

describe('FactFeedService', () => {
  let service: FactFeedService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FactFeedService]
    });
    service = TestBed.inject(FactFeedService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensure no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected fact feed by ID (HttpClient called once)', () => {
    const expectedFacts: Fact[] = [
      {
        id: 27,
        user_id: 39,
        conversation_id: 5550,
        body: "Brian is only available after his kids go to sleep",
        reasoning: "This indicates a potential constraint in Brian's schedule that could be impacting the patient's relationship",
        created_at: "2024-05-27T14:04:03Z",
        updated_at: "0001-01-01T00:00:00Z"
      }
      // Add other expected facts here...
    ];

    const id = 27;
    service.getFactFeedById(id).subscribe(
      facts => expect(facts).toEqual(expectedFacts, 'should return expected fact feed by ID'),
      fail
    );

    // Service should have made one request to GET facts from expected URL
    const req = httpTestingController.expectOne(`${service.apiUrl}/${id}`);
    expect(req.request.method).toEqual('GET');

    // Respond with the mock facts
    req.flush(expectedFacts);
  });

  it('should handle a server error for fact feed by ID', () => {
    const errorMessage = 'simulated network error';
    const id = 27;

    service.getFactFeedById(id).subscribe(
      facts => fail('expected to fail'),
      error => expect(error).toContain('Server returned code: 500')
    );

    const req = httpTestingController.expectOne(`${service.apiUrl}/${id}`);

    // Respond with a mock error
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });
});
