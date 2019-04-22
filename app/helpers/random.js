import randomize from "randomatic";

export const randomPin = length => {
  return randomize("0", length);
};

export const lowercaseString = length => {
  return randomize("a", length);
};

export const uppercaseString = length => {
  return randomize("A", length);
};

export const specialString = length => {
  return randomize("!", length);
};

export const mixedString = length => {
  return randomize("*", length);
};
