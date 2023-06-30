import { Test, TestingModule } from '@nestjs/testing';
import { VetsService } from './vets.service';

describe('VetsService', () => {
  let service: VetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VetsService],
    }).compile();

    service = module.get<VetsService>(VetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
