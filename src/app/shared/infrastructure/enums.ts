export enum USER_STATUS {
  active = 1,
  disabled = 2,
  pending = 3,
}

export const UserStatuses: {
  id: USER_STATUS,
  text: string,
}[] = [
    {
      id: USER_STATUS.active,
      text: "Active",
    },
    {
      id: USER_STATUS.disabled,
      text: "Disabled",
    },
    {
      id: USER_STATUS.pending,
      text: "Pending",
    },
  ]

export enum USER_TYPE {
  admin = 1,
  operation = 2,
  provider = 3,
  customer = 4,
}

export const UserTypes: {
  id: USER_TYPE,
  text: string,
}[] = [
    {
      id: USER_TYPE.admin,
      text: "Admin",
    },
    {
      id: USER_TYPE.operation,
      text: "Operation",
    },
    {
      id: USER_TYPE.provider,
      text: "Provider",
    },
    {
      id: USER_TYPE.customer,
      text: "Customer",
    },
  ]


export enum VEHICLE_TYPE {
  motorcycle = 1,
  sedan = 2,
  luxury = 3,
  truck = 4,
}

export const VehicleTypes: {
  id: VEHICLE_TYPE,
  text: string,
}[] = [
    {
      id: VEHICLE_TYPE.motorcycle,
      text: "Motorcycle",
    },
    {
      id: VEHICLE_TYPE.sedan,
      text: "Sedan",
    },
    {
      id: VEHICLE_TYPE.luxury,
      text: "Luxury",
    },
    {
      id: VEHICLE_TYPE.truck,
      text: "Truck",
    },
  ]

export enum PRICE_MODEL {
  perKM = 1,
  perHour = 2,
}

export const VehiclePriceModels: {
  id: PRICE_MODEL,
  text: string,
}[] = [
    {
      id: PRICE_MODEL.perKM,
      text: "Per Distance (KM)",
    },
    {
      id: PRICE_MODEL.perHour,
      text: "Per Time (Hour)",
    },
  ]






export enum VEHICLE_STATUS {
  active = 1,
  disabled = 2,
  running = 3,
}

export const VehicleStatuses: {
  id: VEHICLE_STATUS,
  text: string,
}[] = [
    {
      id: VEHICLE_STATUS.active,
      text: "Active",
    },
    {
      id: VEHICLE_STATUS.disabled,
      text: "Disabled",
    },
    {
      id: VEHICLE_STATUS.running,
      text: "Running",
    },
  ]


export enum ORDER_STATUS {
  created = 1,
  running = 2,
  ended = 3,
  paid = 4,
}

export const OrderStatuses: {
  id: ORDER_STATUS,
  text: string,
}[] = [
    {
      id: ORDER_STATUS.created,
      text: "Created",
    },
    {
      id: ORDER_STATUS.running,
      text: "Running",
    },
    {
      id: ORDER_STATUS.ended,
      text: "Ended",
    },
    {
      id: ORDER_STATUS.paid,
      text: "Paid",
    },
  ]

export const Brands: string[] = [
  "Toyota", "Volkswagen", "Hyundai", "General Motors",
  "Ford", "Nissan", "Honda", "Fiat Chrysler",
  "BMW", "Mercedes-Benz", "Kia", "Peugeot",
  "Suzuki", "Renault", "Audi", "Chevrolet",
  "Tesla", "Subaru", "Mazda", "Daimler"
]

export const Years: number[] = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009,
  2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019,
  2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]

