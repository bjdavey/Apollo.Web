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

