import { IAvailableRecipient } from "../../models/recipients.model";
import { getAvailableRecipient } from "../helpers";

const mockedData = [
  {
    email: "first@domainOne.com",
    isSelected: false,
  },
  {
    email: "second@domainOne.com",
    isSelected: true,
  },
  {
    email: "thired@domainTwo.com",
    isSelected: false,
  },
];

describe("getAvailableRecipient", () => {
  it("should return an array of recipients", () => {
    const availableRecipients: IAvailableRecipient[] =
      getAvailableRecipient(mockedData);
    const expectedResult: IAvailableRecipient[] = [
      {
        id: 4,
        domain: "domainOne.com",
        data: [
          {
            id: 1,
            email: "first@domainOne.com",
            isSelected: false,
          },
          {
            id: 2,
            email: "second@domainOne.com",
            isSelected: true,
          },
        ],
      },
      {
        id: 5,
        domain: "domainTwo.com",
        data: [
          {
            id: 3,
            email: "thired@domainTwo.com",
            isSelected: false,
          },
        ],
      },
    ];

    expect(availableRecipients).toEqual(expectedResult);
  });
});
