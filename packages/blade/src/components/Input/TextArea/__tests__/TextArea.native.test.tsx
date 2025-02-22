import { fireEvent } from '@testing-library/react-native';
import type { ReactElement } from 'react';
import React from 'react';

import { TextArea } from '..';
import renderWithTheme from '~src/_helpers/testing/renderWithTheme.native';

beforeAll(() => jest.spyOn(console, 'error').mockImplementation());
afterAll(() => jest.restoreAllMocks());

describe('<TextArea />', () => {
  it('should render', () => {
    const { toJSON } = renderWithTheme(<TextArea label="Enter name" />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('should display success validation state', () => {
    const { getByText } = renderWithTheme(
      <TextArea
        label="Enter name"
        validationState="success"
        successText="Success"
        helpText="Help"
        errorText="Error"
      />,
    );

    const successText = getByText('Success');

    expect(successText).toBeTruthy();
  });

  it('should display error validation state', () => {
    const { getByText } = renderWithTheme(
      <TextArea
        label="Enter name"
        validationState="error"
        errorText="Error"
        successText="Success"
        helpText="Help"
      />,
    );

    const errorText = getByText('Error');

    expect(errorText).toBeTruthy();
  });

  it('should display help text', () => {
    const { getByText } = renderWithTheme(
      <TextArea label="Enter name" successText="Success" errorText="Error" helpText="Help" />,
    );

    const helpText = getByText('Help');

    expect(helpText).toBeTruthy();
  });

  it('should be focussed when autoFocus flag is passed', () => {
    const placeholder = 'First last';
    const { getByPlaceholderText } = renderWithTheme(
      // eslint-disable-next-line jsx-a11y/no-autofocus
      <TextArea label="Enter name" placeholder={placeholder} autoFocus />,
    );

    const input = getByPlaceholderText(placeholder);

    // we assume auto focus is working with this prop in place, no simple way of asserting on focus otherwise
    // @ts-expect-error TS typings not being picked from library
    expect(input).toHaveProp('autoFocus', true);
  });

  it('should be disabled when isDisabled flag is passed', () => {
    const placeholder = 'First last';
    const { getByPlaceholderText } = renderWithTheme(
      <TextArea label="Enter name" placeholder={placeholder} isDisabled />,
    );

    const input = getByPlaceholderText(placeholder);
    expect(input).toBeDisabled();
  });

  it('should handle onChange', () => {
    const placeholder = 'First Last';
    const onChange = jest.fn();
    const userName = 'Divyanshu';

    const { getByPlaceholderText } = renderWithTheme(
      <TextArea label="Enter name" placeholder={placeholder} name="name" onChange={onChange} />,
    );

    const input = getByPlaceholderText(placeholder);
    fireEvent.changeText(input, userName);

    // changeText changes entire text at once
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith({ name: 'name', value: userName });
  });

  /**
   * No tests for uncontrolled input because react-native-testing-library doesn't support it
   * https://github.com/callstack/react-native-testing-library/issues/978#issuecomment-1203256954
   */
  it('should set value as a controlled input', () => {
    const valueInitial = 'Divyanshu';
    const valueFinal = 'Divyanshu Maithani';

    const ControlledInputExample = (): ReactElement => {
      const [value, setValue] = React.useState<string | undefined>(valueInitial);

      return (
        <TextArea label="Enter name" value={value} onChange={({ value }) => setValue(value)} />
      );
    };

    const { getByDisplayValue } = renderWithTheme(<ControlledInputExample />);

    const input = getByDisplayValue(valueInitial);

    fireEvent.changeText(input, valueFinal);

    getByDisplayValue(valueFinal);
  });

  it('should throw error when both value and defaultValue are passed', () => {
    expect(() =>
      renderWithTheme(
        <TextArea label="Enter name" defaultValue="Kamlesh" value="Kamlesh Chandnani" />,
      ),
    ).toThrow(
      `[Blade: Input]: Either 'value' or 'defaultValue' shall be passed. This decides if the input field is controlled or uncontrolled`,
    );
  });

  /**
   * can't check clear button for uncontroled input with default value
   *  https://github.com/callstack/react-native-testing-library/issues/978#issuecomment-1203256954
   */

  it('should clear input on clear buton click', () => {
    const valueInitial = 'Kamlesh';
    const valueFinal = '';

    const ControlledInput = (): ReactElement => {
      const [value, setValue] = React.useState<string | undefined>(valueInitial);

      return (
        <TextArea
          label="Enter name"
          value={value}
          showClearButton
          onClearButtonClick={() => setValue(valueFinal)}
        />
      );
    };

    const { getByDisplayValue, getByRole } = renderWithTheme(<ControlledInput />);

    const input = getByDisplayValue(valueInitial);
    expect(input).toBeTruthy();

    const clearButton = getByRole('button');
    fireEvent.press(clearButton);

    expect(getByDisplayValue(valueFinal)).toBeTruthy();
  });

  it('should only show clear buton when the user type in something', () => {
    const valueInitial = '';
    const valueFinal = 'Kamlesh';

    const ControlledInput = (): ReactElement => {
      const [value, setValue] = React.useState<string | undefined>(valueInitial);

      return (
        <TextArea
          label="Enter name"
          value={value}
          onChange={() => setValue(valueFinal)}
          showClearButton
          onClearButtonClick={() => setValue(valueInitial)}
        />
      );
    };

    const { getByDisplayValue, getByRole, queryByRole } = renderWithTheme(<ControlledInput />);

    const input = getByDisplayValue(valueInitial);

    expect(input).toBeTruthy();

    let clearButton = queryByRole('button');
    expect(clearButton).toBeFalsy();

    fireEvent.changeText(input, valueFinal);

    expect(getByDisplayValue(valueFinal)).toBeTruthy();

    clearButton = getByRole('button');
    fireEvent.press(clearButton);

    expect(getByDisplayValue(valueInitial)).toBeTruthy();
  });

  it('should pass a11y', () => {
    // todo: tests should be updated for improved a11y after https://github.com/razorpay/blade/issues/696
    const placeholder = 'First Last';
    const { getByPlaceholderText } = renderWithTheme(
      <TextArea
        label="Enter name"
        placeholder={placeholder}
        isRequired
        helpText="First name and last name"
        defaultValue="Divyanshu"
        validationState="none"
      />,
    );

    const input = getByPlaceholderText(placeholder);
    expect(input).toBeEnabled();
  });
});
