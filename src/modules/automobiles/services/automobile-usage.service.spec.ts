import { DriverLocalRepository } from 'modules/drivers/repositories/driver.local.repository';
import { DriverRepository } from 'modules/drivers/repositories/driver.repository';

import { StartAutomobileUsageBo } from '../bos/automobile-usage.bo';
import {
  AutomobileUsageAlreadyFinishedConflictError,
  AutomobileUsageNotFoundError,
} from '../errors/automobile-usage.error';
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
    automobileUsageRepository = new AutomobileUsageLocalRepository(
      automobileRepository,
      driverRepository,
    );
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
    expect(automobileUsage.finishedAt).toBeNull();
  });

  it('should finish an automobile usage', async () => {
    // Arrange
    const driver = await driverRepository.create({
      name: 'John Doe',
    });
    const automobile = await automobileRepository.create({
      brand: 'Chevrolet',
      color: 'black',
      licensePlate: 'ABC-1234',
    });
    const automobileUsage = await automobileUsageService.start({
      automobileId: automobile.id,
      driverId: driver.id,
      reason: 'Travel to the beach',
    });

    // Act
    const finishedAutomobileUsage = await automobileUsageService.finish(
      automobileUsage.id,
    );

    // Assert
    expect(finishedAutomobileUsage).toBeDefined();
    expect(finishedAutomobileUsage.id).toBe(automobileUsage.id);
    expect(automobileUsage.finishedAt).not.toBeNull();
  });

  it('should NOT finish an automobile usage that does not exist', async () => {
    // Assert
    await expect(
      automobileUsageService.finish('non-existing-id'),
    ).rejects.toThrow(AutomobileUsageNotFoundError);
  });

  it('should NOT finish an automobile usage that is already finished', async () => {
    // Arrange
    const driver = await driverRepository.create({
      name: 'John Doe',
    });
    const automobile = await automobileRepository.create({
      brand: 'Chevrolet',
      color: 'black',
      licensePlate: 'ABC-1234',
    });
    const automobileUsage = await automobileUsageService.start({
      automobileId: automobile.id,
      driverId: driver.id,
      reason: 'Travel to the beach',
    });
    await automobileUsageService.finish(automobileUsage.id);

    // Assert
    await expect(
      automobileUsageService.finish(automobileUsage.id),
    ).rejects.toThrow(AutomobileUsageAlreadyFinishedConflictError);
  });

  it('should read automobile list with automobile and driver data', async () => {
    // Arrange
    const driver1 = await driverRepository.create({
      name: 'John Doe',
    });
    const automobile1 = await automobileRepository.create({
      brand: 'Chevrolet',
      color: 'black',
      licensePlate: 'ABC-1234',
    });
    const driver2 = await driverRepository.create({
      name: 'John Doe',
    });
    const automobile2 = await automobileRepository.create({
      brand: 'Chevrolet',
      color: 'black',
      licensePlate: 'ABC-1234',
    });
    await automobileUsageService.start({
      automobileId: automobile1.id,
      driverId: driver1.id,
      reason: 'Travel to the beach',
    });
    await automobileUsageService.start({
      automobileId: automobile2.id,
      driverId: driver2.id,
      reason: 'Go to the mall',
    });

    // Act
    const automobileUsages = await automobileUsageService.readList();

    // Assert
    expect(automobileUsages.length).toBe(2);
    expect(automobileUsages[0].automobile).toBeDefined();
    expect(automobileUsages[0].driver).toBeDefined();
  });
});
