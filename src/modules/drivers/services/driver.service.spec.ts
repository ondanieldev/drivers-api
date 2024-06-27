import { DriverNotFoundError } from '../errors/driver.error';
import { createDriverSamples } from '../mocks/driver.mock';
import { DriverLocalRepository } from '../repositories/driver.local.repository';
import { DriverRepository } from '../repositories/driver.repository';
import { DriverService } from './driver.service';

describe('DriverService', () => {
  let driverService: DriverService;
  let driverRepository: DriverRepository;

  beforeEach(async () => {
    driverRepository = new DriverLocalRepository();
    driverService = new DriverService(driverRepository);
  });

  it('should create a driver', async () => {
    // Act
    const driver = await driverService.create(createDriverSamples[0]);

    // Assert
    expect(driver).toBeDefined();
    expect(driver.name).toBe(createDriverSamples[0].name);
  });

  it('should update a driver', async () => {
    // Arrange
    const driver = await driverService.create(createDriverSamples[0]);

    // Act
    const updatedDriver = await driverService.update({
      data: createDriverSamples[1],
      id: driver.id,
    });

    // Assert
    expect(updatedDriver).toBeDefined();
    expect(updatedDriver.name).toBe(createDriverSamples[1].name);
  });

  it('should NOT update a driver that does not exist', async () => {
    // Assert
    await expect(
      driverService.update({
        data: createDriverSamples[0],
        id: 'non-existing-id',
      }),
    ).rejects.toThrow(DriverNotFoundError);
  });

  it('should read driver list', async () => {
    // Arrange
    for (const createData of createDriverSamples.slice(0, 2)) {
      await driverService.create(createData);
    }

    // Act
    const driverList = await driverService.readList({});

    // Assert
    expect(driverList).toBeDefined();
    expect(driverList.length).toBe(2);
  });

  it('should read driver list filtering by name', async () => {
    // Arrange
    for (const createData of createDriverSamples.slice(0, 2)) {
      await driverService.create(createData);
    }

    // Act
    const driverList = await driverService.readList({
      name: createDriverSamples[1].name.toUpperCase().substring(1, 4),
    });

    // Assert
    expect(driverList).toBeDefined();
    expect(driverList.length).toBe(1);
    expect(driverList[0].name).toBe(createDriverSamples[1].name);
  });

  it('should read driver by id', async () => {
    // Arrange
    const createdDriver = await driverService.create(createDriverSamples[0]);

    // Act
    const readDriver = await driverService.readById(createdDriver.id);

    // Assert
    expect(readDriver).toBeDefined();
    expect(readDriver.id).toBe(createdDriver.id);
  });

  it('should delete a driver', async () => {
    // Arrange
    const driver = await driverService.create(createDriverSamples[0]);

    // Act
    await driverService.delete(driver.id);

    // Assert
    await expect(driverService.readById(driver.id)).rejects.toThrow(
      DriverNotFoundError,
    );
  });

  it('should NOT delete a driver that does not exist', async () => {
    // Assert
    await expect(driverService.delete('non-existing-id')).rejects.toThrow(
      DriverNotFoundError,
    );
  });
});
