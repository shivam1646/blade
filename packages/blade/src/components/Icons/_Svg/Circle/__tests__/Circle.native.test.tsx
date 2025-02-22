import Circle from '..';
import Svg from '../../Svg';
import renderWithTheme from '~src/_helpers/testing/renderWithTheme.native';

describe('<Circle />', () => {
  it('should render react-native-svg Circle component', () => {
    const renderTree = renderWithTheme(
      <Svg width="400" height="110" viewBox="0 0 100 100">
        <Circle cx="200" cy="100" x="10" y="10" r="4" />
      </Svg>,
    ).toJSON();
    expect(renderTree).toMatchSnapshot();
  });
});
