import { mockedData, mockedResultData } from "../../../mocks/layout.mocks";
import {
  mockedOnRemoveEmailResultData,
  mockedOnRemoveDomainResultData,
  mockedGroupedOptionsResultData,
} from "../../../mocks/availableRecipient.mocks";
import { IAvailableRecipient } from "../../../models/recipients.model";
import { getAvailableRecipient } from "../../helpers";
import { onRemoveEmail, onRemoveDomain, getGroupedOptions } from "../helpers";

describe("onRemoveEmail", () => {
  it("should return an array of recipients", () => {
    const availableRecipients: IAvailableRecipient[] =
      getAvailableRecipient(mockedData);
    expect(availableRecipients).toEqual(mockedResultData);

    const result = onRemoveEmail(
      availableRecipients,
      availableRecipients[0].data[0].id
    );
    expect(result).toEqual(mockedOnRemoveEmailResultData);
  });

  it("should return null when id is null", () => {
    const availableRecipients: IAvailableRecipient[] =
      getAvailableRecipient(mockedData);
    expect(availableRecipients).toEqual(mockedResultData);

    const result = onRemoveEmail(availableRecipients, null);
    expect(result).toEqual(null);
  });

  it("should return null when id is undefined", () => {
    const availableRecipients: IAvailableRecipient[] =
      getAvailableRecipient(mockedData);
    expect(availableRecipients).toEqual(mockedResultData);

    const result = onRemoveEmail(availableRecipients, undefined);
    expect(result).toEqual(null);
  });
});

describe("onRemoveDomain", () => {
  it("should return an array of recipients", () => {
    const availableRecipients: IAvailableRecipient[] =
      getAvailableRecipient(mockedData);
    expect(availableRecipients).toEqual(mockedResultData);

    const result = onRemoveDomain(
      availableRecipients,
      availableRecipients[0].id
    );
    expect(result).toEqual(mockedOnRemoveDomainResultData);
  });

  it("should return null when id is null", () => {
    const availableRecipients: IAvailableRecipient[] =
      getAvailableRecipient(mockedData);
    expect(availableRecipients).toEqual(mockedResultData);

    const result = onRemoveDomain(availableRecipients, null);
    expect(result).toEqual(null);
  });

  it("should return null when id is undefined", () => {
    const availableRecipients: IAvailableRecipient[] =
      getAvailableRecipient(mockedData);
    expect(availableRecipients).toEqual(mockedResultData);

    const result = onRemoveDomain(availableRecipients, undefined);
    expect(result).toEqual(null);
  });
});

describe("getGroupedOptions", () => {
  it("should return an array of grouped options", () => {
    const availableRecipients: IAvailableRecipient[] =
      getAvailableRecipient(mockedData);
    expect(availableRecipients).toEqual(mockedResultData);

    const result = getGroupedOptions(availableRecipients);
    expect(result).toEqual(mockedGroupedOptionsResultData);
  });

  it("should return an empty array", () => {
    const availableRecipients: IAvailableRecipient[] = getAvailableRecipient(
      []
    );
    expect(availableRecipients).toEqual([]);

    const result = getGroupedOptions(availableRecipients);
    expect(result).toEqual([]);
  });
});
