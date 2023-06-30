import { Test, TestingModule } from '@nestjs/testing';
import { VetsController } from '../vets.controller';

describe('VetsController', () => {
  let controller: VetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VetsController],
    }).compile();

    controller = module.get<VetsController>(VetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
