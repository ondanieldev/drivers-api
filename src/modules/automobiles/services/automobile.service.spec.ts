import { AutomobileNotFoundError } from '../errors/automobile.error';
import { createAutomobileSamples } from '../mocks/automobile.mock';
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
    // Act
    const automobile = await automobileService.create(
      createAutomobileSamples[0],
    );

    // Assert
    expect(automobile).toBeDefined();
    expect(automobile.brand).toBe(createAutomobileSamples[0].brand);
    expect(automobile.color).toBe(createAutomobileSamples[0].color);
    expect(automobile.licensePlate).toBe(
      createAutomobileSamples[0].licensePlate,
    );
  });

  it('should update an automobile', async () => {
    // Arrange
    const automobile = await automobileService.create(
      createAutomobileSamples[0],
    );

    // Act
    const updatedAutomobile = await automobileService.update({
      data: createAutomobileSamples[1],
      id: automobile.id,
    });

    // Assert
    expect(updatedAutomobile).toBeDefined();
    expect(updatedAutomobile.brand).toBe(createAutomobileSamples[1].brand);
    expect(updatedAutomobile.color).toBe(createAutomobileSamples[1].color);
    expect(updatedAutomobile.licensePlate).toBe(
      createAutomobileSamples[1].licensePlate,
    );
  });

  it('should NOT update an automobile that does not exist', async () => {
    // Assert
    await expect(
      automobileService.update({
        data: createAutomobileSamples[0],
        id: 'non-existing-id',
      }),
    ).rejects.toThrow(AutomobileNotFoundError);
  });

  it('should read automobile list', async () => {
    // Arrange
    for (const createData of createAutomobileSamples.slice(0, 2)) {
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
    for (const createData of createAutomobileSamples.slice(0, 2)) {
      await automobileService.create(createData);
    }

    // Act
    const automobileList = await automobileService.readList({
      brand: createAutomobileSamples[1].brand.toUpperCase().substring(1, 4),
    });

    // Assert
    expect(automobileList).toBeDefined();
    expect(automobileList.length).toBe(1);
    expect(automobileList[0].brand).toBe(createAutomobileSamples[1].brand);
  });

  it('should read automobile list filtering by color', async () => {
    // Arrange
    for (const createData of createAutomobileSamples) {
      await automobileService.create(createData);
    }

    // Act
    const automobileList = await automobileService.readList({
      color: createAutomobileSamples[1].color.toUpperCase().substring(1, 4),
    });

    // Assert
    expect(automobileList).toBeDefined();
    expect(automobileList.length).toBe(1);
    expect(automobileList[0].color).toBe(createAutomobileSamples[1].color);
  });

  it('should read automobile by id', async () => {
    // Arrange
    const createdAutomobile = await automobileService.create(
      createAutomobileSamples[0],
    );

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
    const automobile = await automobileService.create(
      createAutomobileSamples[0],
    );

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
