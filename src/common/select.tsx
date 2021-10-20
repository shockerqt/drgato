import '../styles/select.scss';

import { FocusEvent, KeyboardEvent, MouseEvent, useEffect, useState } from 'react';

import { RightIcon } from '.';

type Option = {
  label: string,
  value: string | number,
}

const useOptions = (
  options: Option[],
  selected: Option,
  setSelected: React.Dispatch<React.SetStateAction<Option>>,
) => {
  const [optionList, setOptionList] = useState(<div></div>);

  const handleClick = (
    event: MouseEvent,
    label: string,
    value: string | number,
  ) => {
    const element = event.target as HTMLElement;
    setSelected({ label, value });
    element.blur();
  };

  useEffect(() => setOptionList(
    <>
      {options.map(({ label, value }) => (
        <button
          className={`option-item ${selected.value === value ? 'option-selected' : ''}`}
          key={value}
          onClick={(event) => handleClick(event, label, value)}
          autoFocus={selected.value === value}>
          {label}
        </button>
      ))}
    </>
  ), [options, selected]);

  return optionList;
};

const useDisplay = (
  label:string,
  selected: Option,
) => {
  const [display, setDisplay] = useState(<div></div>);

  useEffect(() => {
    setDisplay(
      <>
        <p className="display-label">{label}</p>
        <p className="display-selection">{selected.label}</p>
      </>
    );
  }, [label, selected]);

  return display;
};

export const Select = ({ label, options, initSelected }: {
  label: string,
  options: Option[],
  initSelected: Option,
}) => {

  const [selected, setSelected] = useState(initSelected);
  const [opened, setOpened] = useState(false);

  const display = useDisplay(label, selected);
  const optionList = useOptions(options, selected, setSelected);

  const handleClick = () => {
    setOpened(!opened);
  };

  const handleBlur = (event: FocusEvent) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setOpened(false);
    }
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.code === 'Escape') setOpened(false);
  };

  return (
    <div
      className={`select-root${opened ? ' select-opened' : ''}`}
      onBlur={handleBlur}
      onKeyUp={handleKeyPress}>
      <button
        className="select-container"
        onClick={handleClick}>
        {display}
        <RightIcon />
      </button>
      {opened ?
        <div className="options-container">
          {optionList}
        </div> : ''}
    </div>
  );
};
