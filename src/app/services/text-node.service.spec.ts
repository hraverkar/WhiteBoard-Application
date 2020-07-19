import { TestBed } from '@angular/core/testing';

import { TextNodeService } from './text-node.service';

describe('TextNodeService', () => {
  let service: TextNodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextNodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
