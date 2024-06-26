export class AutomobileEntity {
  constructor(data: AutomobileEntity) {
    Object.assign(this, data);
  }

  id: string;
  brand: string;
  color: string;
  licensePlate: string;
}
