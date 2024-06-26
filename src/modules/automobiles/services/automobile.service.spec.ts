import { CreateAutomobileBo, UpdateAutomobileBo } from '../bos/automobile.bo';
import { AutomobileNotFoundError } from '../errors/automobile.error';
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

  it('should update an automobile', async () => {
    // Arrange
    const createData: CreateAutomobileBo = {
      brand: 'Toyota',
      color: 'black',
      licensePlate: 'ABC-1234',
    };
    const automobile = await automobileService.create(createData);

    const updateData: UpdateAutomobileBo = {
      brand: 'Honda',
      color: 'white',
      licensePlate: 'XYZ-9876',
    };

    // Act
    const updatedAutomobile = await automobileService.update({
      data: updateData,
      id: automobile.id,
    });

    // Assert
    expect(updatedAutomobile).toBeDefined();
    expect(updatedAutomobile.brand).toBe(updateData.brand);
    expect(updatedAutomobile.color).toBe(updateData.color);
    expect(updatedAutomobile.licensePlate).toBe(updateData.licensePlate);
  });

  it('should NOT update an automobile that does not exist', async () => {
    // Arrange
    const data: UpdateAutomobileBo = {
      brand: 'Honda',
      color: 'white',
      licensePlate: 'XYZ-9876',
    };

    // Assert
    await expect(
      automobileService.update({
        data: data,
        id: 'non-existing-id',
      }),
    ).rejects.toThrow(AutomobileNotFoundError);
  });

  it('should read automobile list', async () => {
    // Arrange
    const createDataList: CreateAutomobileBo[] = [
      {
        brand: 'Toyota',
        color: 'black',
        licensePlate: 'ABC-1234',
      },
      {
        brand: 'Honda',
        color: 'white',
        licensePlate: 'XYZ-9876',
      },
    ];

    for (const createData of createDataList) {
      await automobileService.create(createData);
    }

    // Act
    const automobileList = await automobileService.readList({});

    // Assert
    expect(automobileList).toBeDefined();
    expect(automobileList.length).toBe(2);
  });

  it('should read automobile list filtering by brand', async () => {
    // Arrange
    const createDataList: CreateAutomobileBo[] = [
      {
        brand: 'Toyota',
        color: 'black',
        licensePlate: 'ABC-1234',
      },
      {
        brand: 'Honda',
        color: 'white',
        licensePlate: 'XYZ-9876',
      },
    ];

    for (const createData of createDataList) {
      await automobileService.create(createData);
    }

    // Act
    const automobileList = await automobileService.readList({
      brand: 'Toyota',
    });

    // Assert
    expect(automobileList).toBeDefined();
    expect(automobileList.length).toBe(1);
    expect(automobileList[0].brand).toBe('Toyota');
  });

  it('should read automobile list filtering by color', async () => {
    // Arrange
    const createDataList: CreateAutomobileBo[] = [
      {
        brand: 'Toyota',
        color: 'black',
        licensePlate: 'ABC-1234',
      },
      {
        brand: 'Honda',
        color: 'white',
        licensePlate: 'XYZ-9876',
      },
    ];

    for (const createData of createDataList) {
      await automobileService.create(createData);
    }

    // Act
    const automobileList = await automobileService.readList({
      color: 'white',
    });

    // Assert
    expect(automobileList).toBeDefined();
    expect(automobileList.length).toBe(1);
    expect(automobileList[0].color).toBe('white');
  });

  it('should read automobile by id', async () => {
    // Arrange
    const createData: CreateAutomobileBo = {
      brand: 'Toyota',
      color: 'black',
      licensePlate: 'ABC-1234',
    };

    const createdAutomobile = await automobileService.create(createData);

    // Act
    const readAutomobile = await automobileService.readById(
      createdAutomobile.id,
    );

    // Assert
    expect(readAutomobile).toBeDefined();
    expect(readAutomobile.id).toBe(createdAutomobile.id);
  });

  it('should delete an automobile', async () => {
    // Arrange
    const createData: CreateAutomobileBo = {
      brand: 'Toyota',
      color: 'black',
      licensePlate: 'ABC-1234',
    };

    const automobile = await automobileService.create(createData);

    // Act
    await automobileService.delete(automobile.id);

    // Assert
    await expect(automobileService.readById(automobile.id)).rejects.toThrow(
      AutomobileNotFoundError,
    );
  });

  it('should NOT delete an automobile that does not exist', async () => {
    // Assert
    await expect(automobileService.delete('non-existing-id')).rejects.toThrow(
      AutomobileNotFoundError,
    );
  });
});
