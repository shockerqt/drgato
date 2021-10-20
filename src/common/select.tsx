import '../styles/select.scss';

import { useEffect, useRef, useState } from 'react';

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
    label: string,
    value: string | number,
  ) => {
    setSelected({ label, value });
  };

  useEffect(() => setOptionList(
    <>
      {options.map(({ label, value }) => (
        <div
          className={`option-item ${selected.value === value ? 'option-selected' : ''}`}
          key={value}
          onClick={() => handleClick(label, value)}>
          {label}
        </div>
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

const Options = ({ optionList, opened, setOpened }:
  {
    optionList: JSX.Element,
    opened: boolean,
    setOpened: React.Dispatch<React.SetStateAction<boolean>>,
  }
) => {
  const optionsRef = useRef(null);

  useEffect(() => {
    const listener = (event: Event) => {
      const element = optionsRef.current as unknown as Node;
      const inside = element.contains(event.target as Node);
      if (!inside) {
        setOpened(false);
        window.removeEventListener('click', listener);
      }
    };

    if (opened) window.addEventListener('click', listener);

    return () => window.removeEventListener('click', listener);
  }, [opened]);

  return (
    <div className="options-container" ref={optionsRef}>
      {optionList}
    </div>
  );
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

  useEffect(() => {
    setOpened(false);
  }, [selected]);


  const handleClick = () => {
    if (!opened) setOpened(true);
  };

  return (
    <div className="select-root">
      <div className="select-container"
        onClick={handleClick}>
        {display}
      </div>
      {opened ?
        <Options
          optionList={optionList}
          opened={opened}
          setOpened={setOpened} /> : ''}
    </div>
  );
};
