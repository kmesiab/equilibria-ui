import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PatientService } from './patient-service.service';
import type { Patient } from '../types/patient';

describe('PatientService', () => {
  let service: PatientService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PatientService]
    });
    service = TestBed.inject(PatientService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensure no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected patients (HttpClient called once)', () => {
    const expectedPatients: Patient[] = [
      {
        status: { id: 1, name: 'Active' },
        id: 1,
        phone_number: '123-456-7890',
        phone_verified: true,
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        nudge_enabled: true,
        provider_code: 'XYZ123'
      },
      {
        status: { id: 2, name: 'Inactive' },
        id: 2,
        phone_number: '987-654-3210',
        phone_verified: false,
        firstname: 'Jane',
        lastname: 'Doe',
        email: 'jane.doe@example.com',
        nudge_enabled: false,
        provider_code: 'ABC456'
      }
    ];

    service.getPatients().subscribe(
      patients => expect(patients).toEqual(expectedPatients, 'should return expected patients'),
      fail
    );

    // Service should have made one request to GET patients from expected URL
    const req = httpTestingController.expectOne(service.apiUrl);
    expect(req.request.method).toEqual('GET');

    // Respond with the mock patients
    req.flush({ status: 200, data: expectedPatients });
  });

  it('should handle a server error', () => {
    const errorMessage = 'simulated network error';

    service.getPatients().subscribe(
      patients => fail('expected to fail'),
      error => expect(error).toContain('Server returned code: 500')
    );

    const req = httpTestingController.expectOne(service.apiUrl);

    // Respond with a mock error
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });
});
