import { DriverLocalRepository } from 'modules/drivers/repositories/driver.local.repository';
import { DriverRepository } from 'modules/drivers/repositories/driver.repository';
import { DriverService } from 'modules/drivers/services/driver.service';

import { StartAutomobileUsageBo } from '../bos/automobile-usage.bo';
import {
  AutomobileUnfinishedUsageConflictError,
  AutomobileUsageAlreadyFinishedConflictError,
  AutomobileUsageNotFoundError,
  DriverUnfinishedUsageConflictError,
} from '../errors/automobile-usage.error';
import { AutomobileLocalRepository } from '../repositories/automobile-local.repository';
import { AutomobileUsageLocalRepository } from '../repositories/automobile-usage.local.repository';
import { AutomobileUsageRepository } from '../repositories/automobile-usage.repository';
import { AutomobileRepository } from '../repositories/automobile.repository';
import { AutomobileUsageService } from './automobile-usage.service';
import { AutomobileService } from './automobile.service';

describe('AutomobileUsageService', () => {
  let driverRepository: DriverRepository;
  let automobileRepository: AutomobileRepository;
  let automobileUsageRepository: AutomobileUsageRepository;
  let automobileService: AutomobileService;
  let driverService: DriverService;
  let automobileUsageService: AutomobileUsageService;

  beforeEach(async () => {
    driverRepository = new DriverLocalRepository();
    automobileRepository = new AutomobileLocalRepository();
    automobileUsageRepository = new AutomobileUsageLocalRepository(
      automobileRepository,
      driverRepository,
    );
    automobileService = new AutomobileService(automobileRepository);
    driverService = new DriverService(driverRepository);
    automobileUsageService = new AutomobileUsageService(
      automobileService,
      driverService,
      automobileUsageRepository,
    );
  });

  it('should start an automobile usage', async () => {
    // Arrange
    const driver = await driverService.create({
      name: 'John Doe',
    });
    const automobile = await automobileService.create({
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

  it('should NOT start an automobile usage for a driver that is already using an automobile', async () => {
    // Arrange
    const driver = await driverService.create({
      name: 'John Doe',
    });
    const automobile = await automobileService.create({
      brand: 'Chevrolet',
      color: 'black',
      licensePlate: 'ABC-1234',
    });
    const automobile2 = await automobileService.create({
      brand: 'Honda',
      color: 'white',
      licensePlate: 'XYZ-6789',
    });
    await automobileUsageService.start({
      automobileId: automobile.id,
      driverId: driver.id,
      reason: 'Travel to the beach',
    });

    // Assert
    await expect(
      automobileUsageService.start({
        automobileId: automobile2.id,
        driverId: driver.id,
        reason: 'Go to the mall',
      }),
    ).rejects.toThrow(DriverUnfinishedUsageConflictError);
  });

  it('should NOT start an automobile usage for an automobile that is already being used', async () => {
    // Arrange
    const driver = await driverService.create({
      name: 'John Doe',
    });
    const driver2 = await driverService.create({
      name: 'John Doe 2',
    });
    const automobile = await automobileService.create({
      brand: 'Chevrolet',
      color: 'black',
      licensePlate: 'ABC-1234',
    });
    await automobileUsageService.start({
      automobileId: automobile.id,
      driverId: driver.id,
      reason: 'Travel to the beach',
    });

    // Assert
    await expect(
      automobileUsageService.start({
        automobileId: automobile.id,
        driverId: driver2.id,
        reason: 'Go to the mall',
      }),
    ).rejects.toThrow(AutomobileUnfinishedUsageConflictError);
  });

  it('should finish an automobile usage', async () => {
    // Arrange
    const driver = await driverService.create({
      name: 'John Doe',
    });
    const automobile = await automobileService.create({
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
    const driver = await driverService.create({
      name: 'John Doe',
    });
    const automobile = await automobileService.create({
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
    const driver1 = await driverService.create({
      name: 'John Doe',
    });
    const automobile1 = await automobileService.create({
      brand: 'Chevrolet',
      color: 'black',
      licensePlate: 'ABC-1234',
    });
    const driver2 = await driverService.create({
      name: 'John Doe',
    });
    const automobile2 = await automobileService.create({
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
