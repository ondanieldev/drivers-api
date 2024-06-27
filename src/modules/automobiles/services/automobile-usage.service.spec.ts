import { DriverLocalRepository } from 'modules/drivers/repositories/driver.local.repository';
import { DriverRepository } from 'modules/drivers/repositories/driver.repository';

import { StartAutomobileUsageBo } from '../bos/automobile-usage.bo';
import { AutomobileLocalRepository } from '../repositories/automobile-local.repository';
import { AutomobileUsageLocalRepository } from '../repositories/automobile-usage.local.repository';
import { AutomobileUsageRepository } from '../repositories/automobile-usage.repository';
import { AutomobileRepository } from '../repositories/automobile.repository';
import { AutomobileUsageService } from './automobile-usage.service';

describe('AutomobileUsageService', () => {
  let driverRepository: DriverRepository;
  let automobileRepository: AutomobileRepository;
  let automobileUsageRepository: AutomobileUsageRepository;
  let automobileUsageService: AutomobileUsageService;

  beforeEach(async () => {
    driverRepository = new DriverLocalRepository();
    automobileRepository = new AutomobileLocalRepository();
    automobileUsageRepository = new AutomobileUsageLocalRepository();
    automobileUsageService = new AutomobileUsageService(
      automobileUsageRepository,
    );
  });

  it('should start an automobile usage', async () => {
    // Arrange
    const driver = await driverRepository.create({
      name: 'John Doe',
    });
    const automobile = await automobileRepository.create({
      brand: 'Chevrolet',
      color: 'black',
      licensePlate: 'ABC-1234',
    });
    const data: StartAutomobileUsageBo = {
      automobileId: automobile.id,
      driverId: driver.id,
      reason: 'Travel to the beach',
    };

    // Act
    const automobileUsage = await automobileUsageService.start(data);

    // Assert
    expect(automobileUsage).toBeDefined();
    expect(automobileUsage.automobileId).toBe(data.automobileId);
    expect(automobileUsage.driverId).toBe(data.driverId);
    expect(automobileUsage.reason).toBe(data.reason);
    expect(automobileUsage.finishedAt).toBe(null);
  });
});
