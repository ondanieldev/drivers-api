import { CreateAutomobileBo } from '../bos/automobile.bo';
import { AutomobileLocalRepository } from '../repositories/automobile-local.repository';
import { AutomobileRepository } from '../repositories/automobile.repository';
import { AutomobileService } from './automobile.service';

describe('AutomobileService', () => {
  let automobileService: AutomobileService;
  let automobileRepository: AutomobileRepository;

  beforeEach(async () => {
    automobileRepository = new AutomobileLocalRepository();
    automobileService = new AutomobileService(automobileRepository);
  });

  it('should create an automobile', async () => {
    // Arrange
    const data: CreateAutomobileBo = {
      brand: 'Toyota',
      color: 'black',
      licensePlate: 'ABC-1234',
    };

    // Act
    const automobile = await automobileService.create(data);

    // Assert
    expect(automobile).toBeDefined();
    expect(automobile.brand).toBe(data.brand);
    expect(automobile.color).toBe(data.color);
    expect(automobile.licensePlate).toBe(data.licensePlate);
  });
});
