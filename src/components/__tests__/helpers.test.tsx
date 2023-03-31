import { IAvailableRecipient } from "../../models/recipients.model";
import { getAvailableRecipient } from "../helpers";
import { mockedData, mockedResultData } from "../../mocks/layout.mocks";

describe("getAvailableRecipient", () => {
  it("should return an array of recipients", () => {
    const availableRecipients: IAvailableRecipient[] =
      getAvailableRecipient(mockedData);
    expect(availableRecipients).toEqual(mockedResultData);
  });

  it("should return an empty array", () => {
    const availableRecipients: IAvailableRecipient[] = getAvailableRecipient(
      []
    );
    expect(availableRecipients).toEqual([]);
  });
});
