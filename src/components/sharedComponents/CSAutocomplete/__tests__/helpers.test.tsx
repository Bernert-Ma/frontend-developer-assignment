import { cleanup } from "@testing-library/react";
import { mockedResultData } from "../../../../mocks/layout.mocks";
import {
  onCreateNewOption,
  onCreateOption,
  onSelecteNewValue,
} from "../helpers";

describe("onCreateNewOption", () => {
  afterEach(() => {
    cleanup();
  });

  it("should return a new option", () => {
    const newOption = onCreateNewOption("t@test.com");
    expect(newOption).toEqual({ label: "t@test.com", value: newOption.value });
  });
});

describe("onCreateOption", () => {
  afterEach(() => {
    cleanup();
  });

  it("should return updated option domain", () => {
    const newOption = onCreateNewOption("t@a.com");
    expect(newOption).toEqual({ label: "t@a.com", value: newOption.value });
    const options = onCreateOption("t@a.com", newOption, mockedResultData);
    const result = [
      {
        id: 4,
        domain: "t.com",
        data: [
          { id: 1, email: "first@t.com", isSelected: false },
          { id: 2, email: "second@t.com", isSelected: true },
        ],
      },
      {
        id: 5,
        domain: "a.com",
        data: [
          { id: 3, email: "third@a.com", isSelected: false },
          options[1].data[1],
        ],
      },
    ];
    expect(options).toEqual(result);
  });

  it("should return new option domain", () => {
    const newOption = onCreateNewOption("t@test.com");
    expect(newOption).toEqual({ label: "t@test.com", value: newOption.value });
    const options = onCreateOption("t@test.com", newOption, mockedResultData);
    const result = [
      {
        id: 4,
        domain: "t.com",
        data: [
          { id: 1, email: "first@t.com", isSelected: false },
          { id: 2, email: "second@t.com", isSelected: true },
        ],
      },
      {
        id: 5,
        domain: "a.com",
        data: [
          { id: 3, email: "third@a.com", isSelected: false },
          options[1].data[1],
        ],
      },
      {
        id: options[2].id,
        domain: "test.com",
        data: [
          { id: options[2].data[0].id, email: "t@test.com", isSelected: false },
        ],
      },
    ];
    expect(options).toEqual(result);
  });
});

describe("onSelecteNewValue", () => {
  afterEach(() => {
    cleanup();
  });

  it("should set isSelected prop to true when isSelected prop of selected option was false", () => {
    const updatedRecipients = onSelecteNewValue(
      { value: "1", label: "first@t.com" },
      mockedResultData
    );
    expect(updatedRecipients[0].data[0].isSelected).toEqual(true);
  });

  it("should set isSelected prop to false when isSelected prop of selected option was true", () => {
    const updatedRecipients = onSelecteNewValue(
      { value: "2", label: "second@t.com" },
      mockedResultData
    );
    expect(updatedRecipients[0].data[1].isSelected).toEqual(false);
  });
});
