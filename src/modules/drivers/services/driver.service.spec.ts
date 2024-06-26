import { CreateDriverBo, UpdateDriverBo } from '../bos/driver.bo';
import { DriverNotFoundError } from '../errors/driver.error';
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
    // Arrange
    const data: CreateDriverBo = {
      name: 'John Doe',
    };

    // Act
    const driver = await driverService.create(data);

    // Assert
    expect(driver).toBeDefined();
    expect(driver.name).toBe(data.name);
  });

  it('should update a driver', async () => {
    // Arrange
    const createData: CreateDriverBo = {
      name: 'John Doe',
    };
    const driver = await driverService.create(createData);

    const updateData: UpdateDriverBo = {
      name: 'Jane Doe',
    };

    // Act
    const updatedDriver = await driverService.update({
      data: updateData,
      id: driver.id,
    });

    // Assert
    expect(updatedDriver).toBeDefined();
    expect(updatedDriver.name).toBe(updateData.name);
  });

  it('should NOT update a driver that does not exist', async () => {
    // Arrange
    const data: UpdateDriverBo = {
      name: 'John Doe',
    };

    // Assert
    await expect(
      driverService.update({
        data: data,
        id: 'non-existing-id',
      }),
    ).rejects.toThrow(DriverNotFoundError);
  });

  it('should read driver list', async () => {
    // Arrange
    const createDataList: CreateDriverBo[] = [
      {
        name: 'John Doe',
      },
      {
        name: 'Jane Doe',
      },
    ];

    for (const createData of createDataList) {
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
    const createDataList: CreateDriverBo[] = [
      {
        name: 'John Doe',
      },
      {
        name: 'Jane Doe',
      },
    ];

    for (const createData of createDataList) {
      await driverService.create(createData);
    }

    // Act
    const driverList = await driverService.readList({
      name: 'john',
    });

    // Assert
    expect(driverList).toBeDefined();
    expect(driverList.length).toBe(1);
    expect(driverList[0].name).toBe('John Doe');
  });

  it('should read driver by id', async () => {
    // Arrange
    const createData: CreateDriverBo = {
      name: 'John Doe',
    };

    const createdDriver = await driverService.create(createData);

    // Act
    const readDriver = await driverService.readById(createdDriver.id);

    // Assert
    expect(readDriver).toBeDefined();
    expect(readDriver.id).toBe(createdDriver.id);
  });

  it('should delete a driver', async () => {
    // Arrange
    const createData: CreateDriverBo = {
      name: 'John Doe',
    };

    const driver = await driverService.create(createData);

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
