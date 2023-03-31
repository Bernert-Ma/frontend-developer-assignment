export const mockedOnRemoveEmailResultData = [
  {
    id: 4,
    domain: "t.com",
    data: [
      {
        id: 2,
        email: "second@t.com",
        isSelected: true,
      },
    ],
  },
  {
    id: 5,
    domain: "a.com",
    data: [
      {
        id: 3,
        email: "third@a.com",
        isSelected: false,
      },
    ],
  },
];

export const mockedOnRemoveDomainResultData = [
  {
    id: 5,
    domain: "a.com",
    data: [
      {
        id: 3,
        email: "third@a.com",
        isSelected: false,
      },
    ],
  },
];

export const mockedGroupedOptionsResultData = [
  {
    label: "t.com",
    options: [
      { value: "1", label: "first@t.com" },
      { value: "2", label: "second@t.com" },
    ],
  },
  { label: "a.com", options: [{ value: "3", label: "third@a.com" }] },
];
