import React, { useState, StrictMode } from "react";
import { Listbox, ListboxOption } from "@reach/listbox";
import { action } from "@storybook/addon-actions";
import "@reach/listbox/styles.css";

let name = "Basic (Strict Mode)";

type Option = { value: string; label: string };

function Example() {
  let actionHandler = action("Value Change");
  let [value, setValue] = useState("default");
  let [newOption, setNewOption] = useState("");
  let [newOptions, setNewOptions] = useState<Option[]>([]);
  let taco = <span aria-hidden>🌮</span>;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!newOption.trim()) {
      return;
    }
    setNewOptions([
      ...newOptions,
      {
        value: newOption.toLowerCase().replace(" ", ""),
        label: cleanString(newOption),
      },
    ]);
    setNewOption("");
  }

  return (
    <StrictMode>
      <Listbox
        value={value}
        onChange={value => {
          setValue(value);
          actionHandler(value);
        }}
      >
        <ListboxOption value="default">{taco} Choose a taco</ListboxOption>
        <hr />

        <form onSubmit={handleSubmit}>
          <label>
            <span>Add another option</span>
            <input
              type="text"
              value={newOption}
              onChange={event => setNewOption(event.target.value)}
            />
          </label>
          <button type="submit">Add it!</button>
        </form>
        <hr />
        <ListboxOption value="asada" label="Carne Asada">
          {taco} Carne Asada
        </ListboxOption>
        <ListboxOption value="pollo" label="Pollo">
          {taco} Pollo
        </ListboxOption>
        <ListboxOption value="pastor" label="Pastor">
          {taco} Pastor
        </ListboxOption>
        <ListboxOption value="lengua" label="Lengua">
          {taco} Lengua
        </ListboxOption>
        {newOptions.map(option => (
          <ListboxOption
            key={option.value}
            value={option.value}
            label={option.label}
          >
            {taco} {option.label}
          </ListboxOption>
        ))}
      </Listbox>
    </StrictMode>
  );
}

function cleanString(string: string) {
  return string
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
    .split(" ")
    .map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

Example.story = { name };
export const Comp = Example;
export default { title: "Listbox" };